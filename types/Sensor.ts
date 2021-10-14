import Controlador from "./Controlador";

type Sensor = {
	id?: number;
	controlador_id?: number;
	sensor_mac: string;
	codigo_vinculacao: number;

	// Datas (auditoria)
	created_at?: Date;
	bounded_at?: Date;
	bounded_by?: number;

	controlador?: Controlador;
};

export default Sensor;
