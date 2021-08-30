import React from 'react';
import { getMessage } from '../data/messages';

export default ({ correct, total, nextQuiz }) => {
  const message = getMessage();
  return (
    <div className="summary">
      <div>
        You got <strong>{correct}</strong> out of <strong>{total}</strong>{' '}
        correct
      </div>
      <div className="encouragement">{message}</div>
      <button className="next" onClick={() => nextQuiz(1)}>
        Next Quiz
      </button>
    </div>
  );
};
