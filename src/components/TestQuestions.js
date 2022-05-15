import React from 'react';

// Components.
import Table from 'react-bootstrap/Table';

const REQUIRED_QUESTIONS = [1, 2, 3, 4, 5];

export default function TestQuestions({ testQuestions }) {
  return (
    <Table bordered hover variant="dark" size="sm" className="text-secondary">
      <thead>
        <tr>
          <th>Test Order</th>
          <th>Pool Order</th>
        </tr>
      </thead>
      <tbody>
        {testQuestions.map((number, index) => {
          const isRequired = REQUIRED_QUESTIONS.includes(number);
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
  )
}
