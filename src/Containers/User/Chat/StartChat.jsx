import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor';
import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FaSmile, FaPaperclip, FaCamera, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import './StartChat.css';

function StartChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const recruiterId = state?.recruiter?._id;
  const { jobId, employerId } = useParams();
  const chatId = state?.room?._id;
  const recruiterName = state?.recruiter?.recruitername || 'Recruiter';

  const navigate = useNavigate();
  const chatRoom = state?.room;

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
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const response = await axiosInstance.post('/employee-sendMessage', { message: newMessage, room: chatRoom });
      if (response.data.success) {
        setMessages([...messages, response.data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error("Error in sending message", error);
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
          {messages.map((message) => (
            <ListGroup.Item
              key={message._id}
              className={message.senderId !== recruiterId ? 'recruiter-message' : 'user-message'}
            >
              {message.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="chat-footer">
        <InputGroup>
          <InputGroup.Text className="input-icon">
            <FaCamera />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <InputGroup.Text className="input-icon">
            <FaSmile />
          </InputGroup.Text>
          <InputGroup.Text className="input-icon">
            <FaPaperclip />
          </InputGroup.Text>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="start-chat-send-button"
          >
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default StartChat;
