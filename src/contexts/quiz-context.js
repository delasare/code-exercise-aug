import * as React from 'react';
const QuizContext = React.createContext();

function QuizReducer(state, action) {
  switch (action.type) {
    case 'add-quizzes': {
      console.log('action', action.payload);
      return { ...state, quizzes: action.payload };
    }
    case 'update-total-correct': {
      console.log('EXTERNAL');
      return { incomingUrls: action.payload };
    }
    default: {
      return state;
    }
  }
}

function QuizProvider({ children }) {
  const initialQuizState = {
    quizzes: null,
    currentQuiz: null,
    totalCorrect: 0,
  };
  const [state, dispatch] = React.useReducer(QuizReducer, initialQuizState);
  const value = { state, dispatch };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = React.useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a Context Provider');
  }
  return context;
}

export { QuizProvider, useQuiz };
