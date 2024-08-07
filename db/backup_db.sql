PGDMP      '                |            postgres    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4792                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    16413    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL,
    rg character varying(20) NOT NULL,
    data_nasc date NOT NULL,
    sexo character varying(20) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16412    pessoas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pessoas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pessoas_id_seq;
       public          postgres    false    217            �           0    0    pessoas_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pessoas_id_seq OWNED BY public.users.id;
          public          postgres    false    216                       2604    16416    users id    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.pessoas_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �          0    16413    users 
   TABLE DATA           C   COPY public.users (id, nome, cpf, rg, data_nasc, sexo) FROM stdin;
    public          postgres    false    217   �       �           0    0    pessoas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pessoas_id_seq', 22, true);
          public          postgres    false    216                       2606    16420    users pessoas_cpf_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pessoas_cpf_key UNIQUE (cpf);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT pessoas_cpf_key;
       public            postgres    false    217                       2606    16418    users pessoas_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pessoas_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT pessoas_pkey;
       public            postgres    false    217            !           2606    16422    users pessoas_rg_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT pessoas_rg_key UNIQUE (rg);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT pessoas_rg_key;
       public            postgres    false    217            �   v  x�U�MN#1�וS�e��bז �H�Bl����=�I��Ϭ8���DP�m����+���Se��j;�)��u^Z��NqM�;�٠!����:�r{eܵi�j��Qݔq� ƨ�����AXA����8�|	�����ޤ�����n�Z��^�I�y�NJh{G��]�;�cSW�5׬�[9 �E�@���:-��_�$�L%���˵dH)�E�"�n�u
?���Ͱ/�D`����6����դC�R1�Ĭ�8�. �3v�&���.�w=�r�P�C=����$%�Z��$[�䄉Ŗ��=�b᱌y�2�M^���	#KiHǝ��.�e8NF�^�A� ����Y�(J�,����Y�V�o����     