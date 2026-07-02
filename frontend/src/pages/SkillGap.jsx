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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="title">Skill Gap Analyzer</h1>
      <p className="sub">
        Compare your resume against any job description
      </p>

      {/* Inputs */}
      <div className="card">
        <div className="field">
          <label className="label">Upload Resume (PDF)</label>
          <label className="uploadLabel">
            {file ? `📄 ${file.name}` : "Click to upload your resume"}
            <input
              type="file"
              accept=".pdf"
              className="hiddenInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        <div className="field">
          <label className="label">Paste Job Description</label>
          <textarea
            className="textarea"
            rows={6}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the full job description here..."
          />
        </div>

        <button
          className="btn"
          onClick={handleAnalyze}
          disabled={!file || !jdText || loading}
        >
          {loading ? "Analyzing..." : "Analyze Skill Gap"}
        </button>
      </div>

      {/* Spinner */}
      {loading && (
        <div className="spinner">
          <div className="spinnerDot"></div>
          <p>Comparing resume with job description...</p>
        </div>
      )}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      {result && (
        <div className="results animate-fadeIn">

          {/* Match Score */}
          <div className="resultCard scoreCard">
            <p className="scoreLabel">Match Score</p>
            <p className="scoreValue">{result.match_score}</p>
            <p className="scoreLabel">out of 100</p>
          </div>

          {/* Matched Skills */}
          <div className="resultCard">
            <h3 className="sectionTitle green">Matched Skills</h3>
            <div className="tags">
              {result.matched_skills.map((s, i) => (
                <span key={i} className="tag tagGreen">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="resultCard">
            <h3 className="sectionTitle red">Missing Skills</h3>
            <div className="tags">
              {result.missing_skills.map((s, i) => (
                <span key={i} className="tag tagRed">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="resultCard">
            <h3 className="sectionTitle yellow">Recommendations</h3>
            {result.recommendations.map((r, i) => (
              <p key={i} className="item">
                • {r}
              </p>
            ))}
          </div>

          {/* Verdict */}
          <div className="resultCard">
            <h3 className="sectionTitle purple">Verdict</h3>
            <p className="item">{result.verdict}</p>
          </div>

        </div>
      )}
    </div>
  );
}