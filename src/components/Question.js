import React from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Question({ number, question, solution }) {
  return (
    <Form.Group className="d-flex flex-column px-3">
      <div className="px-3 h4" style={{ textAlign: 'justify' }}>
        {question.split('\n').map(textLine => (
          <Form.Text className="d-block my-3">{textLine}</Form.Text>
        ))}

        {/* Solution */}
        {solution ? (
          <>
            <Form.Label className="mt-3 text-secondary" style={{ fontWeight: 'bold' }}>
              Solution:
            </Form.Label>
            <Form.Text className="d-block h3">
              {solution}
            </Form.Text>
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
