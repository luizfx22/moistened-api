type Controlador = {
	id: number;
	horta_id: string;
	portas: Array<string>;

	codigo_vinculacao: string;
	controlador_mac: string;

	// Datas (auditoria)
	created_at?: Date;
	bounded_at?: Date;
	bounded_by?: number;
};

export default Controlador;
