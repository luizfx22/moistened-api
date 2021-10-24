create table "ContasHorta"
(
	id serial
		constraint contashorta_pk
			primary key,
	usuario_id uuid not null
		constraint contashorta_users_id_fk
			references "Users" (id),
	horta_id uuid not null
		constraint contashorta_horta_id_fk
			references "Horta" (id)
);
