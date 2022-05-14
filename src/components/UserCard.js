import React from 'react';

// Components.
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Passwords from './Passwords';
import Polls from './Polls';

export default function UserCard({ user }) {
  const { userid, username, email, passwords, polls } = user;

  return (
    <Card className="mx-2 small text-secondary bg-dark shadow" style={{ textAlign: 'left' }}>
      <Card.Header>{username}</Card.Header>

      <Card.Body className="pt-0">
        <Tabs variant="pills" defaultActiveKey="passwords" className="justify-content-evenly mb-3" style={{ fontSize: 'small' }}>
          <Tab eventKey="passwords" title="Passwords">
            <Card.Text as={'div'} className="mb-2" style={{ fontSize: 'medium' }}>
              <span style={{ fontWeight: 'bold' }}>ID:{' '}</span>
              <span>{userid}</span>
            </Card.Text>

            <Card.Text as={'div'} className="mb-2" style={{ fontSize: 'medium' }}>
              <span style={{ fontWeight: 'bold' }}>Email:{' '}</span>
              <span>{email}</span>
            </Card.Text>

            <Passwords userid={userid} passwords={passwords} />
          </Tab>
          <Tab eventKey="polls" title="Polls">
            <Polls userid={userid} polls={polls} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  )
}
