import React, { useState } from 'react';

// Components.
import Form from 'react-bootstrap/Form';
import { Question } from './components';

// Styles, utils, and helpers.
import { ApiUtility, Constants } from './util';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Destructure constants.
const { QUESTIONS } = Constants;

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
    <div className="App p-5">
      <header>
        TODO: Don't forget the header
      </header>

      <Form onSubmit={handleSubmit} className="w-75">
        {QUESTIONS.map((question, index) => (
          <Question
            key={`question-${index + 1}`}
            number={index + 1}
            question={question}
            solution={solutionsData[`question${index + 1}`]}
          />
        ))}
      </Form>

      <footer>
        TODO: Don't forget the footer
      </footer>
    </div>
  );
}

export default App;
