import React, { useState } from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CodeBlock, dracula } from 'react-code-blocks';

export default function CodeModal({ questionNumber, solution }) {
  const [isShown, setIsShown] = useState(false);

  const toggleIsShown = () => setIsShown(!isShown);

  return (
    <>
      <Button variant="outline-success" size="sm" onClick={toggleIsShown}>
        Show Code
      </Button>

      <Modal show={isShown} size="xl" onHide={toggleIsShown} contentClassName="bg-dark">
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-secondary">
            {`Question ${questionNumber}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CodeBlock
            text={solution}
            language={'php'}
            theme={dracula}
          />
        </Modal.Body>

        <Modal.Footer className="border-secondary">
          <Button variant="outline-secondary" onClick={toggleIsShown}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
