import Grupo from "./Grupo";

type Sensor = {
	id?: number;
	grupo_id?: number;
	sensor_mac: string;
	codigo_vinculacao: number;

	// Datas (auditoria)
	created_at?: Date;
	bounded_at?: Date;
	bounded_by?: number;

	grupo?: Grupo;
};

export default Sensor;
