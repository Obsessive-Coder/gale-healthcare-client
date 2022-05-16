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
        {question.split('\n').map((textLine, index) => (
          <Form.Text key={`question-text-${textLine}-${index}`} className="d-block my-3">
            {textLine}
          </Form.Text>
        ))}

        <div className="d-flex my-4">
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

                {(number === 3 || number === 6) && (
                  <TestQuestions questionNumber={number} testQuestions={answer} />
                )}
              </CardGroup>
            ) : (
              answer.split('\n').map((value, index) => (
                <>
                  {number === 9 && (
                    <div className="d-flex flex-column mb-4">
                      <a
                        href="https://github.com/Obsessive-Coder/gale-healthcare-client"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Client Source Code
                      </a>

                      <a
                        href="https://github.com/Obsessive-Coder/gale-healthcare-backend"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Backend Source Code
                      </a>

                      <a
                        href="https://github.com/Obsessive-Coder"
                        target="_blank"
                        rel="noreferrer"
                      >
                        My Github Account
                      </a>
                    </div>
                  )}

                  <Form.Text key={`answer-text-${value}-${index}`} className="d-block h3">
                    {value}
                  </Form.Text>
                </>
              ))
            )}
          </>
        )}
      </div>
    </Form.Group>
  )
}
