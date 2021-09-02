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

