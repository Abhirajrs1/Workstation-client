import React from 'react'
import { Container, Card,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ApplicationSuccess.css'
import Navigation from '../../../Components/Navigation';
function ApplicationSuccess() {

    const navigate=useNavigate()
    const handleGoHome = () => {
        navigate('/');
      };
  return (
    <>
    <Navigation/>
      <Container className="d-flex align-items-center justify-content-center">
      <Card className="text-center application-success-card">
        <Card.Body>
          <div className="success-icon">✓</div>
          <Card.Title className="mb-4">Application Submitted Successfully!</Card.Title>
          <Card.Text>
            Thank you for applying. We'll review your application and get back to you soon.
          </Card.Text>
          <Button variant="primary" onClick={handleGoHome} className="mt-4 go-home-button">
            Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
}

export default ApplicationSuccess
