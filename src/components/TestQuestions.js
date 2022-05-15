import React from 'react';

// Components.
import Table from 'react-bootstrap/Table';

const REQUIRED_QUESTIONS = [1, 2, 3, 4, 5];

export default function TestQuestions({ questionNumber, testQuestions }) {
  return (
    <>
      {questionNumber === 6 && (
        <div className="text-secondary my-2">
          <span>Number of duplicates: </span>
          <span style={{ fontWeight: 'bold' }}>{testQuestions.length}</span>
        </div>
      )}

      <Table bordered hover variant="dark" size="sm" className="text-secondary">
        <thead>
          <tr>
            <th>Order</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {testQuestions.map((number, index) => {
            const isRequired = questionNumber === 3 && REQUIRED_QUESTIONS.includes(number);
            return (
              <tr key={`test-question-${number}-${index}`}>
                <td
                  className={isRequired ? 'bg-success text-light' : ''}
                  style={isRequired ? { fontWeight: 'bold' } : {}}
                >
                  {index + 1}
                </td>
                <td
                  className={isRequired ? 'bg-success text-light' : ''}
                  style={isRequired ? { fontWeight: 'bold' } : {}}
                >
                  {number}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  )
}
