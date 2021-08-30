import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';

export default ({ data, correct, setCorrect, quizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hasAnswered, setHasAnswered] = useState('');

  useEffect(() => {
    const shuffle = (answers) => {
      return answers.sort(() => Math.random() - 0.5);
    };
    const { correctAnswer, incorrectAnswers } = data[currentQuestion];
    const shuff = shuffle([...incorrectAnswers, correctAnswer]);
    setAnswers(shuff);
  }, [data, currentQuestion]);

  const clickAnswer = useCallback(
    (x) => {
      if (data[currentQuestion].correctAnswer === x) {
        setHasAnswered('CORRECT!');
        setCorrect(correct + 1);
      } else {
        setHasAnswered('INCORRECT...');
      }
    },
    [data, currentQuestion, correct, setCorrect],
  );

  const clickNextQuestion = useCallback(
    (increment) => {
      if (currentQuestion + increment === data.length) {
        quizComplete(true);
      } else {
        setCurrentQuestion(increment + currentQuestion);
      }
      setHasAnswered('');
    },
    [data, currentQuestion, quizComplete],
  );

  return (
    <div className="questions">
      <h2>{data[currentQuestion].text}</h2>
      <ol type="A">
        {answers.map((x, idx) => (
          <li key={idx}>
            <button
              className={classNames('answer', {
                correct: hasAnswered === 'CORRECT!',
                incorrect: hasAnswered === 'INCORRECT...',
              })}
              type="button"
              disabled={hasAnswered}
              onClick={() => clickAnswer(x)}
            >
              {x}
            </button>
          </li>
        ))}
      </ol>
      {hasAnswered && (
        <div>
          <div
            className={classNames('message', {
              incorrect: hasAnswered === 'INCORRECT...',
            })}
          >
            {hasAnswered}
          </div>
          <button className="next" onClick={() => clickNextQuestion(1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
