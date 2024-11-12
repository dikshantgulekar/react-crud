import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Menu from './Menu';

export default function LoginSuccess() {

  return (
    <>
    <Menu/>
    <Container className="mt-5">
      <Card>
        <Card.Body className="text-center">
          <h2>Login Successful!</h2>
          <p>Welcome back! You have successfully logged in.</p>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}
