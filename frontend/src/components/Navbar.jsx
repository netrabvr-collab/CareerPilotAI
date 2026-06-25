import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
    const location = useLocation();
  return (
    <nav className='navbar'>
        <h1>AI Career Copilot</h1>

        <div className='nav-links'>
            <Link to='/' className={location.pathname==='/'? 'active':''}>
            Home</Link>
            <Link to='/analyze' className={location.pathname==='/analyze'? 'active':''}>
            Resume Analyzer</Link>
        </div>
    </nav>
  );
}

export default Navbar
