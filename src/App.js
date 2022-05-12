import React, { useState } from 'react';

// Components.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Styles, utils, and helpers.
import axios from 'axios';
import { ApiUtility } from './util';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [text, setText] = useState('');

  const handleAdd = ({ target: { value } }) => {
    setText(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('text', text);

    const apiUtil = new ApiUtility();
    const answer = await apiUtil.solveQuestion1();

    console.log(answer);

    // try {
    //   const formData = new FormData();
    //   formData.append('text', text);
    //   const url = 'http://localhost:8000/data';
    //   const { data } = await axios.post(url, formData);

    //   console.log(data);
    // } catch (error) {
    //   console.log('Error: ', error);
    // }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              id="text"
              type="text"
              placeholder="Enter some text"
              onChange={handleAdd}
            />

            <Button id="submit" type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </header>
    </div>
  );
}

export default App;
