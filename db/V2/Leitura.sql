create table "Leitura"
(
	id serial
		constraint leitura_pk
			primary key,
	sensor_id int not null
		constraint leitura_sensor_id_fk
			references "Sensor",
	air_temperature float4 not null,
	air_humidity float4 not null,
	soil_humidity int not null,
	readed_at timestamp default NOW() not null
);
