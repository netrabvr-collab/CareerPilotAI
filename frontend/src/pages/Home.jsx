import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const features = [
        {
            title:'ATS Scoring',
            desc: "See exactly how reacruiters' systems score your resume",
        },
        {
            title:'Skill Gap Analysis',
            desc: "Find missing keywords before applying",
        },
        {
            title:'AI Feedback',
            desc: "Get personalized suggestions to improve instantly",
        },
    ];
  return (
    <div className="home">
      <h1>Your AI Career Coach</h1>

      <p className="subtitle">
        Upload your resume, get ATS score, find skill gaps,
        and ace your interviews — all powered by AI.
      </p>

      <button
        className="analyze-btn"
        onClick={() => navigate("/analyze")}
      >
        Analyze My Resume →
      </button>

      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <p className="icon">{feature.icon}</p>
            <p className="title">{feature.title}</p>
            <p className="description">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
