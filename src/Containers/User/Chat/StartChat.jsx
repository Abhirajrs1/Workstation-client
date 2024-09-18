import React, { useState, useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor';
import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSmile, FaPaperclip, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import './StartChat.css';

function StartChat() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const recruiterId = state?.recruiter?._id;
  const chatId = state?.room?._id;
  const recruiterName = state?.recruiter?.recruitername || 'Recruiter';
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
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

    socket.current.on("connect", () => {
      socket.current.emit('new-user-add', userId);
    });

    socket.current.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newMessage,messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      message: newMessage,
      room: chatId,
      senderId: userId,
      receiverId: recruiterId,
      createdAt:Date.now()
    };

    try {
      const newLocalMessage = {
        ...messageData,
        text: newMessage,
      };

      setMessages((prevMessages) => [...prevMessages, newLocalMessage]);

      const response = await axiosInstance.post('/employee-sendMessage', messageData);
      if (response.data.success) {

        socket.current.emit('send-message', {
          ...messageData,
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/employee-uploadChatfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const fileUrl = response.data.fileUrl;

        const messageData = {
          message: fileUrl,
          room: chatId,
          senderId: userId,
          receiverId: recruiterId,
          isFile: true,
        };

        setMessages((prevMessages) => [...prevMessages, messageData]);

        // Emit the message to the socket
        socket.current.emit('send-message', messageData);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
              <div className="candidate-message-content">
                {message.text || message.message}
              </div>
              <div className="candidate-message-timestamp">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
              </div>
            </ListGroup.Item>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
      </div>

      <div className="chat-footer">
        <InputGroup>
          <Button variant="light" className="attachment-button" onClick={() => fileInputRef.current.click()}>
            <FaPaperclip />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button
            variant="light"
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prevState) => !prevState)}
          >
            <FaSmile />
          </Button>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Button className="emoji-close-button" onClick={() => setShowEmojiPicker(false)}>
                <FaTimes />
              </Button>
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
