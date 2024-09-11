import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor';
import { ListGroup, Button, Form } from 'react-bootstrap';
import './RecruiterChat.css'; 
import { RecruiterAuth } from '../../../Context/RecruiterContext';

function RecruiterChat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { recruiter } = useContext(RecruiterAuth);

  const recruiterId = recruiter._id;
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get('/recruiter-chats');
        if (response.data.success) {
          setChats(response.data.chats || []);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const response = await axiosInstance.post('/recruiter-sendMessage', {
        chatId: selectedChat._id,
        message: newMessage
      });
      if (response.data.success) {
        setMessages(prevMessages => [...prevMessages, response.data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="recruiter-chat-container">
      <div className="recruiter-chat-candidates-list">
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
      <div className="recruiter-chat-box">
        {selectedChat ? (
          <>
            <h3>Chat with {selectedChat.members.find(member => member._id !== recruiterId)?.username || 'Unknown User'}</h3>
            <div className="recruiter-chat-messages-container">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message ${msg.senderId === recruiterId ? 'recruiter' : 'user'}`}
                >
                  <div className="message-content">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <Form onSubmit={handleSendMessage}>
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="recruiter-chat-input mr-2"
                />
                <Button type="submit" className="recruiter-chat-send-button" disabled={!newMessage.trim()}>
                  Send
                </Button>
              </Form.Group>
            </Form>
          </>
        ) : (
          <p>Select a candidate to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default RecruiterChat;
