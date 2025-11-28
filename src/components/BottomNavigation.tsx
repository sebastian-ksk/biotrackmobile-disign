import { Link, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link
        to="/capture"
        className={`nav-item ${isActive('/capture') ? 'active' : ''}`}
      >
        <span className="nav-icon">📝</span>
        <span className="nav-label">Captura</span>
      </Link>
      <Link
        to="/visualization"
        className={`nav-item ${isActive('/visualization') ? 'active' : ''}`}
      >
        <span className="nav-icon">🗺️</span>
        <span className="nav-label">Mapa</span>
      </Link>
      <Link
        to="/summary"
        className={`nav-item ${isActive('/summary') ? 'active' : ''}`}
      >
        <span className="nav-icon">📊</span>
        <span className="nav-label">Resumen</span>
      </Link>
      <Link
        to="/profile"
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-label">Perfil</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;

