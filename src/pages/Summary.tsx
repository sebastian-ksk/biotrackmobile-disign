import { useState, useEffect } from 'react';
import type { EventData } from '../types';
import './Summary.css';

const Summary = () => {
  const [capturas, setCapturas] = useState<EventData[]>([]);

  useEffect(() => {
    loadCapturas();
  }, []);

  const loadCapturas = () => {
    const stored = localStorage.getItem('capturas');
    if (stored) {
      setCapturas(JSON.parse(stored));
    }
  };

  // Calcular estadísticas
  const totalEventos = capturas.length;
  const avistamientos = capturas.filter((e) => e.tipoEvento === 'avistamiento').length;
  const rastros = capturas.filter((e) => e.tipoEvento === 'rastro').length;
  const ataques = capturas.filter((e) => e.tipoEvento === 'ataque').length;

  // Eventos últimos 7 días
  const sieteDiasAtras = new Date();
  sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);
  const eventosRecientes = capturas.filter((e) => {
    const fechaEvento = new Date(e.fecha);
    return fechaEvento >= sieteDiasAtras;
  });

  // Ataques recientes (últimos 30 días)
  const treintaDiasAtras = new Date();
  treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
  const ataquesRecientes = capturas.filter((e) => {
    const fechaEvento = new Date(e.fecha);
    return e.tipoEvento === 'ataque' && fechaEvento >= treintaDiasAtras;
  });

  // Distribución por tipo
  const porcentajeAvistamientos = totalEventos > 0 ? Math.round((avistamientos / totalEventos) * 100) : 0;
  const porcentajeRastros = totalEventos > 0 ? Math.round((rastros / totalEventos) * 100) : 0;
  const porcentajeAtaques = totalEventos > 0 ? Math.round((ataques / totalEventos) * 100) : 0;

  // Especies más reportadas
  const especiesMap = new Map<string, number>();
  capturas.forEach((e) => {
    const especie = e.especie || 'No especificada';
    especiesMap.set(especie, (especiesMap.get(especie) || 0) + 1);
  });
  const especiesTop = Array.from(especiesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Eventos por mes (últimos 3 meses)
  const eventosPorMes = capturas.reduce((acc, e) => {
    const fecha = new Date(e.fecha);
    const mes = fecha.toLocaleString('es-ES', { month: 'short', year: 'numeric' });
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const meses = Object.entries(eventosPorMes).slice(-3);

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
    <div className="summary-container">
      <div className="summary-header">
        <h1>Dashboard</h1>
        <p className="summary-subtitle">Resumen de actividad</p>
      </div>

      {totalEventos === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-icon">📊</div>
          <p>No hay eventos registrados</p>
          <p className="empty-subtitle">Comienza a registrar eventos para ver estadísticas</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-header">
                <div className="stat-icon">📊</div>
                <div className="stat-trend">Total</div>
              </div>
              <div className="stat-value">{totalEventos}</div>
              <div className="stat-label">Eventos Registrados</div>
            </div>
            <div className="stat-card success">
              <div className="stat-header">
                <div className="stat-icon">🟢</div>
                <div className="stat-trend">{porcentajeAvistamientos}%</div>
              </div>
              <div className="stat-value">{avistamientos}</div>
              <div className="stat-label">Avistamientos</div>
            </div>
            <div className="stat-card warning">
              <div className="stat-header">
                <div className="stat-icon">🟡</div>
                <div className="stat-trend">{porcentajeRastros}%</div>
              </div>
              <div className="stat-value">{rastros}</div>
              <div className="stat-label">Rastros</div>
            </div>
            <div className="stat-card danger">
              <div className="stat-header">
                <div className="stat-icon">🔴</div>
                <div className="stat-trend">{porcentajeAtaques}%</div>
              </div>
              <div className="stat-value">{ataques}</div>
              <div className="stat-label">Ataques</div>
            </div>
          </div>

          {ataquesRecientes.length > 0 && (
            <div className="alert-section">
              <div className="alert-header">
                <span className="alert-icon">⚠️</span>
                <h3>Alertas Recientes</h3>
              </div>
              <div className="alert-content">
                <p className="alert-text">
                  <strong>{ataquesRecientes.length}</strong> ataque(s) reportado(s) en los últimos 30 días
                </p>
              </div>
            </div>
          )}

          <div className="chart-section">
            <div className="section-header">
              <h2>Distribución por Tipo</h2>
            </div>
            <div className="distribution-chart">
              <div className="bar-item">
                <div className="bar-label-row">
                  <span className="bar-label">Avistamientos</span>
                  <span className="bar-value">{avistamientos}</span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar success-bar"
                    style={{ width: `${porcentajeAvistamientos}%` }}
                  >
                    {porcentajeAvistamientos > 5 && `${porcentajeAvistamientos}%`}
                  </div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-label-row">
                  <span className="bar-label">Rastros</span>
                  <span className="bar-value">{rastros}</span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar warning-bar"
                    style={{ width: `${porcentajeRastros}%` }}
                  >
                    {porcentajeRastros > 5 && `${porcentajeRastros}%`}
                  </div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-label-row">
                  <span className="bar-label">Ataques</span>
                  <span className="bar-value">{ataques}</span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar danger-bar"
                    style={{ width: `${porcentajeAtaques}%` }}
                  >
                    {porcentajeAtaques > 5 && `${porcentajeAtaques}%`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {especiesTop.length > 0 && (
            <div className="species-section">
              <div className="section-header">
                <h2>Especies Más Reportadas</h2>
              </div>
              <div className="species-list">
                {especiesTop.map(([especie, count], index) => {
                  const porcentaje = Math.round((count / totalEventos) * 100);
                  return (
                    <div key={especie} className="species-item">
                      <div className="species-rank">#{index + 1}</div>
                      <div className="species-info">
                        <span className="species-name">{especie}</span>
                        <div className="species-bar-container">
                          <div
                            className="species-bar"
                            style={{ width: `${(count / especiesTop[0][1]) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="species-stats">
                        <span className="species-count">{count}</span>
                        <span className="species-percent">{porcentaje}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {eventosRecientes.length > 0 && (
            <div className="recent-events-section">
              <div className="section-header">
                <h2>Eventos Recientes (7 días)</h2>
                <span className="event-count-badge">{eventosRecientes.length}</span>
              </div>
              <div className="recent-events-list">
                {eventosRecientes.slice(0, 5).map((evento) => (
                  <div key={evento.id} className="recent-event-item">
                    <div
                      className="recent-event-indicator"
                      style={{ backgroundColor: getEventColor(evento.tipoEvento) }}
                    />
                    <div className="recent-event-content">
                      <div className="recent-event-header">
                        <span className="recent-event-icon">{getEventIcon(evento.tipoEvento)}</span>
                        <span className="recent-event-type">
                          {evento.tipoEvento.charAt(0).toUpperCase() + evento.tipoEvento.slice(1)}
                        </span>
                        <span className="recent-event-date">{evento.fecha}</span>
                      </div>
                      <p className="recent-event-location">📍 {evento.lugar}</p>
                      {evento.descripcion && (
                        <p className="recent-event-desc">{evento.descripcion.substring(0, 60)}...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {meses.length > 0 && (
            <div className="timeline-section">
              <div className="section-header">
                <h2>Actividad Mensual</h2>
              </div>
              <div className="timeline-chart">
                {meses.map(([mes, count]) => {
                  const maxCount = Math.max(...meses.map(([, c]) => c));
                  return (
                    <div key={mes} className="timeline-item">
                      <div className="timeline-label">{mes}</div>
                      <div className="timeline-bar-container">
                        <div
                          className="timeline-bar"
                          style={{ height: `${(count / maxCount) * 100}%` }}
                        />
                      </div>
                      <div className="timeline-value">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Summary;

