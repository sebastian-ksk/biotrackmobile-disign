import { useState, useEffect } from 'react';
import type { EventData } from '../types';
import CaptureModal from '../components/CaptureModal';
import './Capture.css';

const Capture = () => {
  const [capturas, setCapturas] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEdit, setEventoEdit] = useState<EventData | null>(null);

  useEffect(() => {
    loadCapturas();
  }, []);

  const loadCapturas = () => {
    const stored = localStorage.getItem('capturas');
    if (stored) {
      setCapturas(JSON.parse(stored));
    }
  };

  const saveCaptura = (eventoData: Omit<EventData, 'id' | 'sincronizado'>) => {
    const newEvento: EventData = {
      ...eventoData,
      id: eventoEdit?.id || Date.now().toString(),
      sincronizado: eventoEdit?.sincronizado || false,
    };

    let updatedCapturas: EventData[];
    if (eventoEdit) {
      updatedCapturas = capturas.map((c) =>
        c.id === eventoEdit.id ? newEvento : c
      );
    } else {
      updatedCapturas = [...capturas, newEvento];
    }

    setCapturas(updatedCapturas);
    localStorage.setItem('capturas', JSON.stringify(updatedCapturas));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta captura?')) {
      const updated = capturas.filter((c) => c.id !== id);
      setCapturas(updated);
      localStorage.setItem('capturas', JSON.stringify(updated));
    }
  };

  const handleEdit = (evento: EventData) => {
    setEventoEdit(evento);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEventoEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventoEdit(null);
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'avistamiento':
        return '🟢';
      case 'rastro':
        return '🟡';
      case 'ataque':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'avistamiento':
        return '#388e3c';
      case 'rastro':
        return '#f57c00';
      case 'ataque':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };

  return (
    <div className="capture-container">
      <div className="capture-header">
        <h1>Capturas de Datos</h1>
        <button className="btn btn-primary" onClick={handleNew}>
          + Nueva Captura
        </button>
      </div>

      {capturas.length === 0 ? (
        <div className="empty-state">
          <p>📝 No hay capturas registradas</p>
          <p className="empty-state-subtitle">
            Crea tu primera captura para comenzar
          </p>
        </div>
      ) : (
        <div className="captures-list">
          {capturas.map((captura) => (
            <div key={captura.id} className="capture-card">
              <div
                className="capture-card-header"
                style={{ borderLeft: `4px solid ${getEventColor(captura.tipoEvento)}` }}
              >
                <div className="capture-card-info">
                  <div className="capture-card-title">
                    <span className="capture-icon">{getEventIcon(captura.tipoEvento)}</span>
                    <div>
                      <h3>{captura.especie}</h3>
                      <p className="capture-meta">
                        {captura.fecha} {captura.hora} • {captura.lugar}
                      </p>
                    </div>
                  </div>
                  <div className="capture-badge">
                    {captura.tipoEvento.charAt(0).toUpperCase() + captura.tipoEvento.slice(1)}
                  </div>
                </div>
              </div>

              {captura.descripcion && (
                <p className="capture-description">{captura.descripcion}</p>
              )}

              {captura.fotos.length > 0 && (
                <div className="capture-photos">
                  {captura.fotos.slice(0, 3).map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      className="capture-photo-thumb"
                    />
                  ))}
                </div>
              )}

              <div className="capture-card-footer">
                <span className="capture-coords">
                  📍 {captura.latitud.toFixed(4)}, {captura.longitud.toFixed(4)}
                </span>
                <div className="capture-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(captura)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => handleDelete(captura.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={saveCaptura}
        eventoEdit={eventoEdit}
      />
    </div>
  );
};

export default Capture;

