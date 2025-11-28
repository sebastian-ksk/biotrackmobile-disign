import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import InfoModal from '../components/InfoModal';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: 'Usuario Ejemplo', email: 'usuario@ejemplo.com' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [eventosCount, setEventosCount] = useState(0);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // Contar eventos
    const stored = localStorage.getItem('capturas');
    if (stored) {
      const capturas = JSON.parse(stored);
      setEventosCount(capturas.length);
    }
  }, []);

  const handleSaveProfile = (data: { name: string; email: string }) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const ayudaContent = (
    <>
      <h3>¿Cómo usar la aplicación?</h3>
      <p>
        <strong>Captura de Datos:</strong> Registra eventos de fauna silvestre con fotos, descripción y ubicación GPS automática.
      </p>
      <p>
        <strong>Mapa Interactivo:</strong> Visualiza todos los eventos registrados en un mapa con marcadores por tipo de evento.
      </p>
      <p>
        <strong>Dashboard:</strong> Revisa estadísticas y resúmenes de tus registros.
      </p>

      <h3>Tipos de Eventos</h3>
      <ul>
        <li><strong>🟢 Avistamiento:</strong> Observación directa de fauna</li>
        <li><strong>🟡 Rastro:</strong> Indicios o huellas encontradas</li>
        <li><strong>🔴 Ataque:</strong> Ataques a ganado o animales domésticos</li>
      </ul>

      <h3>Consejos</h3>
      <ul>
        <li>Permite el acceso a la ubicación para GPS automático</li>
        <li>Toma fotos claras como evidencia</li>
        <li>Describe el evento con detalles relevantes</li>
        <li>Los datos se guardan localmente en tu dispositivo</li>
      </ul>

      <h3>Soporte</h3>
      <p>
        Si tienes preguntas o necesitas ayuda, contacta al equipo de soporte a través de los canales oficiales.
      </p>
    </>
  );

  const termsContent = (
    <>
      <h3>Términos y Condiciones de Uso</h3>
      <p>
        Al utilizar esta aplicación, aceptas los siguientes términos y condiciones:
      </p>

      <h3>1. Uso de la Aplicación</h3>
      <p>
        Esta aplicación está diseñada para el registro y seguimiento de eventos relacionados con fauna silvestre. 
        El usuario es responsable de la veracidad de la información registrada.
      </p>

      <h3>2. Datos Personales</h3>
      <p>
        Los datos personales proporcionados serán utilizados únicamente para los fines de la aplicación. 
        Se respeta la privacidad del usuario y sus datos se almacenan localmente en el dispositivo.
      </p>

      <h3>3. Datos de Ubicación</h3>
      <p>
        La aplicación utiliza servicios de geolocalización para registrar la ubicación de los eventos. 
        Esta información es necesaria para el correcto funcionamiento de la aplicación.
      </p>

      <h3>4. Responsabilidad</h3>
      <p>
        El usuario es responsable de:
      </p>
      <ul>
        <li>La veracidad de la información registrada</li>
        <li>El uso adecuado de la aplicación</li>
        <li>Respetar las leyes y regulaciones locales</li>
        <li>No utilizar la aplicación para fines ilegales</li>
      </ul>

      <h3>5. Propiedad Intelectual</h3>
      <p>
        Todos los contenidos de la aplicación, incluyendo diseño, código y funcionalidades, 
        son propiedad de sus respectivos dueños y están protegidos por derechos de autor.
      </p>

      <h3>6. Modificaciones</h3>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier momento. 
        Se notificará a los usuarios sobre cambios significativos.
      </p>

      <h3>7. Limitación de Responsabilidad</h3>
      <p>
        La aplicación se proporciona "tal cual" sin garantías. No nos hacemos responsables 
        por daños derivados del uso o la imposibilidad de usar la aplicación.
      </p>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Última actualización: {new Date().toLocaleDateString('es-ES')}
      </p>
    </>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Perfil</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <h2>{userData.name}</h2>
        <p className="profile-email">{userData.email}</p>
      </div>

      <div className="profile-section">
        <h3>Información</h3>
        <div className="info-item">
          <span className="info-label">Nombre</span>
          <span className="info-value">{userData.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Correo</span>
          <span className="info-value">{userData.email}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Eventos capturados</span>
          <span className="info-value">{eventosCount}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(true)}>
          Editar Perfil
        </button>
        <button className="btn btn-secondary" onClick={() => setIsInfoModalOpen(true)}>
          Ayuda
        </button>
        <button className="btn btn-secondary" onClick={() => setIsTermsModalOpen(true)}>
          Términos Legales
        </button>
        <button className="btn btn-primary" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={userData}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Ayuda e Información"
        content={ayudaContent}
      />

      <InfoModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Términos y Condiciones"
        content={termsContent}
      />
    </div>
  );
};

export default Profile;

