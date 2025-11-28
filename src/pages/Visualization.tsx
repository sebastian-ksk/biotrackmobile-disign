import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Visualization.css';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Visualization = () => {
  const [eventos] = useState([
    {
      id: '1',
      fecha: '2024-01-15',
      especie: 'Puma concolor',
      tipoEvento: 'avistamiento',
      lat: 4.6097,
      lon: -74.0817,
    },
    {
      id: '2',
      fecha: '2024-01-16',
      especie: 'Tremarctos ornatus',
      tipoEvento: 'rastro',
      lat: 4.6100,
      lon: -74.0820,
    },
    {
      id: '3',
      fecha: '2024-01-17',
      especie: 'Puma concolor',
      tipoEvento: 'ataque',
      lat: 4.6095,
      lon: -74.0815,
    },
  ]);

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

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h1>Mapa Interactivo</h1>
        <button className="btn btn-primary" style={{ width: 'auto' }}>
          Sincronizar Datos
        </button>
      </div>

      <div className="map-container">
        <MapContainer
          center={[4.6097, -74.0817]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {eventos.map((evento) => (
            <Marker
              key={evento.id}
              position={[evento.lat, evento.lon]}
              icon={createCustomIcon(getEventColor(evento.tipoEvento))}
            >
              <Popup>
                <div>
                  <strong>{evento.especie}</strong>
                  <br />
                  {evento.tipoEvento.charAt(0).toUpperCase() + evento.tipoEvento.slice(1)}
                  <br />
                  <small>{evento.fecha}</small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="map-legend-overlay">
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-icon" style={{ color: '#388e3c' }}>●</span>
              <span>Avistamiento</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon" style={{ color: '#f57c00' }}>●</span>
              <span>Rastro</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon" style={{ color: '#d32f2f' }}>●</span>
              <span>Ataque</span>
            </div>
          </div>
        </div>
      </div>

      <div className="events-list">
        <h2>Eventos Registrados</h2>
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="event-card"
            style={{ borderLeft: `4px solid ${getEventColor(evento.tipoEvento)}` }}
          >
            <div className="event-header">
              <span className="event-icon">{getEventIcon(evento.tipoEvento)}</span>
              <div className="event-info">
                <h3>{evento.especie}</h3>
                <p className="event-date">{evento.fecha}</p>
              </div>
            </div>
            <p className="event-type">
              Tipo: {evento.tipoEvento.charAt(0).toUpperCase() + evento.tipoEvento.slice(1)}
            </p>
            <p className="event-coords">
              📍 {evento.lat.toFixed(4)}, {evento.lon.toFixed(4)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualization;

