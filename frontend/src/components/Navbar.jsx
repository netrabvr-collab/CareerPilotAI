import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/analyze", label: "Resume Analyzer" },
  { path: "/skillgap", label: "Skill Gap" },
  { path: "/interview", label: "Mock Interview" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="brand">
        
        <span className="brandName">AI Career Copilot</span>
      </div>

      <div className="links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}