import { useState } from "react";
import { generateQuestions, evaluateAnswer } from "../services/api";
import "./MockInterview.css";
import InterviewSummary from "./InterviewSummary";

export default function MockInterview() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("setup");
  const [history, setHistory] = useState([]);

  const handleStart = async () => {
    if (!file || !role) return;

    setLoading(true);

    try {
      const data = await generateQuestions(file, role);
      setQuestions(data.questions);
      setStage("interview");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleNext = () => {
    setAnswer("");
    setFeedback(null);
    setStage("interview");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmitAnswer = async () => {
    if (!answer) return;
    setLoading(true);
    try {
      const data = await evaluateAnswer(questions[currentIndex].question, answer);
      setFeedback(data);

      setHistory(prev => [...prev, {
        question: questions[currentIndex].question,
        type: questions[currentIndex].type,
        answer,
        score: data.score,
        feedback: data.feedback,
        improved_answer: data.improved_answer
      }]);

      setStage("feedback");

    }
    catch(err){
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-interview-container">
      <h1 className="page-title">Mock Interview</h1>

      {stage === "setup" && (
        <div className="card">
          <div className="form-group">
            <label>Upload Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Target Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Software Engineer, Data Analyst..."
              className="input-field"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!file || !role || loading}
            className="primary-btn"
          >
            {loading ? "Generating Questions..." : "Start Interview"}
          </button>
        </div>
      )}

      {stage === "interview" && questions.length > 0 && (
        <div className="card interview-card">
          <p className="question-meta">
            Question {currentIndex + 1} of {questions.length} ·{" "}
            {questions[currentIndex].type}
          </p>
          
          <div className="progress-container">
            <div className="progress-header">
              <span>Progress</span>
              <span>
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            </div>



          <h2 className="question-text">
            {questions[currentIndex].question}
          </h2>

          <textarea
            rows="6"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="answer-box"
          />

          <button
            onClick={handleSubmitAnswer}
            disabled={!answer || loading}
            className="primary-btn"
          >
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        </div>
      )}

      {stage === "feedback" && feedback && (
        <div className="card feedback-card">
          <div className="score-section">
            <p>Score</p>

            <h2
              className={`score-value ${
                parseInt(feedback.score) >= 7
                  ? "score-good"
                  : parseInt(feedback.score) >= 5
                  ? "score-average"
                  : "score-poor"
              }`}
            >
              {feedback.score}/10
            </h2>

            <p className="score-message">
              {parseInt(feedback.score) >= 7
                ? "Great answer!"
                : parseInt(feedback.score) >= 5
                ? "Decent — room to improve"
                : "Needs work — read the example below"}
            </p>
          </div>

          <div>
            <h3 className="feedback-title">Feedback</h3>
            <p>{feedback.feedback}</p>
          </div>

          <div>
            <h3 className="answer-title">Stronger Answer Example</h3>
            <p>{feedback.improved_answer}</p>
          </div>

          {currentIndex + 1 < questions.length ? (
            <button
              onClick={handleNext}
              className="primary-btn"
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={() => setStage("summary")}
              className="primary-btn"
            >
              View Interview Summary
            </button>
          )}
        </div>
      )}

      {stage === "summary" && (
        <InterviewSummary
          history={history}
          questions={questions}
          setStage={setStage}
          setQuestions={setQuestions}
          setHistory={setHistory}
          setCurrentIndex={setCurrentIndex}
          setAnswer={setAnswer}
          setFeedback={setFeedback}
        />
        )}

      
    </div>
  );
}