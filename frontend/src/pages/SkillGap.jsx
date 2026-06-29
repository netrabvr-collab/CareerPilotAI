import { useState } from "react";
import { analyzeSkillGap } from "../services/api";
import "./SkillGap.css";

export default function SkillGap() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jdText) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeSkillGap(file, jdText);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skillgap-container">
      <h1 className="skillgap-title">Skill Gap Analyzer</h1>

      <div className="input-card">
        <div>
          <p className="label">Upload Resume (PDF)</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div>
          <p className="label">Paste Job Description</p>
          <textarea
            rows={6}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the full job description here..."
            className="jd-textarea"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || !jdText || loading}
          className="analyze-btn"
        >
          {loading ? "Analyzing..." : "Analyze Skill Gap"}
        </button>
      </div>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Comparing resume with job description...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="results-section">

          <div className="result-card score-card">
            <p>Match Score</p>
            <h2>{result.match_score}</h2>
            <span>out of 100</span>
          </div>

          <div className="result-card">
            <h3 className="matched-title">Matched Skills</h3>
            <div className="tags">
              {result.matched_skills.map((skill, index) => (
                <span key={index} className="tag matched">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="result-card">
            <h3 className="missing-title">Missing Skills</h3>
            <div className="tags">
              {result.missing_skills.map((skill, index) => (
                <span key={index} className="tag missing">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="result-card">
            <h3 className="recommend-title">Recommendations</h3>
            {result.recommendations.map((item, index) => (
              <p key={index} className="recommend-item">
                • {item}
              </p>
            ))}
          </div>

          <div className="result-card">
            <h3 className="verdict-title">Verdict</h3>
            <p>{result.verdict}</p>
          </div>

        </div>
      )}
    </div>
  );
}