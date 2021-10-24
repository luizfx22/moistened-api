create table "Users"
(
    id                uuid  not null
        constraint "Users_pkey"
            primary key,
    email             text  not null,
    raw_user_metadata jsonb not null,
    created_at        timestamp with time zone default now(),
    updated_at        timestamp with time zone default now()
);

-- trigger para mapear a tabela auth.users na public.auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public."Users" (id, email, raw_user_meta_data)
  values (new.id, new.email, raw_user_meta_data);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


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
