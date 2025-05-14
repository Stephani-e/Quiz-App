import React, { useState } from 'react'

export default function App() {
  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'Berlin', isCorrect: false },
        { answerText: 'Madrid', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Rome', isCorrect: false },
      ]
    },
    {
      questionText: 'What is the largest planet in our solar system?',
      answerOptions: [
        { answerText: 'Earth', isCorrect: false },
        { answerText: 'Jupiter', isCorrect: true },
        { answerText: 'Mars', isCorrect: false },
        { answerText: 'Saturn', isCorrect: false },
      ]
    },
    {
      questionText: 'What is the chemical symbol for gold?',
      answerOptions: [
        { answerText: 'Au', isCorrect: true },
        { answerText: 'Ag', isCorrect: false },
        { answerText: 'Fe', isCorrect: false },
        { answerText: 'Pb', isCorrect: false },
      ]
    },
    {
      questionText: 'Who wrote "Romeo and Juliet"?',
      answerOptions: [
        { answerText: 'Charles Dickens', isCorrect: false },
        { answerText: 'William Shakespeare', isCorrect: true },
        { answerText: 'Mark Twain', isCorrect: false },
        { answerText: 'Jane Austen', isCorrect: false },
      ]
    },
    {
      questionText: 'What is the speed of light?',
      answerOptions: [
        { answerText: '299,792 km/s', isCorrect: true },
        { answerText: '150,000 km/s', isCorrect: false },
        { answerText: '300,000 km/s', isCorrect: false },
        { answerText: '1,080 million km/h', isCorrect: false },
      ]
    },
    {
      questionText: 'Who is the CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Larry Page', isCorrect: false },
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [showScore, setshowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);


  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    };
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setshowScore(true);
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setshowScore(false);
    setScore(0);
  }

  return (
    <div className="app">
      {showCorrections ? (
        <div className='corrections-screen'>
          <h2>Corrections</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <p>{question.questionText}</p>
                <p>Correct Answer: {question.answerOptions.find(option => option.isCorrect).answerText}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowCorrections(false)} className='back'>Back to Quiz</button>
        </div>
      ) : showScore ? (
        isQuizEnded ? (
          <div className='end-screen'>
            <img src="https://media.giphy.com/media/3o7aD2sa1v6x4q5Y8I/giphy.gif" alt="end-screen" className='end-logo' />
            <h1>Quiz Ended!, Thanks for taking the Quiz!</h1>
          </div>
        ) : (
          <div className="score-section">
            You scored {score} out of {questions.length}
            <div className='next-step'>
              <button onClick={restartQuiz} className='restart'>Restart</button>
              <button onClick={() => setShowCorrections(true)} className='corrections'>See Corrections</button>
              <button onClick={() => setIsQuizEnded(true)} className='end'>End Quiz</button>
            </div>
          </div>)
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}