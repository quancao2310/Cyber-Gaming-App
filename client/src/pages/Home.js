import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center bg-light border rounded p-5 shadow-lg">
        <h1 className="mb-4 text-dark">Welcome to Cyber Gaming App</h1>
        <Nav className="flex-column align-items-center">
          <h3 className="mb-3 text-dark">Choose your role</h3>
          <Button
            as={Link}
            to="/admin"
            className="btn btn-primary btn-lg w-25 mb-3"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            Admin
          </Button>
          <Button
            as={Link}
            to="/staff"
            className="btn btn-success btn-lg w-25 mb-3"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            Staff
          </Button>
          <Button
            as={Link}
            to="/customer"
            className="btn btn-info btn-lg w-25"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            Customer
          </Button>
        </Nav>
      </div>
    </Container>
  );
}

export default Home;