import React from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import CodeModal from './CodeModal';
import TestQuestions from './TestQuestions';
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

        <div className="d-flex mt-5">
          <Form.Label className="m-0 text-secondary" style={{ fontWeight: 'bold' }}>
            Answer:
          </Form.Label>

          <Button
            type="submit"
            variant="outline-primary"
            size="sm"
            value={number}
            className="align-self-start mx-3"
          >
            Solve It
          </Button>

          <CodeModal questionNumber={number} solution={solution} />
        </div>

        {/* Solution */}
        {answer && (
          <>
            {Array.isArray(answer) ? (
              <CardGroup>
                {number === 2 && answer.map(user => (
                  <UserCard key={`user-${user.userid}`} user={user} />
                ))}

                {number === 3 && (
                  <TestQuestions testQuestions={answer} />
                )}
              </CardGroup>
            ) : (
              <Form.Text className="d-block h3">
                {answer}
              </Form.Text>
            )}
          </>
        )}
      </div>
    </Form.Group>
  )
}
