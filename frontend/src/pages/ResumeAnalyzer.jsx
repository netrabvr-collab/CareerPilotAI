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

      {/* Error */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Result */}
      {result && (
        <div className="bg-gray-800 p-6 rounded-xl whitespace-pre-wrap">
          <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
          <p className="text-gray-300">{result}</p>
        </div>
      )}
    </div>
  );
}