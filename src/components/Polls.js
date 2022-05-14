import React from 'react';

// Components.
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Polls({ userid, polls }) {
  return (
    <ListGroup variant="flush">
      {polls.map(({ question, voteCount }) => (
        <ListGroup.Item
          key={`user-password-${question}-${userid}`}
          className="p-2 bg-transparent text-secondary small"
          style={{ fontSize: 'small' }}
        >
          <Card.Text
            key={`poll-${userid}-${question}`}
            as={'div'}
            style={{ fontSize: 'medium' }}
          >
            <span style={{ fontWeight: 'bold' }}>{question}</span>
          </Card.Text>

          <Card.Text as={'div'} style={{ fontSize: 'medium' }}>
            <span>{`${voteCount} total votes`}</span>
          </Card.Text>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
