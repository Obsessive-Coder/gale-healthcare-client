import React from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Question({ number, question, solution }) {
  return (
    <Form.Group className="d-flex flex-column mb-5 p-3 shadow">
      <Form.Label>{`Question ${number}`}:</Form.Label>

      <div className="px-3 h4" style={{ textAlign: 'justify' }}>
        {question.split('\n').map(textLine => (
          <Form.Text className="d-block my-3">{textLine}</Form.Text>
        ))}

        {/* Solution */}
        {solution ? (
          <Form.Label className="mt-3 h3">
            {solution}
          </Form.Label>
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
