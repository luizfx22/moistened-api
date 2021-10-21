create table "Controlador"
(
    id                serial
        constraint controlador_pk
            primary key,
    horta_id          uuid not null
        constraint controlador_horta_id_fk
            references "Horta",
    controlador_mac   text not null,
    codigo_vinculacao text not null,
    created_by        uuid not null
        constraint controlador_users_id_fk
            references "Users",
    created_at        timestamp default now(),
    updated_by        uuid not null
        constraint controlador_users_id_fk_2
            references "Users",
    updated_at        timestamp default now(),
);

create unique index controlador_codigo_vinculacao_uindex
    on "Controlador" (codigo_vinculacao);

create unique index controlador_controlador_mac_uindex
    on "Controlador" (controlador_mac);
