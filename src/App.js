import React, { useState } from 'react';

// Components.
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Question } from './components';

// Styles, utils, and helpers.
import { ApiUtility, Constants } from './util';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Destructure constants.
const { QUESTIONS, SOLUTIONS, } = Constants;

function App() {
  const [solutionsData, setSolutionsData] = useState({});

  const addAnswer = (questionName, solution) => {
    if (!questionName || !solution) return;

    // Prevent adding duplicate answers.
    const solutionKeys = Object.keys(solutionsData);
    const isAdded = solutionKeys.filter(key => key === questionName).length > 0;

    if (!isAdded) {
      setSolutionsData({
        ...solutionsData,
        [questionName]: solution,
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { value: questionNumber } = event.nativeEvent.submitter;
    const questionName = `question${questionNumber}`;

    try {
      const solution = await ApiUtility.solveQuestion(questionNumber);
      addAnswer(questionName, solution);
    } catch (error) {
      console.log('Error: ', error);
      addAnswer(questionName, 'There was an error solving this question. Please check the console for more information.');
    }
  };

  return (
    <div className="App px-5">
      <header className="w-100 my-3 text-center text-secondary">
        <h1>Gale Healthcare Code Challenge</h1>
      </header>

      <Form onSubmit={handleSubmit} className="w-75">
        <Accordion defaultActiveKey={0}>
          {QUESTIONS.map((question, index) => (
            <Accordion.Item eventKey={index} key={`question-${index + 1}`} className="mb-4 bg-transparent border-0 shadow">
              <Accordion.Header className="bg-dark text-light">
                {`Question ${index + 1}`}
              </Accordion.Header>

              <Accordion.Body className="pt-0">
                <Question
                  number={index + 1}
                  question={question}
                  answer={solutionsData[`question${index + 1}`]}
                  solution={SOLUTIONS[index]}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Form>
    </div>
  );
}

export default App;
