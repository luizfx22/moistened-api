type Horta = {
	id: string;
	descricao: string;
	localizacao?: string;
	owner_id: string;

	created_by: string;
	created_at: Date;

	updated_at: Date;
	updated_by: string;
};

export default Horta;
