import React, { useState } from 'react';
import './styles/index.scss';

const buttons = [
  '1', '2', '3', '+',
  '4', '5', '6', '-',
  '7', '8', '9', '*',
  'C', '0', '='
];

const Button = ({ label, onClick }) => {
  return (
    <button className="calculator__button" onClick={onClick}>{label}</button>
  );
};

const Display = ({ value }) => {
  return (
    <input className="calculator__display" type="text" value={value} readOnly />
  );
};

function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const calculatedResult = eval(display);
        setResult(calculatedResult.toString());
        setDisplay(calculatedResult.toString());
      } catch (error) {
        setResult('Error');
        setDisplay('');
      }
    } else if (value === 'C') {
      setResult('');
      setDisplay('');
    } else {
      setDisplay((prevDisplay) => prevDisplay + value);
    }
  };

  return (
    <div className="app">
      <h1>Ma Calculatrice !</h1>
      <div className="calculator">
        <Display value={result || display} />
        <div className="calculator__buttons">
          {buttons.map((button, index) => (
            <Button key={index} label={button} onClick={() => handleClick(button)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
