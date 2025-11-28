import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Correo Enviado</h1>
          <p className="auth-subtitle">
            Hemos enviado un enlace de recuperación a tu correo electrónico.
          </p>
          <Link to="/login" className="btn btn-primary">
            Volver al Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Recuperar Contraseña</h1>
        <p className="auth-subtitle">
          Ingresa tu correo para recibir un enlace de recuperación
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar Enlace
          </button>

          <p className="auth-footer">
            <Link to="/login" className="auth-link">
              Volver al Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

