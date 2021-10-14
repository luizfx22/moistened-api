import Horta from "./Horta";

type ContasHorta = {
	id: number;
	usuario_id: string;
	horta_id: string;

	// Para fins de include
	horta?: Horta;
};

export default ContasHorta;
