create table "Controlador"
(
	id serial
		constraint controlador_pk
			primary key,
	horta_id int not null
		constraint controlador_horta_id_fk
			references "Horta",
	localizacao jsonb,
	created_by uuid not null
		constraint controlador_users_id_fk
			references "Users",
	created_at timestamp default NOW(),
	updated_by uuid not null
		constraint controlador_users_id_fk_2
			references "Users",
	updated_at timestamp default NOW()
);

