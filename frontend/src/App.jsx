import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from "./pages/SkillGap";
import MockInterview from "./pages/MockInterview";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/analyze"   element={<ResumeAnalyzer />} />
          <Route path="/skillgap"  element={<SkillGap />} />
          <Route path="/interview" element={<MockInterview />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;