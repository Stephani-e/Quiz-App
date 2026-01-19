import React, { useState } from "react";
import { questions } from "./questions";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);

  const totalQuestions = questions.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setIsQuizEnded(false);
    setShowCorrections(false);
  };

  if (showCorrections) {
    return (
        <div className="app">
          <div className="corrections-screen">
            <h2>Corrections</h2>
            <ul>
              {questions.map((question) => (
                  <li key={question.id}>
                    <p>{question.questionText}</p>
                    <p>
                      Correct Answer:{" "}
                      {question.answerOptions.find((option) => option.isCorrect)
                          .answerText}
                    </p>
                  </li>
              ))}
            </ul>
            <button
                onClick={() => setShowCorrections(false)}
                className="btn btn-outline back"
            >
              Back to Quiz
            </button>
          </div>
        </div>
    );
  }

  if (showScore && isQuizEnded) {
    return (
        <div className="app">
          <div className="end-screen">
            <img
                src="https://media.giphy.com/media/3o7aD2sa1v6x4q5Y8I/giphy.gif"
                alt="end-screen"
                className="end-logo"
            />
            <h1>Quiz Ended! Thanks for taking the quiz.</h1>
            <button onClick={restartQuiz} className="btn btn-primary">
              Restart Quiz
            </button>
          </div>
        </div>
    );
  }

  if (showScore) {
    return (
        <div className="app">
          <div className="score-section">
            <div>
              You scored <strong>{score}</strong> out of {totalQuestions}
            </div>
            <div className="next-step">
              <button onClick={restartQuiz} className="btn btn-outline">
                Restart
              </button>
              <button
                  onClick={() => setShowCorrections(true)}
                  className="btn btn-primary"
              >
                See Corrections
              </button>
              <button
                  onClick={() => setIsQuizEnded(true)}
                  className="btn btn-danger"
              >
                End Quiz
              </button>
            </div>
          </div>
        </div>
    );
  }

  const current = questions[currentQuestion];

  return (
      <div className="app">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{totalQuestions}
          </div>
          <div className="progress-track">
            <div
                className="progress-bar"
                style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="question-text">{current.questionText}</div>
        </div>

        <div className="answer-section">
          {current.answerOptions.map((answerOption, index) => (
              <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
          ))}
        </div>
      </div>
  );
}
