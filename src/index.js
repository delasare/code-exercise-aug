import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { getQuizzes } from './data/quizzes';
import Question from './components/Question';
import Summary from './components/Summary';
import { useQuiz, QuizProvider } from './contexts/quiz-context';

import './styles.css';

const App = () => {
  const {
    dispatch,
    state: { quizzes },
  } = useQuiz();

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [correct, setCorrect] = useState(0);

  const handleNextQuiz = useCallback(
    (increment) => {
      if (currentQuiz + increment === quizzes.length) {
        setCurrentQuiz(0);
      }
      setCurrentQuiz(increment + currentQuiz);
      setCorrect(0);
      setQuizComplete(false);
    },
    [currentQuiz, quizzes],
  );

  useEffect(() => {
    getQuizzes().then((results) => {
      dispatch({ type: 'add-quizzes', payload: results });
    });
  }, [dispatch]);

  useEffect(() => {
    console.log('quizes', quizzes);
    setCurrentQuiz(currentQuiz);
  }, [quizzes, currentQuiz]);

  return (
    <div className="app">
      {quizzes && (
        <>
          <h1>{quizzes[currentQuiz].title}</h1>
          {!quizComplete ? (
            <Question
              data={quizzes[currentQuiz].questions}
              quizComplete={setQuizComplete}
              correct={correct}
              setCorrect={setCorrect}
            />
          ) : (
            <Summary
              correct={correct}
              total={quizzes[currentQuiz].questions.length}
              nextQuiz={handleNextQuiz}
            />
          )}
        </>
      )}
    </div>
  );
};

ReactDOM.render(
  <QuizProvider>
    <App />
  </QuizProvider>,
  document.getElementById('root'),
);
