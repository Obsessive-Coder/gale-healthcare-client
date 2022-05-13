import React from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import CodeModal from './CodeModal';
import UserCard from './UserCard';

export default function Question({ number, question, answer, solution }) {
  return (
    <Form.Group className="d-flex flex-column px-3">
      <div className="px-3 h4" style={{ textAlign: 'justify' }}>
        {question.split('\n').map(textLine => (
          <Form.Text key={`question-text-${textLine}`} className="d-block my-3">
            {textLine}
          </Form.Text>
        ))}

        {/* Solution */}
        {answer ? (
          <>
            <Form.Label className="mt-3 text-secondary" style={{ fontWeight: 'bold' }}>
              Answer:
            </Form.Label>

            {Array.isArray(answer) ? (
              <CardGroup>
                {answer.map(user => (
                  <UserCard key={`user-${user.userid}`} user={user} />
                ))}
              </CardGroup>
            ) : (
              <Form.Text className="d-block h3">
                {answer}
              </Form.Text>
            )}

            <CodeModal questionNumber={number} solution={solution} />
          </>
        ) : (
          <Button
            type="submit"
            variant="outline-primary"
            value={number}
            className="align-self-start mt-3"
          >
            Solve It
          </Button>
        )}
      </div>
    </Form.Group>
  )
}
