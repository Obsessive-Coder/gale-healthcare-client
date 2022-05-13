import React from 'react';

// Components.
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Passwords from './Passwords';

export default function UserCard({ user }) {
  const { userid, username, email, passwords } = user;

  return (
    <Card className="mx-2 small text-secondary bg-dark shadow" style={{ textAlign: 'left' }}>
      <Card.Header>{username}</Card.Header>

      <Card.Body>
        <Card.Text as={'div'} className="mb-2" style={{ fontSize: 'medium' }}>
          <span style={{ fontWeight: 'bold' }}>ID:{' '}</span>
          <span>{userid}</span>
        </Card.Text>

        <Card.Text as={'div'} className="mb-2" style={{ fontSize: 'medium' }}>
          <span style={{ fontWeight: 'bold' }}>Email:{' '}</span>
          <span>{email}</span>
        </Card.Text>

        <Passwords userid={userid} passwords={passwords} />

        <div>

        </div>
      </Card.Body>
    </Card>
  )
}
