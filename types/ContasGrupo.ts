import Grupo from "./Grupo";

type ContasGrupo = {
    id: number;
    uid: string;
    gid: number;

    // Para fins de include
    grupo?: Grupo;
}

export default ContasGrupo;