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
