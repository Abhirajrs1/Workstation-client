import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function StartChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const {state} = useLocation();
    const queryParams = new URLSearchParams(location.search);    
    const jobId = queryParams.get('jobId');
    const employerId = queryParams.get('employerId');
   
    
    useEffect(() => {
      const fetchChat = async () => {        
        try {            
          const response = await axiosInstance.post('/employee-chatIntiate',{room:state.room});
          if (response.data.success) {
            setChatId(response.data.chat._id);
            setMessages(response.data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      };
      if (state?.room?._id) {
        fetchChat();
      }
        }, [jobId, employerId, state?.room?._id]);
  
   

    const handleSendMessage=async()=>{
        try {
            const response=await axiosInstance.post('/employee-sendMessage',{message:newMessage,room:state.room})
            console.log(response);
            
        } catch (error) {
            
        }

    }
  
  return (
    <div>
    <ListGroup>
      {messages.map((message) => (
        <ListGroup.Item key={message._id}>
          {message.text}
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Form className="mt-3">
      <Form.Group controlId="newMessage">
        <Form.Control
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2" onClick={handleSendMessage}>
        Send
      </Button>
    </Form>
  </div>
  )
}

export default StartChat
