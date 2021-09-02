create table "Sensor"
(
	id serial
		constraint sensor_pk
			primary key,
	grupo_id int not null
		constraint sensor_grupos_id_fk
			references "Grupos"
				on delete cascade,
	sensor_mac varchar not null,
	created_at timestamp default NOW(),
	bounded_at timestamp,
	bounded_by uuid
		constraint sensor_users_id_fk
			references auth.users
				on delete cascade
);

