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

create table "UsuariosGrupo"
(
	id serial
		constraint usuariosgrupo_pk
			primary key,
	usuario_id uuid not null
		constraint usuariosgrupo_users_id_fk
			references auth.users
				on delete cascade,
	grupo_id int not null
		constraint usuariosgrupo_grupos_id_fk
			references "Grupos"
				on delete cascade,
	created_at timestamp default NOW()
);

create unique index usuariosgrupo_usuario_id_uindex
	on "UsuariosGrupo" (usuario_id);

