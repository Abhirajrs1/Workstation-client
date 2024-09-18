import React, { useState, useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor';
import { ListGroup, Button, Form, InputGroup } from 'react-bootstrap';
import './RecruiterChat.css';
import { io } from 'socket.io-client';
import { RecruiterAuth } from '../../../Context/RecruiterContext';
import {FaSmile, FaPaperclip,FaTimes,FaCircle,FaCircleNotch } from 'react-icons/fa';
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
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const [typing, setTyping] = useState(false); 
  const [isTyping, setIsTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});

 

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
        setUnreadMessages(prev => ({
          ...prev,
          [chatId]: 0
        }));
       
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

    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });

    socket.current.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setUnreadMessages(prev => ({
        ...prev,
        [data.chatId]: (prev[data.chatId] || 0) + 1
      }));
      setChats(prevChats => {
        const updatedChats = [...prevChats];
        const index = updatedChats.findIndex(chat => chat._id === data.chatId);
        if (index > -1) {
          const [chat] = updatedChats.splice(index, 1);
          updatedChats.unshift(chat);
        }
        return updatedChats;
      });
    });

    socket.current.on("typing", ({ chatId, isTyping }) => {
      if (selectedChat && chatId === selectedChat._id) {
        setIsTyping(isTyping);  
      }
    });

    socket.current.on("user-offline", (userId) => {
      setOnlineUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
    });

    socket.current.on("update-last-seen", ({ userId, lastSeen }) => {
      setLastSeen(prev => ({ ...prev, [userId]: lastSeen }));

    });
    return () => {
      if (socket.current){
        socket.current.disconnect();
      }
    };
  }, [recruiterId, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setShowEmojiPicker(false)
    if (!newMessage.trim() || !selectedChat) return;

   

    const messageData = {
      chatId: selectedChat._id,
      message: newMessage,
      senderId: recruiterId,
      createdAt:Date.now()
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


  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  
    if (!socket.current || !selectedChat) return;
  
    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", {
        chatId: selectedChat._id,
        isTyping: true,
        userId: recruiterId
      });
    }
  
    const lastTypingTime = new Date().getTime();
    const typingTimeout = 3000; 
  
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= typingTimeout && typing) {
        setTyping(false);
        socket.current.emit("typing", {
          chatId: selectedChat._id,
          isTyping: false,
          userId: recruiterId
        });
      }
    }, typingTimeout);
  };
  
  



  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.userId === userId);
  };

  return (
    <>
      <ReNavigation/>
      <div className="recruiter-chat-container">
        <div className="recruiter-chat-sidebar">
          <h3>Chats</h3>
          <ListGroup>
            {chats.map((chat) => {
              const user = chat.members.find(member => member._id !== recruiterId);
              return (
                <ListGroup.Item
                  key={chat._id}
                  onClick={() => fetchMessages(chat._id)}
                  active={selectedChat && selectedChat._id === chat._id}
                  className="recruiter-chat-candidate-item"
                >
                  <div className="chat-list-item">
                  {unreadMessages[chat._id] > 0 && (
                    <span className="notification-symbol">
                      {unreadMessages[chat._id]}
                    </span>
                  )}
                    <span>{user?.username || 'Unknown User'}</span>
                    {isUserOnline(user._id) ? (
                      <span className="online-indicator">
                        <FaCircle color="green" size={10} /> Online
                      </span>
                    ) : (
                      <span className="offline-indicator">
                        <FaCircle color="red" size={10} /> Offline
                      </span>
                    )}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
        <div className="recruiter-chat-main">
          {selectedChat ? (
            <>
              <div className="recruiter-chat-header">
                <h3>{selectedChat.members.find(member => member._id !== recruiterId)?.username || 'Unknown User'}
                {isUserOnline(selectedChat.members.find(member => member._id !== recruiterId)._id) ? 
                    <span className="online-text">  Online</span>
                    :<span className='offline-text'>Offline</span>
                  }
                </h3>
                {!isUserOnline(selectedChat.members.find(member => member._id !== recruiterId)._id) && (
                  <p className="last-seen">Last seen: {lastSeen[selectedChat.members.find(member => member._id !== recruiterId)._id] || 'Unknown'}</p>
                )}
                {isTyping && <p className="typing-status">Typing...</p> }
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
                    <div className="message-timestamp">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
              </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <Form onSubmit={handleSendMessage} className="recruiter-chat-input-form">
              <InputGroup>
                  <label htmlFor="file-upload" className="icon-button">
                    <FaPaperclip />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    // onChange={handleFileUpload}
                  />
                   <span className="icon-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <FaSmile />
                  </span>

                  {showEmojiPicker && (
      <div className="emoji-picker-container">
        <button className="close-emoji-picker" onClick={() => setShowEmojiPicker(false)}>
          <FaTimes /> 
        </button>
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    )}
                  <Form.Control
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={handleTyping}
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
