-- auto-generated definition
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

alter table "Users"
    owner to supabase_admin;

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
