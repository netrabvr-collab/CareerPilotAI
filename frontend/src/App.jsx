import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from './pages/SkillGap';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<ResumeAnalyzer />} />
        <Route path='/skillgap' element={<SkillGap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;