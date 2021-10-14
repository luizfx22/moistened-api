type Usuario = {
	id: string;
	email: string;
	raw_user_metadata: any;

	// Datas (auditoria)
	created_at?: Date;
	updated_at?: Date;
};

export default Usuario;
