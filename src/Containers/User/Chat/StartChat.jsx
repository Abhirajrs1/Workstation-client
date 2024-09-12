import React, { useState, useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor';
import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSmile, FaPaperclip, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import './StartChat.css';

function StartChat() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userId = user._id;
  const recruiterId = state?.recruiter?._id;
  const chatId = state?.room?._id;
  const recruiterName = state?.recruiter?.recruitername || 'Recruiter';
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chatId) {
          const response = await axiosInstance.get(`/employee-getMessages/${chatId}`);
          if (response.data.success) {
            setMessages(response.data.messages);
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    socket.current = io('http://localhost:8800'); 

    socket.current.emit('new-user-add', userId); 

    socket.current.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      message: newMessage,
      room: chatId,
      senderId: userId,
      receiverId: recruiterId,
    };

    try {
      const newLocalMessage = {
        ...messageData,
        senderId: userId,
        text: newMessage,
      };

      setMessages((prevMessages) => [...prevMessages, newLocalMessage]);

      const response = await axiosInstance.post('/employee-sendMessage', messageData);
      if (response.data.success) {
        socket.current.emit('send-message', {
          ...response.data.message,
          receiverId: recruiterId,
        });

        setNewMessage('');
        setShowEmojiPicker(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Button variant="link" onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft />
        </Button>
        <h4>{recruiterName}</h4>
      </div>

      <div className="chat-body">
        <ListGroup>
          {messages.map((message, index) => (
            <ListGroup.Item
              key={index}
              className={message.senderId !== userId ? 'user-message' : 'recruiter-message'}
            >
              {message.text || message.message}
            </ListGroup.Item>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
      </div>

      <div className="chat-footer">
        <InputGroup>
          <Button variant="light" className="attachment-button">
            <FaPaperclip />
          </Button>
          <Button
            variant="light"
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prevState) => !prevState)}
          >
            <FaSmile />
          </Button>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="send-button"
          >
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default StartChat;
