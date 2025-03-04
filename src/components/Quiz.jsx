// src/components/Quiz.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import quizData from "../data/quiz.json";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/lyrics" className="nav-link">Letras</Link>
        <Link to="/quiz" className="nav-link">Quiz</Link>
      </nav>
      <div className="quiz-card">
        <h2 className="quiz-question">{quizData[currentQuestion].question}</h2>
        <div className="quiz-options">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                showFeedback && option === quizData[currentQuestion].answer
                  ? "correct"
                  : showFeedback && option !== quizData[currentQuestion].answer
                  ? "wrong"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className="feedback">
            {selectedAnswer === quizData[currentQuestion].answer ? (
              <p className="feedback-text correct-text">✅ Resposta correta!</p>
            ) : (
              <p className="feedback-text wrong-text">
                ❌ Resposta errada! A correta era: {quizData[currentQuestion].answer}
              </p>
            )}
            {currentQuestion < quizData.length - 1 ? (
              <button onClick={handleNextQuestion} className="next-button">
                Próxima pergunta
              </button>
            ) : (
              <p className="final-score">
                Pontuação final: {score} / {quizData.length}
              </p>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .quiz-container {
          min-height: 100vh;
          background: radial-gradient(
    circle at 50% 50%,
    #ff9ca7 0%,    /* rosa avermelhado (centro) */
    #ffd3e1 30%,   /* tom mais claro rosado */
    #b7e6ff 60%,   /* azul clarinho */
    #90c8ff 100%   /* azul mais forte */
  );
  
          font-family: 'Outfit', sans-serif;
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .navbar {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .nav-link {
          text-decoration: none;
          color: white;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .nav-link:hover {
          color: #;
          text-shadow: 0 0 5px #;
        }
        .quiz-card {
          background: rgba(255, 255, 255, 0.2);
          padding: 2rem;
          border-radius: 10px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.6);
        }
        .quiz-question {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        .quiz-options {
          display: grid;
          gap: 1rem;
        }
        .quiz-option {
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 1.1rem;
          border: 2px solid transparent;
          transition: transform 0.3s, background 0.3s;
          cursor: pointer;
          background: #f0f0f0;
          color: #333;
        }
        .quiz-option:hover:not(:disabled) {
          transform: scale(1.03);
        }
        .quiz-option.correct {
          background: #28a745;
          color: white;
          border-color: #1e7e34;
        }
        .quiz-option.wrong {
          background: #dc3545;
          color: white;
          border-color: #bd2130;
        }
        .feedback {
          margin-top: 1.5rem;
        }
        .feedback-text {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .correct-text {
          color: #28a745;
          animation: pulse 1s infinite;
        }
        .wrong-text {
          color: #dc3545;
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        .next-button {
          background: #04c8de;
          padding: 0.8rem 1.2rem;
          border: none;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 0 8px #04c8de;
          transition: background 0.3s;
        }
        .next-button:hover {
          background: #03a0b5;
        }
        .final-score {
          font-size: 1.4rem;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default Quiz;
