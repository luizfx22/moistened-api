create table "AguardandoVinculacao"
(
	id serial
		constraint aguardandovinculacao_pk
			primary key,
	codigo_vinculacao int,
	mac varchar not null,
	fl_bound bool default false not null,
	grupo_id int
		constraint aguardandovinculacao_grupos_id_fk
			references "Grupos"
				on delete cascade,
	created_at timestamp default NOW()
);

