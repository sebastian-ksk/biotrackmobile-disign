import { useState, useEffect } from 'react';
import type { TipoEvento, EventData } from '../types';
import './CaptureModal.css';

interface CaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Omit<EventData, 'id' | 'sincronizado'>) => void;
  eventoEdit?: EventData | null;
}

const CaptureModal = ({ isOpen, onClose, onSave, eventoEdit }: CaptureModalProps) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [lugar, setLugar] = useState('');
  const [tipoEvento, setTipoEvento] = useState<TipoEvento>('avistamiento');
  const [descripcion, setDescripcion] = useState('');
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const currentFecha = now.toISOString().split('T')[0];
      const currentHora = now.toTimeString().split(' ')[0].slice(0, 5);
      
      if (eventoEdit) {
        setFecha(eventoEdit.fecha);
        setHora(eventoEdit.hora);
        setLatitud(eventoEdit.latitud);
        setLongitud(eventoEdit.longitud);
        setLugar(eventoEdit.lugar);
        setTipoEvento(eventoEdit.tipoEvento);
        setDescripcion(eventoEdit.descripcion);
        setFotos(eventoEdit.fotos);
      } else {
        setFecha(currentFecha);
        setHora(currentHora);
        obtenerUbicacion();
        resetForm();
      }
    }
  }, [isOpen, eventoEdit]);

  const resetForm = () => {
    setLugar('');
    setTipoEvento('avistamiento');
    setDescripcion('');
    setFotos([]);
  };

  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
        }
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && fotos.length < 3) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotos([...fotos, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const evento = {
      fecha: eventoEdit ? fecha : now.toISOString().split('T')[0],
      hora: eventoEdit ? hora : now.toTimeString().split(' ')[0].slice(0, 5),
      latitud: latitud || 0,
      longitud: longitud || 0,
      lugar,
      observador: 'Usuario', // Valor por defecto
      especie: 'No especificada', // Valor por defecto
      tipoEvento,
      descripcion,
      fotos,
      datosAtaque: undefined,
    };
    onSave(evento);
    onClose();
    resetForm();
  };

  const handleRemovePhoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{eventoEdit ? 'Editar Evento' : 'Nuevo Evento'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="capture-form-modal">
          <div className="form-section">
            <div className="form-group">
              <label className="label">Fecha y Hora</label>
              <div className="info-display">
                {fecha} {hora}
              </div>
            </div>

            <div className="form-group">
              <label className="label">Coordenadas GPS</label>
              <div className="gps-display">
                <span className="gps-info">
                  Lat: {latitud?.toFixed(6) || 'Obteniendo...'} | Lon:{' '}
                  {longitud?.toFixed(6) || 'Obteniendo...'}
                </span>
                <button
                  type="button"
                  onClick={obtenerUbicacion}
                  className="btn btn-secondary"
                  style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  Actualizar
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Lugar/Vereda *</label>
              <input
                type="text"
                className="input"
                placeholder="Ej: Vereda Miraflores"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Tipo de Evento *</label>
              <select
                className="input"
                value={tipoEvento}
                onChange={(e) => setTipoEvento(e.target.value as TipoEvento)}
                required
              >
                <option value="avistamiento">🟢 Avistamiento Directo</option>
                <option value="rastro">🟡 Rastro/Indicio</option>
                <option value="ataque">🔴 Ataque a Ganado/Doméstico</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label className="label">Descripción del Evento *</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Describe el evento..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Evidencia Fotográfica * (máx. 3)</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                disabled={fotos.length >= 3}
                className="input"
                required={fotos.length === 0}
              />
              <div className="photos-preview">
                {fotos.map((foto, index) => (
                  <div key={index} className="photo-wrapper">
                    <img
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      className="photo-thumbnail"
                    />
                    <button
                      type="button"
                      className="photo-remove"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptureModal;

