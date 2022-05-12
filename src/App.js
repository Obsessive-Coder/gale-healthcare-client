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
      const apiUtil = new ApiUtility();
      const apiMethod = `solveQuestion${questionNumber}`;
      const solution = await apiUtil[apiMethod]();
      addAnswer(questionName, solution);
    } catch (error) {
      console.log('Error: ', error);
      addAnswer(questionName, 'There was an error solving this question. Please check the console for more information.');
    }
  };

  return (
    <div className="App p-5">
      <header>

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

        {/* <Form.Control
            id="text"
            type="text"
            placeholder="Enter some text"
            onChange={handleAdd}
          /> */}
      </Form>
    </div>
  );
}

export default App;
