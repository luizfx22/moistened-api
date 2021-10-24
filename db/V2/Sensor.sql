create table "Sensor"
(
	id serial,
	horta_id uuid not null
		constraint controlador_horta_id_fk
			references "Horta",
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
