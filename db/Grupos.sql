create table "Grupos"
(
	id serial
		constraint grupos_pk
			primary key,
	nome varchar default 'Grupo sem nome',
	created_at timestamp default NOW(),
	created_by uuid not null
		constraint fk_rel_cby_grupos
			references auth.users
				on delete cascade,
	updated_at timestamp default NOW(),
	updated_by uuid not null
		constraint fk_rel_uby_grupos
			references auth.users
				on delete cascade
);

