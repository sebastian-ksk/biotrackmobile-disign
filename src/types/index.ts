export interface User {
  id: string;
  name: string;
  email: string;
}

export interface EventData {
  id: string;
  fecha: string;
  hora: string;
  latitud: number;
  longitud: number;
  lugar: string;
  observador: string;
  especie: string;
  tipoEvento: 'avistamiento' | 'rastro' | 'ataque';
  descripcion: string;
  fotos: string[];
  datosAtaque?: {
    tipoAnimal: string;
    estado: 'muerto' | 'herido';
    medidasPreventivas: string;
  };
  sincronizado: boolean;
}

export type TipoEvento = 'avistamiento' | 'rastro' | 'ataque';

