import Grupo from './Grupo';

type ContasGrupo = {
  id: number;
  usuario_id: string;
  grupo_id: number;

  // Para fins de include
  grupo?: Grupo;
};

export default ContasGrupo;
