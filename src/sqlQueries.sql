-- Database: graphql-test
-- DROP DATABASE \"graphql-test\";
CREATE DATABASE "graphql-test"
    WITH OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c "graphql-test";

CREATE TABLE public."user"
(
    first_name character varying(30),
    last_name character varying(30),
    email character varying(30),
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."user"
    OWNER to postgres;


CREATE TABLE public."project"
(
    name character varying(30),
    creator integer NOT NULL,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."project"
    OWNER to postgres;


CREATE TABLE public.task
(
    id serial NOT NULL,
    name character varying(100) NOT NULL,
    creator integer NOT NULL,
    executor integer NOT NULL,
    start_date date NOT NULL DEFAULT CURRENT_DATE,
    end_date date NOT NULL DEFAULT CURRENT_DATE,
    project integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id)
,
    CONSTRAINT creator FOREIGN KEY (creator)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT executor FOREIGN KEY (executor)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.task
    OWNER to postgres;

insert into public."user" (first_name, last_name, email) values ('ivan', 'ivanov', 'i@i.i');
insert into public."user" (first_name, last_name, email) values ('petr', 'petrov', 'p@p.p');
insert into public."user" (first_name, last_name, email) values ('mark', 'zuckerbergov', 'm@z.p');

insert into public."project" (name, creator) values ('main project', 1);
insert into public."project" (name, creator) values ('big project', 3);

insert into public."task" (name, creator, executor, project) values ('first', 1, 2, 1);
insert into public."task" (name, creator, executor, project) values ('second', 1, 1, 1);
insert into public."task" (name, creator, executor, project) values ('new task', 1, 3, 2);