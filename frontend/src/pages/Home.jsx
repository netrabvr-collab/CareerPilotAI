import { useNavigate } from "react-router-dom";
import "./Home.css";

const features = [
  {
    icon: "📄",
    title: "ATS Scoring",
    desc: "See exactly how recruiters' systems score your resume and what's holding you back.",
    path: "/analyze",
  },
  {
    icon: "🔍",
    title: "Skill Gap Analysis",
    desc: "Paste any job description and instantly find what skills you're missing.",
    path: "/skillgap",
  },
  {
    icon: "🎯",
    title: "Mock Interview",
    desc: "Practice with AI-generated questions tailored to your resume and target role.",
    path: "/interview",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">

      {/* Hero */}
      <section className="hero">
        <span className="badge">Powered by Gemini AI</span>
        <h1 className="heading">
          Land your dream job <br />
          <span className="highlight">with AI on your side</span>
        </h1>
        <p className="sub">
          Analyze your resume, close skill gaps, and ace mock interviews —
          all in one place, completely free.
        </p>
        <button className="cta" onClick={() => navigate("/analyze")}>
          Analyze My Resume →
        </button>
      </section>

      {/* Feature Cards */}
      <section className="grid">
        {features.map((f, i) => (
          <div
            key={i}
            className="card"
            onClick={() => navigate(f.path)}
          >
            <span className="cardIcon">{f.icon}</span>
            <h3 className="cardTitle">{f.title}</h3>
            <p className="cardDesc">{f.desc}</p>
            <span className="cardLink">Try it →</span>
          </div>
        ))}
      </section>

    </div>
  );
}