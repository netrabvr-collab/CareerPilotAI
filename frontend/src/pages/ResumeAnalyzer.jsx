import { useState } from "react";
import { analyzeResume } from "../services/api";

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
      setResult(data.raw);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

      {/* Upload */}
      <div className="bg-gray-800 p-6 rounded-xl mb-6">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block"
      />
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
      >
      {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>

      {/* Spinner — OUTSIDE the button */}
    {loading && (
      <div className="flex items-center gap-3 text-blue-400 mb-4">
    <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"/>
    <p>Analyzing your resume with AI...</p>
  </div>
)}

      {/* Error */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Result */}
      {result && (
      <div className="space-y-6">

      {/* ATS Score */}
      <div className="bg-gray-800 p-6 rounded-xl text-center">
        <p className="text-gray-400 mb-2">ATS Score</p>
        <p className="text-6xl font-bold text-blue-400">{result.ats_score}</p>
        <p className="text-gray-400 mt-2">out of 100</p>
      </div>

      {/* Strengths */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-green-400 font-bold text-lg mb-3">✅ Strengths</h3>
        {result.strengths.map((s, i) => (
          <p key={i} className="text-gray-300 mb-1">• {s}</p>
        ))}
      </div>

      {/* Weaknesses */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-red-400 font-bold text-lg mb-3">⚠️ Weaknesses</h3>
        {result.weaknesses.map((w, i) => (
          <p key={i} className="text-gray-300 mb-1">• {w}</p>
        ))}
      </div>

      {/* Missing Keywords */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-yellow-400 font-bold text-lg mb-3">🔑 Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_keywords.map((k, i) => (
              <span key={i} className="bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full text-sm">
              {k}
              </span>
            ))}
          </div>
      </div>

      {/* Summary */}
     <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-purple-400 font-bold text-lg mb-3">📝 Summary</h3>
      <p className="text-gray-300">{result.summary}</p>
    </div>

  </div>
)}
    </div>
  );
}