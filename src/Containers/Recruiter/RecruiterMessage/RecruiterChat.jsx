import React, { useState, useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor';
import { ListGroup, Button, Form, InputGroup } from 'react-bootstrap';
import './RecruiterChat.css';
import { io } from 'socket.io-client';
import { RecruiterAuth } from '../../../Context/RecruiterContext';
import { FaCamera } from 'react-icons/fa';
import Picker from 'emoji-picker-react';
import ReNavigation from '../../../Components/ReNavigation';

function RecruiterChat() {
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const { recruiter } = useContext(RecruiterAuth);
  const recruiterId = recruiter._id;
  const messagesEndRef = useRef(null);
 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get('/recruiter-chats');
        if (response.data.success) {
          setChats(response.data.chats || []);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  const fetchMessages = async (chatId) => {
    try {
      const response = await axiosInstance.get(`/recruiter-getMessages/${chatId}`);
      if (response.data.success) {
        setMessages(response.data.messages || []);
        setSelectedChat(chats.find(c => c._id === chatId));
       
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.on("connect", () => {
      socket.current.emit("new-user-add", recruiterId);
    });

    socket.current.on('receive-message', (data) => {
      console.log("TYpe of data",typeof(data))
      console.log("TYpe of",typeof(messages))
      console.log("getting receive message from user",data,messages)
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [recruiterId, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

   

    const messageData = {
      chatId: selectedChat._id,
      message: newMessage,
      senderId: recruiterId,
    };

    const optimisticMessage = {
      ...messageData,
      _id: new Date().toISOString(),
      text: newMessage,
    };
    setMessages(prevMessages => [...prevMessages, optimisticMessage]);

    try {
      const response = await axiosInstance.post('/recruiter-sendMessage', messageData);
      if (response.data.success) {
        console.log("esponse.data.message._id",selectedChat.members[0]._id)
        setNewMessage('');
        console.log("userId",selectedChat.members[0]._id)
        socket.current.emit('send-message', {
          ...messageData,
          receiverId:selectedChat.members[0]._id
        });
      } else {
        console.error('Failed to send message:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending message recrter:', error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <ReNavigation/>
      <div className="recruiter-chat-container">
        <div className="recruiter-chat-sidebar">
          <h3>Chats</h3>
          <ListGroup>
            {chats.map((chat) => (
              <ListGroup.Item
                key={chat._id}
                onClick={() => fetchMessages(chat._id)}
                active={selectedChat && selectedChat._id === chat._id}
                className="recruiter-chat-candidate-item"
              >
                {chat.members.find(member => member._id !== recruiterId)?.username || 'Unknown User'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="recruiter-chat-main">
          {selectedChat ? (
            <>
              <div className="recruiter-chat-header">
                <h3>{selectedChat.members.find(member => member._id !== recruiterId)?.username || 'Unknown User'}</h3>
              </div>
              <div className="recruiter-chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message ${msg.senderId === recruiterId ? 'recruiter' : 'user'}`}
                  >
                    <div className="message-content">
                      {msg.text||msg.message}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <Form onSubmit={handleSendMessage} className="recruiter-chat-input-form">
                <InputGroup>
                  <span className="icon-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</span>
                  {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
                  <FaCamera className="icon-button camera-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="recruiter-chat-input"
                  />
                  <Button type="submit" className="recruiter-chat-send-button" disabled={!newMessage.trim()}>
                    Send
                  </Button>
                </InputGroup>
              </Form>
            </>
          ) : (
            <div className="recruiter-chat-placeholder">
              <p>Select a candidate to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RecruiterChat;
