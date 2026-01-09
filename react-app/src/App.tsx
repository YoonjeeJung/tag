import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ProblemViewer } from './components/problem-viewer';
import { LatexRenderer } from './components/latex-renderer';
import './styles/global.css';
import 'katex/dist/katex.min.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav-links">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        수학 문제 뷰어
      </Link>
      <Link to="/latex" className={location.pathname === '/latex' ? 'active' : ''}>
        LaTeX 렌더러
      </Link>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProblemViewer />} />
        <Route path="/latex" element={<LatexRenderer />} />
      </Routes>
    </Router>
  );
};

export default App;
