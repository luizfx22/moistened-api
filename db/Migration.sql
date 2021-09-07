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

create table "Sensores"
(
	id serial
		constraint sensor_pk
			primary key,
	grupo_id int
		constraint sensor_grupos_id_fk
			references "Grupos"
				on delete cascade,
	sensor_mac varchar not null,
	codigo_vinculacao int,
	created_at timestamp default NOW(),
	bounded_at timestamp,
	bounded_by uuid
		constraint sensor_users_id_fk
			references auth.users
				on delete cascade
);

create table "Dados"
(
	id serial
		constraint dados_pk
			primary key,
	sensor_id int not null
		constraint dados_sensor_id_fk
			references "Sensores",
	air_temperature float4 not null,
	air_humidity float4 not null,
	soil_humidity int not null,
	readed_at timestamp default NOW() not null
);

-- Creating indexes
create unique index sensores_sensor_mac_uindex
	on "Sensores" (sensor_mac);
