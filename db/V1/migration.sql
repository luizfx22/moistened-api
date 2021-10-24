create table "Horta"
(
	id uuid default gen_random_uuid(),
	descricao text not null,
	localizacao jsonb,
	proprietario_id uuid not null
		constraint horta_users_id_fk
			references "Users",
	created_by uuid not null
		constraint horta_users_id_fk_2
			references "Users",
	created_at timestamp default NOW() not null,
	updated_by uuid not null
		constraint horta_users_id_fk_3
			references "Users",
	updated_at timestamp default NOW()
);

create unique index horta_id_uindex
	on "Horta" (id);

alter table "Horta"
	add constraint horta_pk
		primary key (id);

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

create table "Controlador"
(
	id serial
		constraint controlador_pk
			primary key,
	horta_id uuid not null
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

create table "Sensor"
(
	id serial,
	controlador_id int
		constraint sensor_controlador_id_fk
			references "Controlador" (id),
	sensor_mac text not null,
	codigo_vinculacao int not null,
	created_at timestamp default NOW() not null,
	bounded_by uuid
		constraint sensor_users_id_fk
			references "Users",
	bounded_at timestamp default NOW()
);

create unique index sensor_codigo_vinculacao_uindex
	on "Sensor" (codigo_vinculacao);

create unique index sensor_id_uindex
	on "Sensor" (id);

create unique index sensor_sensor_mac_uindex
	on "Sensor" (sensor_mac);

alter table "Sensor"
	add constraint sensor_pk
		primary key (id);

create table "Dado"
(
	id serial
		constraint dado_pk
			primary key,
	sensor_id int not null
		constraint dado_sensor_id_fk
			references "Sensor",
	air_temperature float4 not null,
	air_humidity float4 not null,
	soil_humidity int not null,
	readed_at timestamp default NOW() not null
);
