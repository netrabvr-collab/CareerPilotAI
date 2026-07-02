import { useState } from "react";
import { analyzeResume } from "../services/api";
import "./ResumeAnalyzer.css";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeResume(file);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">Resume Analyzer</h1>
      <p className="sub">
        Upload your resume and get instant AI feedback
      </p>

      {/* Upload Card */}
      <div className="card">
        <label className="uploadLabel">
          {file ? `📄 ${file.name}` : "Click to upload your resume (PDF)"}
          <input
            type="file"
            accept=".pdf"
            className="hiddenInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          className="btn"
          onClick={handleAnalyze}
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* Spinner */}
      {loading && (
        <div className="spinner">
          <div className="spinnerDot"></div>
          <p>Analyzing your resume with AI...</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      {result && (
        <div className="results animate-fadeIn">

          {/* ATS Score */}
          <div className="resultCard scoreCard">
            <p className="scoreLabel">ATS Score</p>
            <p className="scoreValue">{result.ats_score}</p>
            <p className="scoreLabel">out of 100</p>
          </div>

          {/* Strengths */}
          <div className="resultCard">
            <h3 className="sectionTitle green">✅ Strengths</h3>
            {result.strengths.map((s, i) => (
              <p key={i} className="item">
                • {s}
              </p>
            ))}
          </div>

          {/* Weaknesses */}
          <div className="resultCard">
            <h3 className="sectionTitle red">⚠️ Weaknesses</h3>
            {result.weaknesses.map((w, i) => (
              <p key={i} className="item">
                • {w}
              </p>
            ))}
          </div>

          {/* Missing Keywords */}
          <div className="resultCard">
            <h3 className="sectionTitle yellow">🔑 Missing Keywords</h3>
            <div className="tags">
              {result.missing_keywords.map((k, i) => (
                <span key={i} className="tag tagYellow">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="resultCard">
            <h3 className="sectionTitle purple">📝 Summary</h3>
            <p className="item">{result.summary}</p>
          </div>

        </div>
      )}
    </div>
  );
}