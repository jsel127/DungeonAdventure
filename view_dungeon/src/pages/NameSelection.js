import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NameSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'maroon';
    return () => {
    document.body.style.backgroundColor = '';
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log('NameSelection:', formJson);

    fetch('/api/selected-name', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formJson),
    })
      .then((res) => res.json())
      .catch((error) => console.log('ERROR: select name post request'));

    navigate('/select-difficulty');
  }

  return (
    <>
      <style>
        {`
          body {
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          form {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          label {
            margin-bottom: 10px;
            font-size: 18px;
            color: black;
          }

          input {
            margin-top: 10px;
            padding: 10px;
            font-size: 16px;
            width: 200px;
            border-radius: 5px;
            border: 1px solid #fff;
            background-color: #444;
            color: white;
          }

          button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: grey;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }

          button:hover {
            background-color: maroon;
          }
        `}
      </style>
      <form onSubmit={handleSubmit}>
        <label>Enter a name for your adventurer:</label>
        <input name="heroName" />
        <button type="submit">Next</button>
      </form>
    </>
  );
};

export default NameSelection;
