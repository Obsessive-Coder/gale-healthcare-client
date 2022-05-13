import React from 'react';

// Components.
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Passwords({ userid, passwords }) {
  return (
    <div>
      <Card.Text as={'div'} style={{ fontSize: 'medium' }}>
        <span style={{ fontWeight: 'bold' }}>Passwords:</span>
      </Card.Text>

      <ListGroup variant="flush">
        {passwords.split(',').map(password => (
          <ListGroup.Item
            key={`user-password-${userid}-${password}`}
            className="p-2 bg-transparent text-secondary small"
            style={{ fontSize: 'small' }}>
            {password}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
