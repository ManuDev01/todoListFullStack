--
-- PostgreSQL database cluster dump
--

-- Started on 2025-06-27 11:32:37

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Bm+/+tKKR/9K1yn+p1vd8w==$RbmPgg5Z3+WiBH10H7nZ5vI2r6o+JTVQCZJl6jYhIGA=:ZgpnsxSGplCjoBMCKJw44+ke4TAbZ0FTzzHfXJyEgXo=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-27 11:32:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-06-27 11:32:37

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-27 11:32:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-06-27 11:32:37

--
-- PostgreSQL database dump complete
--

--
-- Database "todoList" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-27 11:32:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4817 (class 1262 OID 16388)
-- Name: todoList; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "todoList" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-VE';


ALTER DATABASE "todoList" OWNER TO postgres;

\connect "todoList"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16398)
-- Name: pestanas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pestanas (
    idpestana integer NOT NULL,
    nombre character varying(40),
    idusuario integer
);


ALTER TABLE public.pestanas OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16397)
-- Name: pestanas_idpestana_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pestanas_idpestana_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pestanas_idpestana_seq OWNER TO postgres;

--
-- TOC entry 4818 (class 0 OID 0)
-- Dependencies: 219
-- Name: pestanas_idpestana_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pestanas_idpestana_seq OWNED BY public.pestanas.idpestana;


--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: tareas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tareas (
    idtareas integer NOT NULL,
    nombretarea character varying(100),
    estadotarea character varying(20),
    idpestana integer
);


ALTER TABLE public.tareas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: tareas_idtareas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tareas_idtareas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_idtareas_seq OWNER TO postgres;

--
-- TOC entry 4819 (class 0 OID 0)
-- Dependencies: 221
-- Name: tareas_idtareas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tareas_idtareas_seq OWNED BY public.tareas.idtareas;


--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    idusuario integer NOT NULL,
    nombre character varying(40) NOT NULL,
    apellido character varying(40) NOT NULL,
    usuario character varying(40) NOT NULL,
    contrasena character varying(40) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16394)
-- Name: usuarios_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN idusuario ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.usuarios_idusuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4651 (class 2604 OID 16401)
-- Name: pestanas idpestana; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pestanas ALTER COLUMN idpestana SET DEFAULT nextval('public.pestanas_idpestana_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16408)
-- Name: tareas idtareas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas ALTER COLUMN idtareas SET DEFAULT nextval('public.tareas_idtareas_seq'::regclass);


--
-- TOC entry 4809 (class 0 OID 16398)
-- Dependencies: 220
-- Data for Name: pestanas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pestanas (idpestana, nombre, idusuario) FROM stdin;
1	Prueba	1
\.


--
-- TOC entry 4811 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tareas (idtareas, nombretarea, estadotarea, idpestana) FROM stdin;
1	Prueba	Por Hacer	1
\.


--
-- TOC entry 4806 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (idusuario, nombre, apellido, usuario, contrasena) FROM stdin;
1	admin	admin	admin	admin
\.


--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 219
-- Name: pestanas_idpestana_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pestanas_idpestana_seq', 1, true);


--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 221
-- Name: tareas_idtareas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tareas_idtareas_seq', 1, true);


--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuarios_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_idusuario_seq', 1, true);


--
-- TOC entry 4658 (class 2606 OID 16403)
-- Name: pestanas pestanas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pestanas
    ADD CONSTRAINT pestanas_pkey PRIMARY KEY (idpestana);


--
-- TOC entry 4660 (class 2606 OID 16410)
-- Name: tareas tareas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (idtareas);


--
-- TOC entry 4654 (class 2606 OID 16396)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 4656 (class 2606 OID 16393)
-- Name: usuarios usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_usuario_key UNIQUE (usuario);


-- Completed on 2025-06-27 11:32:38

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-06-27 11:32:38

--
-- PostgreSQL database cluster dump complete
--

