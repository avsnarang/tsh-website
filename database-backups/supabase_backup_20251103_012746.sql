--
-- PostgreSQL database dump
--

-- Dumped from database version 15.14
-- Dumped by pg_dump version 17.5

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
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'alumni'
);


ALTER TYPE public.user_role OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: can_student_rsvp(uuid, text, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid DEFAULT NULL::uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 
    FROM event_rsvps
    WHERE event_id = p_event_id
    AND admission_number = p_admission_number
    AND status = 'attending'
    AND id != COALESCE(p_current_rsvp_id, '00000000-0000-0000-0000-000000000000'::uuid)
  );
END;
$$;


ALTER FUNCTION public.can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid) OWNER TO postgres;

--
-- Name: check_admission_number(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_admission_number() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM events e
    WHERE e.id = NEW.event_id
    AND e.requires_admission_number = true
    AND NEW.admission_number IS NULL
  ) THEN
    RAISE EXCEPTION 'Admission number is required for this event';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_admission_number() OWNER TO postgres;

--
-- Name: check_if_user_is_admin(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_if_user_is_admin() RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = 'admin'
    );
END;
$$;


ALTER FUNCTION public.check_if_user_is_admin() OWNER TO postgres;

--
-- Name: check_max_guests(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_max_guests() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM events e
    WHERE e.id = NEW.event_id
    AND NEW.guests > e.max_guests_per_rsvp
  ) THEN
    RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_max_guests() OWNER TO postgres;

--
-- Name: check_student_rsvp_status(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_student_rsvp_status(p_event_id uuid, p_admission_number text) RETURNS TABLE(can_rsvp boolean, current_status text, current_guests integer, student_name text)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN e.accepting_rsvps = false THEN false
      ELSE true
    END as can_rsvp,
    er.status::text,
    er.guests,
    s.full_name
  FROM events e
  LEFT JOIN event_rsvps er ON er.event_id = e.id 
    AND er.admission_number = p_admission_number
  LEFT JOIN students s ON s.admission_number = p_admission_number
  WHERE e.id = p_event_id;
END;
$$;


ALTER FUNCTION public.check_student_rsvp_status(p_event_id uuid, p_admission_number text) OWNER TO postgres;

--
-- Name: delete_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_user() RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  return supabase_auth.admin_delete_user(auth.uid());
end;
$$;


ALTER FUNCTION public.delete_user() OWNER TO postgres;

--
-- Name: get_event_rsvp_count(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_event_rsvp_count(event_id uuid) RETURNS integer
    LANGUAGE plpgsql
    AS $_$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = $1
    AND status = 'attending'
  );
END;
$_$;


ALTER FUNCTION public.get_event_rsvp_count(event_id uuid) OWNER TO postgres;

--
-- Name: get_event_rsvps(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_event_rsvps(event_id uuid) RETURNS TABLE(admission_number text, student_name text, student_class text, guests integer, created_at timestamp with time zone, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  RETURN QUERY
  SELECT 
    er.admission_number,
    s.full_name as student_name,
    s.class as student_class,
    er.guests,
    er.created_at,
    er.updated_at
  FROM event_rsvps er
  LEFT JOIN students s ON er.admission_number = s.admission_number
  WHERE er.event_id = $1
  AND er.status = 'attending'
  ORDER BY er.created_at;
END;
$_$;


ALTER FUNCTION public.get_event_rsvps(event_id uuid) OWNER TO postgres;

--
-- Name: get_event_total_guests(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_event_total_guests(p_event_id uuid) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = p_event_id
    AND status = 'attending'
  );
END;
$$;


ALTER FUNCTION public.get_event_total_guests(p_event_id uuid) OWNER TO postgres;

--
-- Name: get_student_details(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_student_details(p_admission_number text) RETURNS TABLE(admission_number text, full_name text, class_name text, is_valid boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.admission_number,
    s.full_name,
    s.class,
    true as is_valid
  FROM students s
  WHERE s.admission_number = p_admission_number
  UNION ALL
  SELECT 
    p_admission_number,
    NULL::text,
    NULL::text,
    false
  WHERE NOT EXISTS (
    SELECT 1 FROM students 
    WHERE admission_number = p_admission_number
  )
  LIMIT 1;
END;
$$;


ALTER FUNCTION public.get_student_details(p_admission_number text) OWNER TO postgres;

--
-- Name: get_user_role(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_user_role(user_id uuid) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  RETURN (
    SELECT role::text
    FROM users
    WHERE id = user_id
    LIMIT 1
  );
END;
$$;


ALTER FUNCTION public.get_user_role(user_id uuid) OWNER TO postgres;

--
-- Name: set_auth_user_fields(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_auth_user_fields() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    NEW.created_by = auth.uid();
    NEW.updated_by = auth.uid();
  ELSIF (TG_OP = 'UPDATE') THEN
    NEW.updated_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_auth_user_fields() OWNER TO postgres;

--
-- Name: update_event_rsvps_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_event_rsvps_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_event_rsvps_updated_at() OWNER TO postgres;

--
-- Name: update_latest_updates_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_latest_updates_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_latest_updates_updated_at() OWNER TO postgres;

--
-- Name: update_testimonial_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_testimonial_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_testimonial_updated_at() OWNER TO postgres;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: validate_display_locations(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_display_locations() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- If array contains 'all', it should be the only value
  IF 'all' = ANY(NEW.display_locations) AND array_length(NEW.display_locations, 1) > 1 THEN
    RAISE EXCEPTION 'When "all" is selected, no other locations should be specified';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.validate_display_locations() OWNER TO postgres;

--
-- Name: validate_primary_image(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_primary_image() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- If primary_image_id is set, validate it belongs to the event
  IF NEW.primary_image_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM gallery_images 
      WHERE id = NEW.primary_image_id 
      AND event_id = NEW.id
    ) THEN
      RAISE EXCEPTION 'Primary image must belong to this event';
    END IF;
  END IF;

  -- Clear primary_image_id if primary_image_url is set and vice versa
  IF NEW.primary_image_url IS NOT NULL THEN
    NEW.primary_image_id = NULL;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.validate_primary_image() OWNER TO postgres;

--
-- Name: validate_rsvp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_rsvp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_event_accepts_rsvps boolean;
  v_existing_rsvp record;
  v_student_name text;
BEGIN
  -- Check if event is accepting RSVPs
  SELECT accepting_rsvps INTO v_event_accepts_rsvps
  FROM events
  WHERE id = NEW.event_id;

  IF NOT v_event_accepts_rsvps THEN
    RAISE EXCEPTION 'This event is no longer accepting RSVPs';
  END IF;

  -- Always require admission number
  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
    RAISE EXCEPTION 'Student admission number is required';
  END IF;
  
  -- Verify admission number exists and get student name
  SELECT full_name INTO v_student_name
  FROM students 
  WHERE admission_number = NEW.admission_number;

  IF v_student_name IS NULL THEN
    RAISE EXCEPTION 'Invalid admission number';
  END IF;

  -- Check for existing RSVP with this admission number
  SELECT * INTO v_existing_rsvp
  FROM event_rsvps
  WHERE event_id = NEW.event_id
  AND admission_number = NEW.admission_number
  AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  LIMIT 1;

  -- If there's an existing RSVP, update it instead of creating a new one
  IF v_existing_rsvp IS NOT NULL THEN
    -- Update the existing RSVP
    UPDATE event_rsvps
    SET 
      status = NEW.status,
      guests = CASE WHEN NEW.status = 'attending' THEN NEW.guests ELSE 1 END,
      updated_at = now()
    WHERE id = v_existing_rsvp.id;
    
    -- Return NULL to prevent the original INSERT/UPDATE
    RETURN NULL;
  END IF;

  -- For attending status
  IF NEW.status = 'attending' THEN
    -- Check max guests per RSVP
    IF NEW.guests > (
      SELECT max_guests_per_rsvp 
      FROM events 
      WHERE id = NEW.event_id
    ) THEN
      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP';
    END IF;

    -- Check event capacity if set
    IF EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = NEW.event_id
      AND e.max_capacity IS NOT NULL
      AND (
        SELECT COALESCE(SUM(guests), 0)
        FROM event_rsvps
        WHERE event_id = e.id
        AND status = 'attending'
        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      ) + NEW.guests > e.max_capacity
    ) THEN
      RAISE EXCEPTION 'Event has reached maximum capacity';
    END IF;
  ELSE
    -- Set guests to 1 for non-attending RSVPs
    NEW.guests := 1;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.validate_rsvp() OWNER TO postgres;

--
-- Name: validate_rsvp_guests(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_rsvp_guests() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Check if guests exceed max_guests_per_rsvp
  IF NEW.guests > (SELECT max_guests_per_rsvp FROM events WHERE id = NEW.event_id) THEN
    RAISE EXCEPTION 'Number of guests cannot exceed maximum allowed per RSVP';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.validate_rsvp_guests() OWNER TO postgres;

--
-- Name: validate_schedule_types(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.validate_schedule_types() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Check if any schedule has an invalid type
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(NEW.schedules) schedule
    WHERE schedule->>'type' NOT IN ('Weekday', 'Weekend', 'Summer', 'Winter')
  ) THEN
    RAISE EXCEPTION 'Invalid schedule type. Must be Weekday, Weekend, Summer, or Winter';
  END IF;
  
  -- Check if timings is an array
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(NEW.schedules) schedule
    WHERE jsonb_typeof(schedule->'timings') != 'array'
  ) THEN
    RAISE EXCEPTION 'Timings must be an array';
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.validate_schedule_types() OWNER TO postgres;

--
-- Name: verify_admission_number(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verify_admission_number(admission_number text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM students 
    WHERE students.admission_number = verify_admission_number.admission_number
  );
END;
$$;


ALTER FUNCTION public.verify_admission_number(admission_number text) OWNER TO postgres;

--
-- Name: verify_student_admission(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verify_student_admission() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    -- Verify the student exists in students table
    if not exists (
        select 1 
        from students 
        where admission_number = NEW.admission_number
    ) then
        raise exception 'Invalid admission number';
    end if;
    
    return NEW;
end;
$$;


ALTER FUNCTION public.verify_student_admission() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: academic_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_sessions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    value text NOT NULL,
    label text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.academic_sessions OWNER TO postgres;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id uuid NOT NULL,
    role text DEFAULT 'manager'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: alumni_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumni_profiles (
    id uuid NOT NULL,
    full_name text NOT NULL,
    batch_year integer NOT NULL,
    current_location text,
    occupation text,
    company text,
    bio text,
    linkedin_url text,
    is_public boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    phone text,
    email text,
    instagram_url text,
    facebook_url text,
    show_contact_info boolean DEFAULT false,
    testimonial text,
    show_testimonial boolean DEFAULT true,
    profile_picture_url text,
    show_in_success boolean DEFAULT false NOT NULL
);


ALTER TABLE public.alumni_profiles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    role public.user_role DEFAULT 'alumni'::public.user_role NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: COLUMN users.role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.role IS 'User role - either admin or alumni';


--
-- Name: auth_user_roles; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.auth_user_roles AS
 SELECT users.id AS user_id,
    COALESCE(( SELECT users_1.role
           FROM public.users users_1
          WHERE (users_1.id = users.id)), 'alumni'::public.user_role) AS role
   FROM auth.users;


ALTER VIEW public.auth_user_roles OWNER TO postgres;

--
-- Name: calendar_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    location text,
    event_type text NOT NULL,
    branch text NOT NULL,
    session text NOT NULL,
    is_public boolean DEFAULT false NOT NULL,
    synced_with_google boolean DEFAULT false NOT NULL,
    google_event_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_all_day boolean DEFAULT false
);


ALTER TABLE public.calendar_events OWNER TO postgres;

--
-- Name: event_rsvps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_rsvps (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    user_id uuid,
    status text NOT NULL,
    guests integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    admission_number text,
    max_guests_per_rsvp integer,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT event_rsvps_status_check CHECK ((status = ANY (ARRAY['attending'::text, 'not_attending'::text, 'maybe'::text])))
);


ALTER TABLE public.event_rsvps OWNER TO postgres;

--
-- Name: event_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_types (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    value text NOT NULL,
    label text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.event_types OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    date date NOT NULL,
    "time" text NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    cover_image text NOT NULL,
    max_capacity integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    max_guests_per_rsvp integer DEFAULT 4 NOT NULL,
    requires_admission_number boolean DEFAULT false NOT NULL,
    accepting_rsvps boolean DEFAULT true NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: featured_testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.featured_testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    alumni_profile_id uuid,
    is_visible boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.featured_testimonials OWNER TO postgres;

--
-- Name: gallery_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    date date NOT NULL,
    campus text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    primary_image_url text,
    primary_image_id uuid
);


ALTER TABLE public.gallery_events OWNER TO postgres;

--
-- Name: gallery_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    image_url text NOT NULL,
    caption text,
    created_at timestamp with time zone DEFAULT now(),
    "eventID" uuid NOT NULL
);


ALTER TABLE public.gallery_images OWNER TO postgres;

--
-- Name: latest_updates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.latest_updates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    content text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    link text
);


ALTER TABLE public.latest_updates OWNER TO postgres;

--
-- Name: leadership_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leadership_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role text NOT NULL,
    name text NOT NULL,
    preview text NOT NULL,
    full_message text NOT NULL,
    "order" integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    photo_url text,
    campus text DEFAULT 'all'::text,
    display_locations text[] DEFAULT ARRAY['all'::text],
    CONSTRAINT display_locations_not_empty CHECK ((array_length(display_locations, 1) > 0)),
    CONSTRAINT valid_display_locations CHECK ((display_locations <@ ARRAY['all'::text, 'homepage'::text, 'leadership'::text, 'paonta-sahib'::text, 'juniors'::text, 'majra'::text]))
);


ALTER TABLE public.leadership_messages OWNER TO postgres;

--
-- Name: sports_programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sports_programs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    category text,
    coach text,
    achievements text,
    description text,
    age_groups text[],
    schedules jsonb,
    images jsonb,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_by uuid,
    updated_at timestamp with time zone DEFAULT now(),
    is_published boolean DEFAULT true NOT NULL
);


ALTER TABLE public.sports_programs OWNER TO postgres;

--
-- Name: sports_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sports_registrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    admission_number text NOT NULL,
    sport_id uuid NOT NULL,
    medical_conditions text,
    preferred_schedule text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    status text DEFAULT 'pending'::text,
    CONSTRAINT sports_registrations_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
);


ALTER TABLE public.sports_registrations OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    admission_number text NOT NULL,
    full_name text NOT NULL,
    class text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: success_stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.success_stories (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    alumni_id uuid NOT NULL,
    created_by uuid NOT NULL
);


ALTER TABLE public.success_stories OWNER TO postgres;

--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name text NOT NULL,
    profile_picture_url text,
    qualifications text[] NOT NULL,
    experience_years integer NOT NULL,
    designation text NOT NULL,
    department text,
    bio text,
    is_visible boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    subject text[],
    class_level text,
    photo_url text,
    CONSTRAINT teachers_class_level_check CHECK ((class_level = ANY (ARRAY['NTT'::text, 'PRT'::text, 'TGT'::text, 'PGT'::text]))),
    CONSTRAINT valid_class_level CHECK ((class_level = ANY (ARRAY['NTT'::text, 'PRT'::text, 'TGT'::text, 'PGT'::text])))
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    source_type text NOT NULL,
    author_name text NOT NULL,
    student_name text,
    class text,
    content text NOT NULL,
    profile_picture_url text,
    is_visible boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT testimonials_source_type_check CHECK ((source_type = ANY (ARRAY['parent'::text, 'student'::text, 'alumni'::text])))
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: user_roles; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.user_roles WITH (security_invoker='on') AS
 SELECT users.id AS user_id,
    users.role
   FROM public.users;


ALTER VIEW public.user_roles OWNER TO postgres;

--
-- Name: youtube_videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.youtube_videos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    embed_code text NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.youtube_videos OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	fb1e4b50-b947-451a-a7fd-aecce8ff469b	{"action":"user_signedup","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-01 15:45:12.973352+00	
00000000-0000-0000-0000-000000000000	e0aa1f78-64db-4c87-8574-c02339067a7f	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:45:12.981352+00	
00000000-0000-0000-0000-000000000000	4ef4f2cc-43d8-491c-9370-75abb937c49f	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:45:14.198215+00	
00000000-0000-0000-0000-000000000000	3dc8f6c0-658a-44c5-b4d1-add1c5608736	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:45:47.805312+00	
00000000-0000-0000-0000-000000000000	7fdb8646-033f-49c6-8fdd-8efb5f208b11	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:45:57.918+00	
00000000-0000-0000-0000-000000000000	9f9a5259-aeb7-4a6f-8c36-a7cebb09182f	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:46:32.549796+00	
00000000-0000-0000-0000-000000000000	774622b5-accb-4103-9f26-e6ec76d63416	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:46:53.915006+00	
00000000-0000-0000-0000-000000000000	00b6e1ef-ba7c-4e72-affa-1c38017bbd6f	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:51:49.332795+00	
00000000-0000-0000-0000-000000000000	f40ccbe6-127e-4ea9-8069-f306bd8cd0ff	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:53:04.097331+00	
00000000-0000-0000-0000-000000000000	81fc4e31-fd90-4fed-9fcd-21bf3357bb5a	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:54:59.517078+00	
00000000-0000-0000-0000-000000000000	6e05f133-d9ca-44d7-92f8-734e8a169087	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:55:20.208329+00	
00000000-0000-0000-0000-000000000000	e03d74c0-8833-42ff-af03-146da010de80	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:56:04.485171+00	
00000000-0000-0000-0000-000000000000	ecad1c82-c729-4cbe-b72d-6b0d167db864	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 15:59:52.681282+00	
00000000-0000-0000-0000-000000000000	9bdf35f7-2bfb-48b7-9b1c-c731248f0fae	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 16:08:34.870005+00	
00000000-0000-0000-0000-000000000000	a629b6d9-076b-4b18-8eba-9226a045873d	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 17:00:19.811367+00	
00000000-0000-0000-0000-000000000000	f8aba802-18cf-4c2b-bf11-c91f33a92926	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-01 17:43:06.333438+00	
00000000-0000-0000-0000-000000000000	034f7d54-ee40-468e-8391-a451d15bfe4a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-01 17:43:06.334343+00	
00000000-0000-0000-0000-000000000000	d8528098-2bf2-4c35-a1d6-13d1a478b45a	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 20:22:59.143736+00	
00000000-0000-0000-0000-000000000000	4fa4f6af-9f35-4d3f-859a-b7aad0e13883	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 20:24:23.800636+00	
00000000-0000-0000-0000-000000000000	a7e15538-7fbd-49c2-9350-c5c818a92ff2	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 20:28:08.543827+00	
00000000-0000-0000-0000-000000000000	5caa275f-bc30-4e00-ba30-37cb7872f731	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-01 21:47:41.73932+00	
00000000-0000-0000-0000-000000000000	81808502-3abe-4bce-86c5-ecbd0caf3ab1	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-01 21:47:41.741087+00	
00000000-0000-0000-0000-000000000000	d14ee6b8-978e-4b4a-a45c-d409b8567709	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 22:36:36.204185+00	
00000000-0000-0000-0000-000000000000	0212e607-5dae-4362-8e1c-c0233d9baac3	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 22:36:41.186008+00	
00000000-0000-0000-0000-000000000000	ff900199-8f3c-42bc-bad0-f207258300c7	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-01 22:37:48.753431+00	
00000000-0000-0000-0000-000000000000	02f6d4e6-0b16-44a8-985e-dac4451e3abd	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 06:36:09.888224+00	
00000000-0000-0000-0000-000000000000	b0ba6315-1560-45dc-a209-0de391f1548b	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 06:36:09.899216+00	
00000000-0000-0000-0000-000000000000	33981f57-e5b2-4eec-bc23-a087719f348b	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 06:39:01.305596+00	
00000000-0000-0000-0000-000000000000	3866fe06-9c87-47d1-b2d5-2120d560e721	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:40:12.024336+00	
00000000-0000-0000-0000-000000000000	e7537526-3f09-4fa7-a4d4-3411583bc706	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 06:40:12.855352+00	
00000000-0000-0000-0000-000000000000	a035f964-2bbd-46e1-841e-c66c5fb86fe8	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:42:33.174271+00	
00000000-0000-0000-0000-000000000000	47733a36-4b9c-4a5e-9c9d-9133d603420c	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 06:50:58.972768+00	
00000000-0000-0000-0000-000000000000	a8b10389-9e7f-41ca-a05a-c9b0f4d5252a	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:51:10.077286+00	
00000000-0000-0000-0000-000000000000	a5b0df22-7ad6-4b01-aae4-de9fe6be710b	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 06:51:11.024609+00	
00000000-0000-0000-0000-000000000000	ef36f62f-f6a8-4439-989e-b3f2f45fab21	{"action":"user_signedup","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 06:51:39.476567+00	
00000000-0000-0000-0000-000000000000	ea805ce1-f700-4cc0-b326-61af2ba3df57	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:51:39.48133+00	
00000000-0000-0000-0000-000000000000	96854727-65a2-4883-8aaa-d6545872f551	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:56:00.784687+00	
00000000-0000-0000-0000-000000000000	45aed390-c9dd-4a44-aae5-64631b6cc34b	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 06:59:00.861523+00	
00000000-0000-0000-0000-000000000000	90efc8e2-8633-4fcd-b82d-8bc60339ee5c	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:04:58.617846+00	
00000000-0000-0000-0000-000000000000	bcba7fad-b82a-47c1-9de0-46d418f36db2	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:11:07.799263+00	
00000000-0000-0000-0000-000000000000	5952ba65-2ab7-435f-b0c9-0f045d7beee0	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:12:54.885833+00	
00000000-0000-0000-0000-000000000000	fc29ef6f-76d7-4d17-8cf8-18b0004fb7f0	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:13:17.707053+00	
00000000-0000-0000-0000-000000000000	10a03808-56cc-449c-a475-363d573401c5	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:21:18.967494+00	
00000000-0000-0000-0000-000000000000	72f7d5ba-75ff-4833-aa12-3daa3db84a6a	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:58:53.918276+00	
00000000-0000-0000-0000-000000000000	44d567be-ec70-4cfa-a78d-db36913407bb	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 07:59:57.865116+00	
00000000-0000-0000-0000-000000000000	547f8b7c-f0ad-40a7-bb6b-bf4c66dbf639	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:00:45.006204+00	
00000000-0000-0000-0000-000000000000	3b5a5f54-38f7-4502-a608-9fe67a4e8ac1	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:14:41.599754+00	
00000000-0000-0000-0000-000000000000	370f01fd-4b38-4125-af9b-12543ecdcb12	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:15:31.773501+00	
00000000-0000-0000-0000-000000000000	e647a12f-ce8d-4c28-b2e6-cb0f5f489868	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:20:15.684725+00	
00000000-0000-0000-0000-000000000000	973966a6-dff4-4f4f-a9c9-f18aa2179229	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:24:53.859297+00	
00000000-0000-0000-0000-000000000000	d93eaa74-734a-42c1-86a3-49c550222962	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:26:29.388186+00	
00000000-0000-0000-0000-000000000000	7a2cc0e3-8e4f-4554-b961-c2d4d634daf6	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:29:16.954319+00	
00000000-0000-0000-0000-000000000000	8a1f605f-0ae2-44c9-9c78-23e4cf4fc864	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 08:29:57.009082+00	
00000000-0000-0000-0000-000000000000	2efd06f8-9b76-4aff-8d52-b4593ab5e8d5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 11:44:49.405873+00	
00000000-0000-0000-0000-000000000000	0494cb0a-0041-4670-b09e-7baafa7038f6	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 11:44:49.408324+00	
00000000-0000-0000-0000-000000000000	1c579d06-58b7-4f34-bfd4-7c14f45b1e6d	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 11:54:05.193822+00	
00000000-0000-0000-0000-000000000000	000cd817-77eb-4648-b8fe-83650a5a4fb2	{"action":"user_repeated_signup","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-03-02 11:54:54.015061+00	
00000000-0000-0000-0000-000000000000	abb98df2-a905-4557-8385-23d98d6140f5	{"action":"user_signedup","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 11:55:05.431197+00	
00000000-0000-0000-0000-000000000000	6d8641e5-5f36-4457-a4af-e5a27473c748	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 11:55:05.435129+00	
00000000-0000-0000-0000-000000000000	f16c2863-ff0d-4d54-bfa2-4b8b523ddb51	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:03:12.301496+00	
00000000-0000-0000-0000-000000000000	f23f6a01-883e-4972-9520-d4e3a59433cf	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:03:32.762775+00	
00000000-0000-0000-0000-000000000000	93f5bb3a-8761-4e49-b665-c95834e3a8b3	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:04:37.432545+00	
00000000-0000-0000-0000-000000000000	cc2692bf-1273-4f84-986e-d5c1521567f6	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:05:03.560084+00	
00000000-0000-0000-0000-000000000000	45ca2a66-eb33-43b2-8008-52832a0006c6	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:06:58.265431+00	
00000000-0000-0000-0000-000000000000	23acad06-ce5c-4ea7-9092-2fc06693c1d9	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:07:10.683255+00	
00000000-0000-0000-0000-000000000000	da0861a2-cb63-4b63-8ba6-a23a218b3c79	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:17:35.784686+00	
00000000-0000-0000-0000-000000000000	3065678d-6fe0-40ff-8e0b-6190971f7e0f	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:22:17.174089+00	
00000000-0000-0000-0000-000000000000	5d288c30-712c-4bcd-82af-1b6a97f82f12	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:32:43.076296+00	
00000000-0000-0000-0000-000000000000	dfadd5fa-f5f5-43db-9cf2-25a3c55529e0	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:35:52.784546+00	
00000000-0000-0000-0000-000000000000	13b3d05e-3f4a-4a97-a6d1-46b9f9988a9b	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:42:10.435815+00	
00000000-0000-0000-0000-000000000000	a8edd935-7241-4a34-8936-81fbc4d664af	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:51:04.716652+00	
00000000-0000-0000-0000-000000000000	504782da-addb-450e-a56a-10907df4b526	{"action":"logout","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 12:54:11.418164+00	
00000000-0000-0000-0000-000000000000	1435dc4f-1eeb-48da-bb8d-74ce3fbce632	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:54:16.41466+00	
00000000-0000-0000-0000-000000000000	93610557-dda4-4e51-80bc-2a9115542c63	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:56:01.732853+00	
00000000-0000-0000-0000-000000000000	8f702f2e-56c4-4aa0-9251-34840afd2fcd	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 12:56:03.054108+00	
00000000-0000-0000-0000-000000000000	be76ad7a-5d16-40c2-8e8f-1cae5a82124f	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:57:25.045926+00	
00000000-0000-0000-0000-000000000000	e8a9fd9e-d4fc-44b8-8f9b-8edcfbb82a3a	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 12:57:26.731851+00	
00000000-0000-0000-0000-000000000000	3cc0467a-d24a-4e14-a878-89a2c05d74bc	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 12:59:50.728801+00	
00000000-0000-0000-0000-000000000000	6636b191-92a5-49bc-b412-89b0ed8c7c76	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 12:59:52.982969+00	
00000000-0000-0000-0000-000000000000	e9456fc2-c22a-4122-a8a7-09465a27bf01	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 13:04:44.508571+00	
00000000-0000-0000-0000-000000000000	e274ab4f-24d1-4cd4-ade0-bf6ccdc0e3fa	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 13:04:46.110785+00	
00000000-0000-0000-0000-000000000000	b4a83a8d-3a8e-4664-bf96-eaa0413e1f2b	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 13:06:23.501677+00	
00000000-0000-0000-0000-000000000000	677d12f6-32f1-47b0-bde0-e86b818a9aed	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 15:57:58.378558+00	
00000000-0000-0000-0000-000000000000	046d8d42-8a73-4eeb-b2ee-0461f3eb2263	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-02 15:57:58.388701+00	
00000000-0000-0000-0000-000000000000	f4576042-612e-4498-8db7-83d21fadccbc	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 16:42:05.720717+00	
00000000-0000-0000-0000-000000000000	862a13c4-0d91-4ed8-9144-1d2f3e48ddc1	{"action":"login","actor_id":"22981fca-b3c6-4844-b2e1-883e9bfaff38","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 16:50:53.151216+00	
00000000-0000-0000-0000-000000000000	09b9ef93-68b2-4a24-8c59-f21fffa6e4f9	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 16:56:38.627672+00	
00000000-0000-0000-0000-000000000000	5e991659-5474-4d50-89b9-ad22b1cf8b7e	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 16:56:56.572122+00	
00000000-0000-0000-0000-000000000000	6e83153e-1c21-46ea-85a5-190701ac508e	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:00:27.97913+00	
00000000-0000-0000-0000-000000000000	170407c8-216a-41ff-88d9-e25a8f84ebf9	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:01:11.219088+00	
00000000-0000-0000-0000-000000000000	0285b69e-acbc-45e8-a466-7d5ecb2f6c08	{"action":"logout","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 17:02:07.238801+00	
00000000-0000-0000-0000-000000000000	94386ede-af10-48ea-85fd-22382352afb8	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:02:17.046953+00	
00000000-0000-0000-0000-000000000000	db580ce4-b874-4622-807f-ef5888b9627f	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:07:03.453337+00	
00000000-0000-0000-0000-000000000000	1c96759c-2526-4789-bc99-b9a85462a628	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:19:26.662996+00	
00000000-0000-0000-0000-000000000000	1bd22bf0-5e36-4438-a97a-d8fc79b626c8	{"action":"logout","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 17:27:04.883115+00	
00000000-0000-0000-0000-000000000000	5968ee6a-6ed5-41a7-b803-24ca344e55f4	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:27:19.529896+00	
00000000-0000-0000-0000-000000000000	9be9f22d-0a6c-43d0-a3a3-d3fd76a4ba23	{"action":"logout","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 17:27:25.963204+00	
00000000-0000-0000-0000-000000000000	7026f691-3804-4940-af07-1d4c6c9dc68d	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:27:35.403765+00	
00000000-0000-0000-0000-000000000000	d5f0337a-4f95-4dfe-a8a8-5abd7b7cf99c	{"action":"logout","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 17:30:32.200871+00	
00000000-0000-0000-0000-000000000000	6b7c0adb-8c40-4816-9d7d-96f737fdbdc2	{"action":"login","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:30:43.368057+00	
00000000-0000-0000-0000-000000000000	44c25973-7d28-4a36-a0f8-9f0b05379752	{"action":"user_modified","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 17:34:24.026221+00	
00000000-0000-0000-0000-000000000000	6ff30bbf-5657-4b03-96c1-1d840d326f08	{"action":"user_modified","actor_id":"8a787a6a-4b92-46aa-a86f-2b5ba8d18d0d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 17:35:04.988892+00	
00000000-0000-0000-0000-000000000000	c7034727-141a-46dd-b699-fbfdd5668f50	{"action":"user_signedup","actor_id":"e8fd5cfe-fa7b-4b23-8f94-879837d88b95","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 17:42:02.587369+00	
00000000-0000-0000-0000-000000000000	92a856bb-81c6-4add-a0f7-a58bb6ddf030	{"action":"login","actor_id":"e8fd5cfe-fa7b-4b23-8f94-879837d88b95","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:42:02.593192+00	
00000000-0000-0000-0000-000000000000	e9e227cf-1c59-4e80-bc10-23fef483c8af	{"action":"user_modified","actor_id":"e8fd5cfe-fa7b-4b23-8f94-879837d88b95","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 17:42:04.11434+00	
00000000-0000-0000-0000-000000000000	b38e60f0-0857-4016-b9aa-2a6d2d20ad46	{"action":"user_signedup","actor_id":"713bf3ed-93b7-4a02-9bcb-6c1fa46faa5c","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 17:47:37.271007+00	
00000000-0000-0000-0000-000000000000	1626969f-8b1c-4cfe-91b2-dfe138c94d51	{"action":"login","actor_id":"713bf3ed-93b7-4a02-9bcb-6c1fa46faa5c","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 17:47:37.276422+00	
00000000-0000-0000-0000-000000000000	5bde3e3e-f8c3-423e-a1d2-ecde21f269fb	{"action":"user_modified","actor_id":"713bf3ed-93b7-4a02-9bcb-6c1fa46faa5c","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 17:47:39.850547+00	
00000000-0000-0000-0000-000000000000	8f49303a-8859-4b6a-be75-f9a2d9a7b363	{"action":"user_modified","actor_id":"713bf3ed-93b7-4a02-9bcb-6c1fa46faa5c","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 17:52:46.12872+00	
00000000-0000-0000-0000-000000000000	e80bbba4-513a-43e8-838f-2280bb4ae953	{"action":"user_signedup","actor_id":"d8d60dfe-c76f-4410-be32-ee02eae6676d","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 18:26:38.782723+00	
00000000-0000-0000-0000-000000000000	80d20e98-3635-4411-80d8-c073b8430026	{"action":"login","actor_id":"d8d60dfe-c76f-4410-be32-ee02eae6676d","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 18:26:38.789983+00	
00000000-0000-0000-0000-000000000000	97415cc7-d0d6-44b0-a04c-4278c28d30ca	{"action":"user_modified","actor_id":"d8d60dfe-c76f-4410-be32-ee02eae6676d","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 18:26:40.657731+00	
00000000-0000-0000-0000-000000000000	edc18819-9d38-4b63-90b3-e0b7197a6261	{"action":"user_modified","actor_id":"d8d60dfe-c76f-4410-be32-ee02eae6676d","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 18:50:14.51192+00	
00000000-0000-0000-0000-000000000000	4eb49502-782b-478b-b2d2-59650d1d3f8b	{"action":"user_signedup","actor_id":"5d9b3917-9e4f-4e46-8e7a-d26f3483287a","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 18:54:52.239731+00	
00000000-0000-0000-0000-000000000000	f76532a2-c3c1-4288-a771-8bd232d2fbad	{"action":"login","actor_id":"5d9b3917-9e4f-4e46-8e7a-d26f3483287a","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 18:54:52.246827+00	
00000000-0000-0000-0000-000000000000	1d9cfcbe-2579-48cc-b2e6-dc25f0a0047c	{"action":"user_modified","actor_id":"5d9b3917-9e4f-4e46-8e7a-d26f3483287a","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 18:54:53.921718+00	
00000000-0000-0000-0000-000000000000	578f2391-3407-41a7-9d3a-028fe9844e72	{"action":"user_modified","actor_id":"5d9b3917-9e4f-4e46-8e7a-d26f3483287a","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 18:55:31.354345+00	
00000000-0000-0000-0000-000000000000	64f41bbc-445a-45e2-9bd9-2ce4b5c50589	{"action":"logout","actor_id":"5d9b3917-9e4f-4e46-8e7a-d26f3483287a","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:04:39.53817+00	
00000000-0000-0000-0000-000000000000	72c621f0-7e07-45e0-914d-d2e6250900e4	{"action":"user_signedup","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:07:33.734327+00	
00000000-0000-0000-0000-000000000000	51e0a98c-80c5-4b80-965e-1ab3c53ca770	{"action":"login","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:07:33.73971+00	
00000000-0000-0000-0000-000000000000	9d12c6e2-030b-4ab9-bb1d-55ba631342e5	{"action":"user_modified","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:07:35.431916+00	
00000000-0000-0000-0000-000000000000	afbe5f3c-5ef2-4b6e-92cd-e1b84afa5ce3	{"action":"logout","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:13:53.069042+00	
00000000-0000-0000-0000-000000000000	193cacc2-fbae-47ee-8026-9d5561099707	{"action":"login","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:14:32.276655+00	
00000000-0000-0000-0000-000000000000	49ba7e20-1d0c-4ddc-90b6-919e0e8c2260	{"action":"user_modified","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:14:34.970953+00	
00000000-0000-0000-0000-000000000000	5c5ef67a-4f00-4cdc-a4fe-f05a58ad3e75	{"action":"logout","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:20:48.079918+00	
00000000-0000-0000-0000-000000000000	7d8ccd14-39a3-49eb-b78a-57a47063f785	{"action":"login","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:20:57.284348+00	
00000000-0000-0000-0000-000000000000	b01e947b-97c7-4bc4-a585-4c33f9b55152	{"action":"logout","actor_id":"f373a8f3-0a7a-4e0b-a253-ee67ae134e79","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:29:26.178382+00	
00000000-0000-0000-0000-000000000000	f81e8fa5-b087-420c-b992-27ef72443de7	{"action":"user_signedup","actor_id":"51fb9212-1949-4da6-9ef9-5120c824cfdb","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:29:58.110262+00	
00000000-0000-0000-0000-000000000000	cb143abc-fd12-4336-b170-a13fc337c9f3	{"action":"login","actor_id":"51fb9212-1949-4da6-9ef9-5120c824cfdb","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:29:58.114555+00	
00000000-0000-0000-0000-000000000000	69fa8c28-2da4-451e-bfab-223799a4438e	{"action":"user_modified","actor_id":"51fb9212-1949-4da6-9ef9-5120c824cfdb","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:30:01.329467+00	
00000000-0000-0000-0000-000000000000	ff59f957-0200-49e5-8c0b-d9b654a53858	{"action":"user_modified","actor_id":"51fb9212-1949-4da6-9ef9-5120c824cfdb","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:33:04.252127+00	
00000000-0000-0000-0000-000000000000	42b5aae0-9c32-4c12-b573-3790b11c8045	{"action":"user_signedup","actor_id":"f37e337d-700d-4747-888f-e7a527abc729","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:33:45.100898+00	
00000000-0000-0000-0000-000000000000	442d2956-0931-4fc1-89cb-3b9f8d71ca26	{"action":"login","actor_id":"f37e337d-700d-4747-888f-e7a527abc729","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:33:45.107329+00	
00000000-0000-0000-0000-000000000000	b8010da2-496d-4d3f-959f-8a818ef38be3	{"action":"user_modified","actor_id":"f37e337d-700d-4747-888f-e7a527abc729","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:33:46.823388+00	
00000000-0000-0000-0000-000000000000	2b832b59-4054-41d4-976f-20c04789c48a	{"action":"user_signedup","actor_id":"9b14a2d2-442d-4d6b-b7b1-8295ead4ca08","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:39:28.590495+00	
00000000-0000-0000-0000-000000000000	92c8d81a-6e47-4088-8cb7-5184d717a152	{"action":"login","actor_id":"9b14a2d2-442d-4d6b-b7b1-8295ead4ca08","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:39:28.595204+00	
00000000-0000-0000-0000-000000000000	bfefdec8-e023-4134-87fa-4be141db3458	{"action":"user_modified","actor_id":"9b14a2d2-442d-4d6b-b7b1-8295ead4ca08","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:39:30.293632+00	
00000000-0000-0000-0000-000000000000	2f2b682f-0957-4fdd-8117-3b7e020aaf36	{"action":"logout","actor_id":"9b14a2d2-442d-4d6b-b7b1-8295ead4ca08","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:45:17.899781+00	
00000000-0000-0000-0000-000000000000	ca28f9d4-6781-4d99-a365-b6e8c56d52eb	{"action":"user_signedup","actor_id":"47fefc62-873d-488a-83dc-b783f775cfea","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:46:02.320868+00	
00000000-0000-0000-0000-000000000000	4aa642f5-3ae1-44b7-96cb-dd5fb067da01	{"action":"login","actor_id":"47fefc62-873d-488a-83dc-b783f775cfea","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:46:02.325257+00	
00000000-0000-0000-0000-000000000000	e660325a-142c-49bd-a32c-becfee51cd08	{"action":"user_modified","actor_id":"47fefc62-873d-488a-83dc-b783f775cfea","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:46:05.49279+00	
00000000-0000-0000-0000-000000000000	de035590-a5d2-4b00-9d94-96b08b1d33c7	{"action":"logout","actor_id":"47fefc62-873d-488a-83dc-b783f775cfea","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 19:54:49.094317+00	
00000000-0000-0000-0000-000000000000	35a5f309-41c5-4309-9063-805b5fca58db	{"action":"user_signedup","actor_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 19:59:39.248766+00	
00000000-0000-0000-0000-000000000000	6883168d-7552-48dc-95ed-67ea2e3bc311	{"action":"login","actor_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 19:59:39.254507+00	
00000000-0000-0000-0000-000000000000	9b9220e6-abff-4443-b34e-b22753b515b5	{"action":"user_modified","actor_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 19:59:42.51869+00	
00000000-0000-0000-0000-000000000000	b8d2e076-4d1f-481e-95a5-95f771da65fd	{"action":"logout","actor_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 20:05:06.239224+00	
00000000-0000-0000-0000-000000000000	bac20ef4-d8a1-4eb3-ab60-26fa8e0420df	{"action":"user_repeated_signup","actor_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-03-02 20:12:18.882205+00	
00000000-0000-0000-0000-000000000000	7f5a4d80-6ca2-4652-84bc-26e77dab84e6	{"action":"user_signedup","actor_id":"bcd8cce3-f437-4c8d-a5eb-add9ea04addf","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 20:12:28.450176+00	
00000000-0000-0000-0000-000000000000	e5724404-a57a-4c63-9078-e09b94385072	{"action":"login","actor_id":"bcd8cce3-f437-4c8d-a5eb-add9ea04addf","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 20:12:28.454414+00	
00000000-0000-0000-0000-000000000000	2abf03c1-423d-45c2-8b8d-f174aba636ac	{"action":"logout","actor_id":"bcd8cce3-f437-4c8d-a5eb-add9ea04addf","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 20:13:58.549834+00	
00000000-0000-0000-0000-000000000000	6988e684-fb8b-43fc-a389-797ab418ae63	{"action":"user_signedup","actor_id":"331f3d35-238f-485a-af11-10ba0921de11","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 20:15:20.907603+00	
00000000-0000-0000-0000-000000000000	753e28c8-bc52-4395-994f-660f440fca5e	{"action":"login","actor_id":"331f3d35-238f-485a-af11-10ba0921de11","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 20:15:20.911792+00	
00000000-0000-0000-0000-000000000000	72b14fb4-ad7a-419a-8852-1e981669fb19	{"action":"user_modified","actor_id":"331f3d35-238f-485a-af11-10ba0921de11","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 20:15:22.650108+00	
00000000-0000-0000-0000-000000000000	7433e24d-3a58-40dc-8cd2-9387c7b8ce01	{"action":"logout","actor_id":"331f3d35-238f-485a-af11-10ba0921de11","actor_username":"test@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 20:16:03.688201+00	
00000000-0000-0000-0000-000000000000	323dd529-61ec-4555-b636-358d0b1049ea	{"action":"user_signedup","actor_id":"047616d1-9fa8-4440-818f-8d31a8bb1bc4","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 20:16:34.044275+00	
00000000-0000-0000-0000-000000000000	8126e330-0ae3-4797-82d5-259e2554cd40	{"action":"login","actor_id":"047616d1-9fa8-4440-818f-8d31a8bb1bc4","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 20:16:34.048252+00	
00000000-0000-0000-0000-000000000000	2c3abc8d-215b-4c29-9cf1-503ba2debc4e	{"action":"user_modified","actor_id":"047616d1-9fa8-4440-818f-8d31a8bb1bc4","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 20:16:35.761574+00	
00000000-0000-0000-0000-000000000000	7631fe33-ccbb-4cca-89ab-5b81b0ec4c80	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@gmail.com","user_id":"331f3d35-238f-485a-af11-10ba0921de11","user_phone":""}}	2025-03-02 20:17:58.113485+00	
00000000-0000-0000-0000-000000000000	b1ef74e9-3bfc-4f3e-9583-2f671e5ba1e4	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sandbora@gmail.com","user_id":"bcd8cce3-f437-4c8d-a5eb-add9ea04addf","user_phone":""}}	2025-03-02 20:17:58.182982+00	
00000000-0000-0000-0000-000000000000	f84ff8d4-62c2-4ca4-9b43-bf91caa74e0a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"avsnarang@gmail.com","user_id":"7b2109b2-cf6a-4d0f-9cbc-9c8bce8eeb70","user_phone":""}}	2025-03-02 20:17:58.257591+00	
00000000-0000-0000-0000-000000000000	b946ea67-0d3b-4769-8ba0-4d3e6c70600c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test2@gmail.com","user_id":"047616d1-9fa8-4440-818f-8d31a8bb1bc4","user_phone":""}}	2025-03-02 20:17:58.391474+00	
00000000-0000-0000-0000-000000000000	737db228-b9ce-481f-831e-571d861731b6	{"action":"user_signedup","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 20:22:51.674702+00	
00000000-0000-0000-0000-000000000000	f79df9c6-9445-45e4-abf6-cd40c3acfde1	{"action":"login","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 20:22:51.679999+00	
00000000-0000-0000-0000-000000000000	5f0b0a57-8179-48c9-bb86-a3dce89e2856	{"action":"user_modified","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 20:22:54.420931+00	
00000000-0000-0000-0000-000000000000	e7577241-f70d-47e1-9990-6b33c7a1ba8b	{"action":"user_modified","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 20:59:29.46556+00	
00000000-0000-0000-0000-000000000000	d1c056ba-be71-40f9-a393-6caad8a7e32a	{"action":"token_refreshed","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:39:13.215593+00	
00000000-0000-0000-0000-000000000000	b1d213a7-1843-4c8f-bc4e-67d70a17e7c7	{"action":"token_revoked","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 21:39:13.218322+00	
00000000-0000-0000-0000-000000000000	5eae0f9a-9e1a-4db5-aa99-d266bacf9f2f	{"action":"logout","actor_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 21:40:47.177964+00	
00000000-0000-0000-0000-000000000000	36a8e643-ad0d-4f1b-b6be-4fb4504a7766	{"action":"user_signedup","actor_id":"3448438c-1fd4-4599-b2bb-ed24a0a0399d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 21:47:32.677913+00	
00000000-0000-0000-0000-000000000000	47a333da-3f84-4710-b93d-29e88d6cc8bf	{"action":"login","actor_id":"3448438c-1fd4-4599-b2bb-ed24a0a0399d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 21:47:32.682084+00	
00000000-0000-0000-0000-000000000000	c44f7103-6c08-453a-a9f4-95c2ab64d881	{"action":"user_modified","actor_id":"3448438c-1fd4-4599-b2bb-ed24a0a0399d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 21:47:36.399753+00	
00000000-0000-0000-0000-000000000000	26fc5d6c-4508-4e9d-a1ce-f749cbf2e932	{"action":"logout","actor_id":"3448438c-1fd4-4599-b2bb-ed24a0a0399d","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 21:52:39.149816+00	
00000000-0000-0000-0000-000000000000	3e7a3c8d-77be-4fed-8070-91abf0816cb5	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sandbora@gmail.com","user_id":"3448438c-1fd4-4599-b2bb-ed24a0a0399d","user_phone":""}}	2025-03-02 21:53:05.187733+00	
00000000-0000-0000-0000-000000000000	1a47de12-92c5-44cf-8b29-4567f5ea605b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"avsnarang@gmail.com","user_id":"01836b5d-3f1d-4a76-a8fb-38cbed6e742a","user_phone":""}}	2025-03-02 21:53:05.198066+00	
00000000-0000-0000-0000-000000000000	58c46c8e-1743-4efb-aec8-288608443d97	{"action":"user_signedup","actor_id":"6ede130c-2937-439e-bddc-e996d957d691","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 21:56:45.745072+00	
00000000-0000-0000-0000-000000000000	c7f7f8aa-3730-43e9-b4d2-1ee492663da2	{"action":"login","actor_id":"6ede130c-2937-439e-bddc-e996d957d691","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 21:56:45.750257+00	
00000000-0000-0000-0000-000000000000	a9699409-9fd0-4587-bb7f-8fd359d61fdc	{"action":"user_modified","actor_id":"6ede130c-2937-439e-bddc-e996d957d691","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 21:56:49.826588+00	
00000000-0000-0000-0000-000000000000	fa7fc05c-ee98-4f35-9bf3-b92e95265ed0	{"action":"logout","actor_id":"6ede130c-2937-439e-bddc-e996d957d691","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 21:58:39.120121+00	
00000000-0000-0000-0000-000000000000	adce0074-9560-46e9-9b14-66a8edbf3a5b	{"action":"user_signedup","actor_id":"f7f64d4d-34e3-470f-a84f-7fbe5305ae29","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 22:00:16.345314+00	
00000000-0000-0000-0000-000000000000	b4f70c5c-11ce-4748-bc4b-1465841b5154	{"action":"login","actor_id":"f7f64d4d-34e3-470f-a84f-7fbe5305ae29","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 22:00:16.353134+00	
00000000-0000-0000-0000-000000000000	08723986-cbc6-4637-a7c3-5e492d423aab	{"action":"user_modified","actor_id":"f7f64d4d-34e3-470f-a84f-7fbe5305ae29","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 22:00:20.103334+00	
00000000-0000-0000-0000-000000000000	b4e21c72-60a6-453f-b1be-ef09d8933575	{"action":"logout","actor_id":"f7f64d4d-34e3-470f-a84f-7fbe5305ae29","actor_username":"sandbora@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 22:08:35.196239+00	
00000000-0000-0000-0000-000000000000	cde5115c-55a9-49fc-b44b-a4b8fc9da63e	{"action":"user_signedup","actor_id":"0df421fc-a7c8-42ac-bc03-93fa4163db2c","actor_username":"test@g.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 22:09:07.872493+00	
00000000-0000-0000-0000-000000000000	c3a4bfc6-4812-473b-a586-c8947baef69a	{"action":"login","actor_id":"0df421fc-a7c8-42ac-bc03-93fa4163db2c","actor_username":"test@g.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 22:09:07.879332+00	
00000000-0000-0000-0000-000000000000	82a799d1-e120-4b35-931c-84f80f429a57	{"action":"user_modified","actor_id":"0df421fc-a7c8-42ac-bc03-93fa4163db2c","actor_username":"test@g.com","actor_via_sso":false,"log_type":"user"}	2025-03-02 22:09:09.622077+00	
00000000-0000-0000-0000-000000000000	7bd15a7f-bd5f-441d-bd39-0e3f2db0152d	{"action":"logout","actor_id":"0df421fc-a7c8-42ac-bc03-93fa4163db2c","actor_username":"test@g.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 22:19:47.352838+00	
00000000-0000-0000-0000-000000000000	d232ad3a-f37c-4e58-97ab-7c3a0fed7370	{"action":"user_signedup","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 22:20:48.497719+00	
00000000-0000-0000-0000-000000000000	beb9a841-a15f-4c11-963f-363592f514be	{"action":"login","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 22:20:48.502229+00	
00000000-0000-0000-0000-000000000000	bd17523b-4a97-4b31-9b56-e433d6d94f08	{"action":"token_refreshed","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:09.56227+00	
00000000-0000-0000-0000-000000000000	aa3d63fb-6572-49fd-9c32-00274b96079e	{"action":"token_revoked","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:09.563481+00	
00000000-0000-0000-0000-000000000000	e75039dc-a067-48bc-8314-ceaa811664d4	{"action":"token_refreshed","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:35.888511+00	
00000000-0000-0000-0000-000000000000	a889775e-1436-4e4e-855e-ba86291e5ea5	{"action":"token_revoked","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:35.890012+00	
00000000-0000-0000-0000-000000000000	702501c6-f087-48b7-b152-728ac5fde3e1	{"action":"token_refreshed","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:48.570973+00	
00000000-0000-0000-0000-000000000000	cb6885d9-9e85-44ba-b2b3-67f9fcabf6a1	{"action":"token_revoked","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:21:48.571767+00	
00000000-0000-0000-0000-000000000000	1f904e62-d91d-446c-8e98-424af98d323d	{"action":"token_refreshed","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:27:50.608906+00	
00000000-0000-0000-0000-000000000000	77c08063-e8bb-4d96-ad46-31f0821dde19	{"action":"token_revoked","actor_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","actor_name":"asfd","actor_username":"test@gm.com","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:27:50.611056+00	
00000000-0000-0000-0000-000000000000	672aefd3-4188-488f-bfb5-53fb13fe8c1f	{"action":"user_signedup","actor_id":"b097ed33-c3cc-4369-b035-753289d38be6","actor_name":"Aditya","actor_username":"test@test","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 22:29:04.161466+00	
00000000-0000-0000-0000-000000000000	3b1e0212-6c29-4e95-8d6f-392ea0b3405e	{"action":"login","actor_id":"b097ed33-c3cc-4369-b035-753289d38be6","actor_name":"Aditya","actor_username":"test@test","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 22:29:04.167446+00	
00000000-0000-0000-0000-000000000000	f1ac2ac7-b2c3-4346-adc2-26adc8d7ce53	{"action":"token_refreshed","actor_id":"b097ed33-c3cc-4369-b035-753289d38be6","actor_name":"Aditya","actor_username":"test@test","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:29:05.867578+00	
00000000-0000-0000-0000-000000000000	97c03a1d-f786-41fc-ba05-c535e679a200	{"action":"token_revoked","actor_id":"b097ed33-c3cc-4369-b035-753289d38be6","actor_name":"Aditya","actor_username":"test@test","actor_via_sso":false,"log_type":"token"}	2025-03-02 22:29:05.868195+00	
00000000-0000-0000-0000-000000000000	6ef2884a-24d2-4ffb-9ef4-0a10d473aaee	{"action":"logout","actor_id":"b097ed33-c3cc-4369-b035-753289d38be6","actor_name":"Aditya","actor_username":"test@test","actor_via_sso":false,"log_type":"account"}	2025-03-02 22:46:11.700663+00	
00000000-0000-0000-0000-000000000000	822cd93a-ea81-4358-81ff-6f9fe138e924	{"action":"user_signedup","actor_id":"5703aa62-6b34-4af0-8650-c763ccb74e33","actor_name":"asdf","actor_username":"asf@fas","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 22:46:27.826354+00	
00000000-0000-0000-0000-000000000000	6422a37a-f270-40cc-a284-de460a90d97b	{"action":"login","actor_id":"5703aa62-6b34-4af0-8650-c763ccb74e33","actor_name":"asdf","actor_username":"asf@fas","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 22:46:27.831302+00	
00000000-0000-0000-0000-000000000000	c7251711-059c-42e2-a48a-5f1f57497ccc	{"action":"logout","actor_id":"5703aa62-6b34-4af0-8650-c763ccb74e33","actor_name":"asdf","actor_username":"asf@fas","actor_via_sso":false,"log_type":"account"}	2025-03-02 22:53:31.942928+00	
00000000-0000-0000-0000-000000000000	55b150de-cd8f-4427-8629-19b6831b1332	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@gm.com","user_id":"268e7241-5736-49ea-80d7-8f2ec4f5628f","user_phone":""}}	2025-03-02 23:00:38.303265+00	
00000000-0000-0000-0000-000000000000	b6dedb4a-1d96-410e-bedf-c0c8fb65a10c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"asf@fas","user_id":"5703aa62-6b34-4af0-8650-c763ccb74e33","user_phone":""}}	2025-03-02 23:00:38.318433+00	
00000000-0000-0000-0000-000000000000	799f5756-5851-45a6-9ef4-67411c652fed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@g.com","user_id":"0df421fc-a7c8-42ac-bc03-93fa4163db2c","user_phone":""}}	2025-03-02 23:00:38.410752+00	
00000000-0000-0000-0000-000000000000	765160a1-ab43-4da0-9e6a-9838c4765a6b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@test","user_id":"b097ed33-c3cc-4369-b035-753289d38be6","user_phone":""}}	2025-03-02 23:00:38.427196+00	
00000000-0000-0000-0000-000000000000	1bf01f28-d0e1-46f5-8e20-05db8f58e73a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"avsnarang@gmail.com","user_id":"6ede130c-2937-439e-bddc-e996d957d691","user_phone":""}}	2025-03-02 23:00:38.544085+00	
00000000-0000-0000-0000-000000000000	07a3ff35-91c9-4e0d-89e1-6d07a8c77eb8	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sandbora@gmail.com","user_id":"f7f64d4d-34e3-470f-a84f-7fbe5305ae29","user_phone":""}}	2025-03-02 23:00:38.721425+00	
00000000-0000-0000-0000-000000000000	0c7614e9-a8d4-4b04-b560-cb9d1f5c85f1	{"action":"user_signedup","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-02 23:00:47.341309+00	
00000000-0000-0000-0000-000000000000	8961a9f6-c5eb-45e1-b3fe-a3734a1ae274	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 23:00:47.344984+00	
00000000-0000-0000-0000-000000000000	45abdef4-4e82-4c47-9759-a945d91cb45f	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 23:03:12.95969+00	
00000000-0000-0000-0000-000000000000	2b2d6b3a-9b4e-4809-b70c-0867411ed07a	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 23:05:09.27998+00	
00000000-0000-0000-0000-000000000000	46543245-1b25-4ee9-8106-94645093f618	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-02 23:05:15.349458+00	
00000000-0000-0000-0000-000000000000	d69556b9-2559-4d79-8d13-28aed2fd9a07	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-02 23:05:59.418165+00	
00000000-0000-0000-0000-000000000000	49e2adec-6b6a-47c1-a87d-d4cd9bb50d7b	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-02 23:52:34.866508+00	
00000000-0000-0000-0000-000000000000	72798bae-61bd-4dca-8337-45890b234aaf	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 11:16:10.248201+00	
00000000-0000-0000-0000-000000000000	96d90668-48f9-4318-96da-6c6d57e27135	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:14:37.799452+00	
00000000-0000-0000-0000-000000000000	482a2366-3397-4cca-a046-3ed080146bc2	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 12:14:37.805799+00	
00000000-0000-0000-0000-000000000000	e9aadfc5-cd82-49ec-8566-72c90e0b55ba	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:15:42.031162+00	
00000000-0000-0000-0000-000000000000	6455c323-fb82-466e-b7b4-96192a45d65d	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:16:43.833547+00	
00000000-0000-0000-0000-000000000000	3d646dc7-320c-4655-9e92-af0c055c909a	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:16:56.261868+00	
00000000-0000-0000-0000-000000000000	5f236388-4e44-46e6-81bc-cebed81c7982	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:18:56.749837+00	
00000000-0000-0000-0000-000000000000	fdd95614-1b4a-48b5-84ea-220dc1359a55	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:25:25.152142+00	
00000000-0000-0000-0000-000000000000	544dbe59-eb91-4baa-b774-aa9fcf440493	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:25:42.571608+00	
00000000-0000-0000-0000-000000000000	d0c2cc8c-0f3e-4c14-9f9e-38d25f11c895	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:25:50.871081+00	
00000000-0000-0000-0000-000000000000	7bf4c561-807d-445e-a957-96034cd917b1	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:29:23.569573+00	
00000000-0000-0000-0000-000000000000	4fc2f3fc-5ba9-41c5-946f-da4d1df7f943	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:29:33.155413+00	
00000000-0000-0000-0000-000000000000	f7b00503-bd1e-4261-803e-9b9be618641e	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:30:52.644588+00	
00000000-0000-0000-0000-000000000000	bed3d6b4-6ca1-4ca4-9065-5b05b543752f	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:30:57.653505+00	
00000000-0000-0000-0000-000000000000	0cf0eb52-7cfa-41b4-82a4-676f621badb6	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:31:36.121867+00	
00000000-0000-0000-0000-000000000000	b38f0ba7-8186-4681-be0c-bfc05a3aec46	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:33:08.922582+00	
00000000-0000-0000-0000-000000000000	b0c98551-234f-4217-a50a-33a50ac94dd6	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:33:42.684529+00	
00000000-0000-0000-0000-000000000000	9995e3a8-4ec6-4ad2-9628-ee8babf6f38c	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 12:33:56.210833+00	
00000000-0000-0000-0000-000000000000	b77291f5-df46-4ef0-aba3-4b652a344c06	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:34:08.570942+00	
00000000-0000-0000-0000-000000000000	4260b545-c331-42c7-a774-044725d9e02d	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:55:30.230817+00	
00000000-0000-0000-0000-000000000000	0239a0ce-2a9d-498e-af46-711152dd2a15	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 12:56:35.967376+00	
00000000-0000-0000-0000-000000000000	ca2eaafb-48ee-48a2-bc31-b2ae7fe607ef	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 13:32:27.442251+00	
00000000-0000-0000-0000-000000000000	e74d9eff-7ad8-4539-94e8-a0c8ab358f50	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 13:32:27.44536+00	
00000000-0000-0000-0000-000000000000	237317da-0c24-4f77-89ee-56c4987e3c21	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 13:54:41.78771+00	
00000000-0000-0000-0000-000000000000	ca1400ff-6cc5-4bcb-b61a-d3c305917e51	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 13:54:41.789629+00	
00000000-0000-0000-0000-000000000000	cdb93198-a953-4a83-9990-837cf628ec24	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 15:01:22.925933+00	
00000000-0000-0000-0000-000000000000	ce1f195d-2c8d-4c6a-abfc-eeaf8f1852f4	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 15:01:22.928958+00	
00000000-0000-0000-0000-000000000000	7ef0145c-42d0-44f1-b1cf-e1bc930fc034	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 15:11:31.463567+00	
00000000-0000-0000-0000-000000000000	e13240d2-29f3-4877-bc83-bdb918392648	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 16:53:45.358825+00	
00000000-0000-0000-0000-000000000000	76ebe9eb-32dd-43d5-a307-006727fdce41	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-03 16:53:45.37306+00	
00000000-0000-0000-0000-000000000000	a7f2229e-7252-43f4-9df1-8e59b2af5b25	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 17:13:09.636915+00	
00000000-0000-0000-0000-000000000000	0c790c90-ae4d-4d8f-bd7d-2fe3b528cc4c	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 17:13:22.561037+00	
00000000-0000-0000-0000-000000000000	976df697-66d7-47ba-ab28-cbd81d2abdb5	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 17:14:00.097701+00	
00000000-0000-0000-0000-000000000000	d35385e4-329b-4e18-a1d7-59c7c4128bec	{"action":"user_signedup","actor_id":"ac6eef9e-3db4-4f1a-8cef-6e4f39e097c3","actor_name":"Test","actor_username":"t@t","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-03 17:14:22.100333+00	
00000000-0000-0000-0000-000000000000	362889a1-6e73-42df-af7a-cce4c5ee2f4e	{"action":"login","actor_id":"ac6eef9e-3db4-4f1a-8cef-6e4f39e097c3","actor_name":"Test","actor_username":"t@t","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 17:14:22.108482+00	
00000000-0000-0000-0000-000000000000	f44c0f8a-ed71-43ca-b857-dd9c6371a9ad	{"action":"logout","actor_id":"ac6eef9e-3db4-4f1a-8cef-6e4f39e097c3","actor_name":"Test","actor_username":"t@t","actor_via_sso":false,"log_type":"account"}	2025-03-03 17:16:21.544717+00	
00000000-0000-0000-0000-000000000000	d4481e0a-788a-4c85-a54a-ff1e37ca8138	{"action":"user_repeated_signup","actor_id":"ac6eef9e-3db4-4f1a-8cef-6e4f39e097c3","actor_name":"Test","actor_username":"t@t","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-03-03 17:16:41.813456+00	
00000000-0000-0000-0000-000000000000	97867be7-32b0-4493-908f-3b968b36d593	{"action":"user_signedup","actor_id":"0547c239-9c75-4ca1-bcb3-046be030adac","actor_name":"te","actor_username":"t@te","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-03 17:16:49.479235+00	
00000000-0000-0000-0000-000000000000	821398d5-a880-4ca1-b551-f612b900ac19	{"action":"login","actor_id":"0547c239-9c75-4ca1-bcb3-046be030adac","actor_name":"te","actor_username":"t@te","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 17:16:49.482975+00	
00000000-0000-0000-0000-000000000000	8704b4bb-947f-4467-a073-fbc436ce5f6c	{"action":"logout","actor_id":"0547c239-9c75-4ca1-bcb3-046be030adac","actor_name":"te","actor_username":"t@te","actor_via_sso":false,"log_type":"account"}	2025-03-03 17:35:33.62336+00	
00000000-0000-0000-0000-000000000000	691a2331-d74d-4fcb-8383-c3d870eb2ebf	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 17:35:47.407872+00	
00000000-0000-0000-0000-000000000000	8724be02-f44e-47a3-acef-55afe4095a8c	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:02:35.788442+00	
00000000-0000-0000-0000-000000000000	b0831f8c-1162-426b-8361-2544f98fc282	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-03 20:02:35.792044+00	
00000000-0000-0000-0000-000000000000	caf7784c-cecb-49f2-8879-8c45343f2418	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-03 20:51:07.020899+00	
00000000-0000-0000-0000-000000000000	50891ff6-5dff-4736-a32d-9e8dbf2f43df	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 20:51:24.67865+00	
00000000-0000-0000-0000-000000000000	b5f39a0c-d0ff-4764-9b3d-a2548c18b1d5	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-03 20:51:31.008562+00	
00000000-0000-0000-0000-000000000000	b36e184d-dbad-423e-9585-7697402984fd	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 21:05:15.69256+00	
00000000-0000-0000-0000-000000000000	ac3f01f8-9b03-41b0-96d8-e5346440743c	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-03 21:15:04.796292+00	
00000000-0000-0000-0000-000000000000	d208810f-5445-4920-819b-aee318a26101	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-03 21:17:05.783806+00	
00000000-0000-0000-0000-000000000000	cad24bee-b5fe-4dfa-bf15-7b386858798c	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 05:19:32.459585+00	
00000000-0000-0000-0000-000000000000	2dde32f9-1b94-42e0-9167-87a537e81f4c	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 05:19:32.462349+00	
00000000-0000-0000-0000-000000000000	7e037957-e818-414a-bef5-3e594686dd45	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-04 05:19:49.143417+00	
00000000-0000-0000-0000-000000000000	a798067d-3324-4cd4-b4b7-315f3e70fc0d	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 07:01:16.466292+00	
00000000-0000-0000-0000-000000000000	f0f2fc79-5eef-4000-a301-f016edcafca5	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 08:02:40.464285+00	
00000000-0000-0000-0000-000000000000	1bb52206-b3a6-4be7-ae41-b0ccaeee3a82	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:00:54.646066+00	
00000000-0000-0000-0000-000000000000	966725b7-f07e-4871-bdff-34d4436d0be5	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:00:54.649842+00	
00000000-0000-0000-0000-000000000000	4273d7e8-0cea-40eb-b2a4-ddfac65e8162	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:59:46.521947+00	
00000000-0000-0000-0000-000000000000	b42aea0f-10dd-4c9c-8411-efaf726bb056	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 09:59:46.52436+00	
00000000-0000-0000-0000-000000000000	9ff1ba9f-4dde-470e-b958-24f73c8645b5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:01:38.242464+00	
00000000-0000-0000-0000-000000000000	43e1b4c6-c1c4-46a2-b4c0-6933fd06c1d6	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 11:01:38.245575+00	
00000000-0000-0000-0000-000000000000	d33a9c54-16aa-442b-9e9e-78568a3950a0	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 18:07:03.092043+00	
00000000-0000-0000-0000-000000000000	fe2ac62c-af36-4918-98f5-3248a1b4220a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 18:07:03.096456+00	
00000000-0000-0000-0000-000000000000	74a760d1-138d-4328-9c64-b8394b46405e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:11:40.471693+00	
00000000-0000-0000-0000-000000000000	83dc94d3-8d28-473c-a551-9fd08156fe66	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 19:11:40.476262+00	
00000000-0000-0000-0000-000000000000	474c6a29-c228-4186-ac0d-42ebc76b6716	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:46:33.965171+00	
00000000-0000-0000-0000-000000000000	ece69773-a4d9-47ed-a742-fa5f3cdad2c0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-04 20:46:33.968406+00	
00000000-0000-0000-0000-000000000000	68f54044-aff9-43de-8538-6b00dd56ce0d	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-04 20:47:06.310017+00	
00000000-0000-0000-0000-000000000000	e4727657-4b6c-43c7-b3a3-25105c412231	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 20:47:13.089923+00	
00000000-0000-0000-0000-000000000000	829947c3-2eb7-4dfd-864e-05dcf23b634f	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-04 20:47:33.19993+00	
00000000-0000-0000-0000-000000000000	5b803ec1-a79c-467e-af64-2ad290551e8a	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 22:30:47.497521+00	
00000000-0000-0000-0000-000000000000	09f63a04-5014-423d-b0e0-06b63f0b6094	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-04 22:32:57.211542+00	
00000000-0000-0000-0000-000000000000	6f2c242f-7229-40c5-970f-ce9c9c64a5e9	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 22:36:04.916562+00	
00000000-0000-0000-0000-000000000000	8b04a0fc-d93e-4ff8-b916-62f44304bf78	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-04 22:44:14.306074+00	
00000000-0000-0000-0000-000000000000	d75cda1c-fa6e-4b24-a3c3-2a36e641e357	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 22:44:25.496921+00	
00000000-0000-0000-0000-000000000000	fc1da59f-e277-47eb-89f1-b6e2b56df40a	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-04 23:39:21.965234+00	
00000000-0000-0000-0000-000000000000	e1a3fabe-3790-413c-86d1-f76010a061cd	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-04 23:39:31.592846+00	
00000000-0000-0000-0000-000000000000	86a009c9-eac8-460f-afcb-7dc07a9abbd8	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 05:12:29.036532+00	
00000000-0000-0000-0000-000000000000	a5b7c716-8f17-479a-b759-38763e958f35	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 05:12:29.04678+00	
00000000-0000-0000-0000-000000000000	f846ddcc-058b-4fb5-a00a-31ad52c4ab77	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:20:25.721929+00	
00000000-0000-0000-0000-000000000000	27eedcb2-78ec-4a9a-926a-a94f23afa60e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 10:20:25.734678+00	
00000000-0000-0000-0000-000000000000	8e04492f-6524-45d3-a1bd-52e928816d70	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 11:40:08.865646+00	
00000000-0000-0000-0000-000000000000	6f07dd6a-c95b-475c-93e5-3566175fb75f	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 11:40:08.876179+00	
00000000-0000-0000-0000-000000000000	fa60af79-d0eb-49c0-b846-707758dfa1b9	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-05 12:30:58.055167+00	
00000000-0000-0000-0000-000000000000	f931bfbb-36cb-4791-ab63-169c2c1adc46	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-05 12:31:07.207012+00	
00000000-0000-0000-0000-000000000000	2ffd436b-f4c7-4c19-a7d6-209c369151d6	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-05 12:32:38.588871+00	
00000000-0000-0000-0000-000000000000	f0583fa3-71bb-41ca-9b1e-cb0082d898d5	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-05 12:33:07.006506+00	
00000000-0000-0000-0000-000000000000	973a99f7-8554-4cec-b55c-2f436e4558ed	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-05 12:38:12.396695+00	
00000000-0000-0000-0000-000000000000	1d287b64-dbd2-47cd-9615-089ce031e590	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-05 12:42:20.237951+00	
00000000-0000-0000-0000-000000000000	08c98335-3c31-4b13-8def-d1c6faec2cc9	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 13:47:55.366633+00	
00000000-0000-0000-0000-000000000000	c0a4525b-45e9-4f7e-84d2-c60abc26c497	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 13:47:55.368386+00	
00000000-0000-0000-0000-000000000000	46171be2-1ad4-4adf-a53c-cb36a74290d5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 16:05:55.691935+00	
00000000-0000-0000-0000-000000000000	348f2235-f578-4264-be7a-2a7987ee1320	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 16:05:55.694381+00	
00000000-0000-0000-0000-000000000000	e6fb86cb-ebc1-4a34-868d-33cf5d3047ac	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-05 16:06:05.270109+00	
00000000-0000-0000-0000-000000000000	43e7f3a9-efba-46d5-8d5f-a63bae798fed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"t@te","user_id":"0547c239-9c75-4ca1-bcb3-046be030adac","user_phone":""}}	2025-03-05 16:07:32.683531+00	
00000000-0000-0000-0000-000000000000	d84d65cf-4989-4bcd-a5dc-87c3a1dd7100	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"t@t","user_id":"ac6eef9e-3db4-4f1a-8cef-6e4f39e097c3","user_phone":""}}	2025-03-05 16:07:33.898596+00	
00000000-0000-0000-0000-000000000000	1e1b1c6e-6451-492c-a41b-b7018689ae90	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:04:23.459086+00	
00000000-0000-0000-0000-000000000000	8c210fd9-df98-4a72-9184-20b5bb00ff82	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:04:23.462073+00	
00000000-0000-0000-0000-000000000000	70f75439-f11b-4caf-992a-a0ea884bff82	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:22:52.417623+00	
00000000-0000-0000-0000-000000000000	cc90d3a6-e9aa-4e0b-9e19-4162f36b31c0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 17:22:52.419059+00	
00000000-0000-0000-0000-000000000000	d1ab30e0-45ad-4de0-ac23-479975662db2	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 18:02:26.670936+00	
00000000-0000-0000-0000-000000000000	5e8d4e37-6d54-4c71-8088-af7233055e3a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 18:02:26.675406+00	
00000000-0000-0000-0000-000000000000	e06c7929-fa68-4c9b-b6e5-0083a2e291ee	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 19:04:15.653946+00	
00000000-0000-0000-0000-000000000000	26d67efd-dab8-4443-a66e-53cadf87f853	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 19:04:15.655643+00	
00000000-0000-0000-0000-000000000000	5e53e071-7d98-4c6b-8ef4-1670f34be9b8	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 19:28:04.05015+00	
00000000-0000-0000-0000-000000000000	a76baad3-9b3d-4bad-9d71-56f50d406bbb	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-05 19:28:04.05238+00	
00000000-0000-0000-0000-000000000000	614a442e-09bf-4182-b581-9424282ba0c1	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 06:18:17.091418+00	
00000000-0000-0000-0000-000000000000	37f897bd-d7f4-4d92-bd6f-c22e130a0176	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 06:18:17.09107+00	
00000000-0000-0000-0000-000000000000	f0e712e7-98e8-4740-94b7-8cf80de3a593	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 06:18:17.101659+00	
00000000-0000-0000-0000-000000000000	431a414a-86dc-4a46-9719-e50e61de3990	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 06:18:17.10166+00	
00000000-0000-0000-0000-000000000000	626263d5-868d-420d-82a0-ec16eca1c844	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 07:16:47.043238+00	
00000000-0000-0000-0000-000000000000	6f351c53-00c0-4798-a99e-716d696635f2	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 07:16:47.053954+00	
00000000-0000-0000-0000-000000000000	5d386884-35e5-4043-89d2-094060b8cfcc	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 07:42:00.766238+00	
00000000-0000-0000-0000-000000000000	4e974686-198b-4250-8f92-8e9de93132a9	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 07:42:00.768377+00	
00000000-0000-0000-0000-000000000000	4f7142ea-31ce-4b88-ae86-942eabd24f6f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 09:40:30.153725+00	
00000000-0000-0000-0000-000000000000	b5f6e373-00a9-4ea1-9b91-0b440c4575b2	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 09:40:30.156556+00	
00000000-0000-0000-0000-000000000000	c0ad92c7-ba01-4e34-885e-e33a7dc78c75	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:47:15.512303+00	
00000000-0000-0000-0000-000000000000	fe4ea9f7-1e79-4308-b240-f5324eb76860	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:47:15.514486+00	
00000000-0000-0000-0000-000000000000	d3ca594d-fd63-4ed3-9da3-0af105ee040c	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:48:32.378115+00	
00000000-0000-0000-0000-000000000000	8a98b387-d3ab-4194-ae3a-56a6d5a819a0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 10:48:32.378984+00	
00000000-0000-0000-0000-000000000000	7a80f0cc-a9c6-42e9-bef4-0d5c514780c3	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 11:45:17.020592+00	
00000000-0000-0000-0000-000000000000	c6bc84ec-097c-4f21-91c0-ab572d9153a2	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 11:45:17.028098+00	
00000000-0000-0000-0000-000000000000	cfbf05ed-1673-4599-a555-1319cccabb0a	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 12:43:30.507707+00	
00000000-0000-0000-0000-000000000000	ce3024b5-19be-45d2-933d-30b9a1481bab	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 12:43:30.510695+00	
00000000-0000-0000-0000-000000000000	fb409e20-3236-4b3b-9197-2195392628a7	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 13:08:44.192163+00	
00000000-0000-0000-0000-000000000000	17d36bc3-a1a1-4bd1-9077-84fec3075309	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 13:08:44.193211+00	
00000000-0000-0000-0000-000000000000	df93bc6b-53fd-41e0-b86d-6c5b2bb41885	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 13:08:45.059868+00	
00000000-0000-0000-0000-000000000000	9782c1e7-a649-42c8-b6d6-5bb2bdb01f60	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 23:38:58.343233+00	
00000000-0000-0000-0000-000000000000	bfbcd698-4efe-42d8-8959-7883095642bf	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 23:38:58.353051+00	
00000000-0000-0000-0000-000000000000	9910e5d4-6a52-4698-80d5-9ec71783ce92	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 23:38:58.702383+00	
00000000-0000-0000-0000-000000000000	9db118a7-8c6a-458c-8905-20fbca54287e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-06 23:38:58.703029+00	
00000000-0000-0000-0000-000000000000	b144a79c-f8cf-4baf-a4a6-5d45862ccd59	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 01:30:20.933595+00	
00000000-0000-0000-0000-000000000000	74e0a0ef-645e-44ce-8c68-f4238a9b0d29	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 01:30:20.935655+00	
00000000-0000-0000-0000-000000000000	2b25f380-a874-40c1-ae32-60fef072724a	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 07:52:07.602962+00	
00000000-0000-0000-0000-000000000000	7510b9aa-b926-4aee-a78a-97724baa0e75	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 07:52:07.610627+00	
00000000-0000-0000-0000-000000000000	2d694db6-dc1b-454c-a455-a5113c42ceab	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 09:40:12.915946+00	
00000000-0000-0000-0000-000000000000	edea5a1b-44e0-4312-a541-8675f8f11a0a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 09:40:12.926768+00	
00000000-0000-0000-0000-000000000000	96c8aeb2-7278-4d86-9fbf-bc814dcbf174	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 11:20:44.234488+00	
00000000-0000-0000-0000-000000000000	e65f38f4-342e-4ce9-b1b5-a82d2153b9d0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 11:20:44.236412+00	
00000000-0000-0000-0000-000000000000	81ac4b73-dfef-48da-8c61-bb22925a1b6f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 16:10:01.643147+00	
00000000-0000-0000-0000-000000000000	d19e3003-4bc4-4fdc-8aac-0d60439483e4	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 16:10:01.645276+00	
00000000-0000-0000-0000-000000000000	e533c49c-64c3-4dba-966a-cc136f7cea5a	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 17:40:41.403586+00	
00000000-0000-0000-0000-000000000000	f7eab710-b9bd-49c5-a04e-28d73e3e81cf	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-07 17:40:41.406653+00	
00000000-0000-0000-0000-000000000000	a6381759-a550-414f-abc1-f6c047aa79d5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 06:45:13.29243+00	
00000000-0000-0000-0000-000000000000	e67fcede-5f2d-4ed5-a863-0852c9d6db2b	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 06:45:13.307012+00	
00000000-0000-0000-0000-000000000000	39f7a613-1692-4fd6-b36e-c94a2361021f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 11:41:15.505344+00	
00000000-0000-0000-0000-000000000000	0b17b8af-296b-436d-854a-4aef9e625c81	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 11:41:15.509357+00	
00000000-0000-0000-0000-000000000000	0ace35e3-2b3d-459f-b896-7ef522daa569	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 12:53:49.855161+00	
00000000-0000-0000-0000-000000000000	bd5a50f5-9109-4604-ab0c-33c98da21155	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 12:53:49.857393+00	
00000000-0000-0000-0000-000000000000	ebaeca97-f714-43c6-8230-9830736069bd	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 12:54:50.808259+00	
00000000-0000-0000-0000-000000000000	10407de5-d344-4d44-bd2c-a38a1b4fc2d6	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 12:54:50.809568+00	
00000000-0000-0000-0000-000000000000	c5f31e1e-705e-4151-a789-440d839e884d	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 14:29:54.51852+00	
00000000-0000-0000-0000-000000000000	0dea0e50-81b6-47bb-873a-d52f7926d0ae	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 14:29:54.523931+00	
00000000-0000-0000-0000-000000000000	e5e663f2-0411-4d0d-9c60-e3856a77ce22	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-08 15:16:59.45987+00	
00000000-0000-0000-0000-000000000000	70521aba-748c-4cb6-bfb8-8eb06f1c38a7	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-08 15:17:11.562209+00	
00000000-0000-0000-0000-000000000000	2ed17c03-d6c6-4a30-a364-439839844cbf	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-08 15:17:25.386917+00	
00000000-0000-0000-0000-000000000000	304bee1b-a002-45dc-9f3c-44e96138f59e	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-08 15:17:48.424572+00	
00000000-0000-0000-0000-000000000000	618d203c-1c02-48d8-b0cb-a6401d60d510	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 16:41:30.355334+00	
00000000-0000-0000-0000-000000000000	9db7a9fb-9b15-4d70-9f6f-91b95223a57c	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 16:41:30.358029+00	
00000000-0000-0000-0000-000000000000	a16ea2a2-2f77-4a3f-a47c-725ddf8f21ef	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 18:16:41.657252+00	
00000000-0000-0000-0000-000000000000	134dcb46-4da8-48b1-b81b-440bcb6419e5	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 18:16:41.659358+00	
00000000-0000-0000-0000-000000000000	ce38cd1b-7c83-4a2e-984f-380cfe68b222	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-08 18:29:44.382249+00	
00000000-0000-0000-0000-000000000000	bc71fdb1-8feb-41e1-a2cc-7df670759fba	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-08 18:29:47.312859+00	
00000000-0000-0000-0000-000000000000	14010673-2069-4f14-b8fd-a7709ebb908b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 19:28:11.516726+00	
00000000-0000-0000-0000-000000000000	6c0b5aef-c7ae-432e-b318-e53429ab72da	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-08 19:28:11.523427+00	
00000000-0000-0000-0000-000000000000	52c5d88d-834f-4a9a-a090-677cd3f30ddd	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 07:02:42.367284+00	
00000000-0000-0000-0000-000000000000	00c014ea-a976-4792-b0fb-ce65abce57f4	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 07:02:42.38599+00	
00000000-0000-0000-0000-000000000000	51f2c901-2596-465c-854e-9ab9f31ea11e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 08:41:39.244685+00	
00000000-0000-0000-0000-000000000000	f0d4bfa8-2348-4d20-a43b-1582e5d7a48e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 08:41:39.246163+00	
00000000-0000-0000-0000-000000000000	01dd6d68-8347-4195-9be7-2c45bdd602cc	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 10:09:29.779259+00	
00000000-0000-0000-0000-000000000000	d3e36750-99e0-4413-a025-399479c9ddbf	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 10:09:29.780202+00	
00000000-0000-0000-0000-000000000000	3136e0ca-a9b3-480a-89db-37f3b81c69df	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 11:17:11.599148+00	
00000000-0000-0000-0000-000000000000	4b7c8373-f73b-4b21-a233-1a8eb0b9c66d	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 11:17:11.601179+00	
00000000-0000-0000-0000-000000000000	674c96c9-a7f2-483f-b3bc-87efe5aa8556	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 12:23:32.773954+00	
00000000-0000-0000-0000-000000000000	7f12628e-a0b3-4243-abca-797088f13ceb	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 12:23:32.776912+00	
00000000-0000-0000-0000-000000000000	cf2f0e86-2865-4aab-a6b1-6a588a725740	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 13:29:23.752931+00	
00000000-0000-0000-0000-000000000000	da983fc8-9676-4a18-af10-2aa22194d9ec	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 13:29:23.755524+00	
00000000-0000-0000-0000-000000000000	e03d86f1-a1e9-4dbe-a83e-927729370bc1	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 13:31:45.050303+00	
00000000-0000-0000-0000-000000000000	8cad724e-3320-4a44-9e6a-59dba8e84349	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 14:52:56.204365+00	
00000000-0000-0000-0000-000000000000	8b9e1a52-3e45-4de2-bd2f-d9f6cd69dd49	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 14:52:56.205993+00	
00000000-0000-0000-0000-000000000000	03740f40-d310-4a6f-b755-8a67a8553187	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 16:05:25.712032+00	
00000000-0000-0000-0000-000000000000	b673be2a-adbe-4742-8d4c-b00dc110efe3	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 16:05:25.714281+00	
00000000-0000-0000-0000-000000000000	f4aef9c1-f843-4dd4-830e-9e2d79bc30ef	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 18:04:31.383251+00	
00000000-0000-0000-0000-000000000000	56f1fa5f-5bad-4c87-9f3a-3889da338b34	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 18:04:31.385205+00	
00000000-0000-0000-0000-000000000000	64e9d403-7bb8-4796-9b01-597e1650909d	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 20:14:54.899766+00	
00000000-0000-0000-0000-000000000000	200c3ae5-4814-4ec3-aa18-c246ac190709	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-09 20:14:54.901893+00	
00000000-0000-0000-0000-000000000000	8e321fa7-9306-4f6f-a05f-d77b8f183c1f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 05:53:24.367116+00	
00000000-0000-0000-0000-000000000000	059fd94f-d553-459a-8a84-23f8dc9c44a8	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 05:53:24.381063+00	
00000000-0000-0000-0000-000000000000	17f5a2fd-7530-46d2-ae09-f1f84f45cf8b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 08:23:10.888886+00	
00000000-0000-0000-0000-000000000000	f546d431-7b2f-447d-92dc-0777d140ea5e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 08:23:10.896015+00	
00000000-0000-0000-0000-000000000000	5cbb1d70-05f0-4b96-a0c9-beea4b730bc5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 09:24:17.792597+00	
00000000-0000-0000-0000-000000000000	e34ae8e4-ad24-4a86-a2ef-a0c68fdc64d1	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 09:24:17.795139+00	
00000000-0000-0000-0000-000000000000	e3839391-23a4-4af4-813a-4f835ef6d0a4	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 14:44:41.869433+00	
00000000-0000-0000-0000-000000000000	1155d13c-e42c-412f-ac98-8a498aac64c9	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 14:44:41.871194+00	
00000000-0000-0000-0000-000000000000	84ef9fe3-6571-4abf-b6dc-7377f827d6a1	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 15:53:56.05728+00	
00000000-0000-0000-0000-000000000000	f05efeff-305e-4533-9812-00a94f984bdb	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 15:53:56.060093+00	
00000000-0000-0000-0000-000000000000	382614e3-25dd-484a-a110-186b83cc4961	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-10 16:09:17.765342+00	
00000000-0000-0000-0000-000000000000	07b76d55-c276-41ff-969e-7475db2169ae	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-11 19:47:20.758221+00	
00000000-0000-0000-0000-000000000000	81563552-8a94-48f1-8359-6fb9474a67c8	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-11 19:47:20.777792+00	
00000000-0000-0000-0000-000000000000	6f2d8bce-8954-439d-8b40-6edd1d2e5372	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-11 20:45:46.787844+00	
00000000-0000-0000-0000-000000000000	7d7a5e94-9a73-404b-9f10-f85d4ce9b31c	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-11 20:45:46.793782+00	
00000000-0000-0000-0000-000000000000	33a8754d-c230-4303-8473-605a148b5343	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-11 21:23:10.676839+00	
00000000-0000-0000-0000-000000000000	82ce80b6-05f6-449a-8302-c2f8284069d1	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-11 21:23:20.365147+00	
00000000-0000-0000-0000-000000000000	c53cdd6c-4ba5-4e10-90d0-797630e6afdb	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 22:44:49.19241+00	
00000000-0000-0000-0000-000000000000	5e0c73a5-4815-4df2-bc92-0f6c5efc7b6b	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-11 22:44:49.197446+00	
00000000-0000-0000-0000-000000000000	37c86e44-1f8d-4699-b6c3-8453cc4238c0	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 05:47:26.396378+00	
00000000-0000-0000-0000-000000000000	2c388e2f-ef1d-4f8f-a243-8fdc18bccc25	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 05:47:26.411879+00	
00000000-0000-0000-0000-000000000000	94329efc-10ed-441c-8448-e19df3f3d7f6	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 08:41:00.025372+00	
00000000-0000-0000-0000-000000000000	fe9070cd-4d79-48fb-8a06-a8872ea8e94d	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 08:41:00.041279+00	
00000000-0000-0000-0000-000000000000	4f2b6e4b-5cb9-48de-ab76-648c23cb4e8d	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:05:30.717782+00	
00000000-0000-0000-0000-000000000000	4bc67f9c-a610-4264-885e-b6cd5a85deaf	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-12 10:05:30.722141+00	
00000000-0000-0000-0000-000000000000	1dcace7a-724f-4332-bad0-6611ffcf6466	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-12 12:15:32.531176+00	
00000000-0000-0000-0000-000000000000	4d1526fb-cd3e-48cb-aa42-98d19d3d3006	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-12 12:17:24.361525+00	
00000000-0000-0000-0000-000000000000	cf229bd4-34d2-443f-a126-58c1c44bc66b	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-12 12:17:28.30922+00	
00000000-0000-0000-0000-000000000000	a4590354-9f48-41c1-a21f-fc5fa1a28efa	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-12 20:07:50.287829+00	
00000000-0000-0000-0000-000000000000	2b76d0d9-26a4-428d-8939-a591984aa726	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-12 20:07:50.292149+00	
00000000-0000-0000-0000-000000000000	3371d34b-3a2b-4550-94cf-cdaa5fb7b86e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-13 06:35:29.42134+00	
00000000-0000-0000-0000-000000000000	f46f15f7-b105-428d-aca2-3276fec212fb	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-13 06:35:29.448538+00	
00000000-0000-0000-0000-000000000000	bf48d50e-74cd-4ac4-8bc5-ebc5a2e99395	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-13 06:35:38.578135+00	
00000000-0000-0000-0000-000000000000	8c6af0dd-4d7d-4efa-bd87-38d1581185e5	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-13 06:35:58.428684+00	
00000000-0000-0000-0000-000000000000	b223664b-62f3-490d-a4c5-5888e40a3c37	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-13 16:46:28.666071+00	
00000000-0000-0000-0000-000000000000	101f49e3-3d65-413a-a2b0-6f30753bb504	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-13 16:46:28.686102+00	
00000000-0000-0000-0000-000000000000	ebbaf393-379a-4e84-a352-d5a673120467	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-15 16:28:24.260539+00	
00000000-0000-0000-0000-000000000000	5e986e0b-3461-4798-85fe-6514010aac26	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-03-15 16:28:24.27456+00	
00000000-0000-0000-0000-000000000000	19ba8c3b-2e31-44ba-ab51-d42a1781b213	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-17 10:43:20.929504+00	
00000000-0000-0000-0000-000000000000	314974eb-199e-4f42-b867-f7e4dbfad2af	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-17 10:48:48.698079+00	
00000000-0000-0000-0000-000000000000	0174839b-dce3-4a0e-b7fd-e9679b600e43	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-03-17 10:50:00.694814+00	
00000000-0000-0000-0000-000000000000	51ee8cfd-ee74-4573-8874-3f4c5a6b2ad3	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-19 12:09:42.240485+00	
00000000-0000-0000-0000-000000000000	f1411522-d613-43cb-99b1-709026f517e4	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 13:08:53.845146+00	
00000000-0000-0000-0000-000000000000	f97d6e4f-2731-40ec-be47-f803d850c780	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 13:08:53.851501+00	
00000000-0000-0000-0000-000000000000	580acff9-570e-4243-aefb-e0860c680816	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 16:21:08.989968+00	
00000000-0000-0000-0000-000000000000	b5db6fd1-65c5-4508-b8c7-8b53403efeee	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 16:21:08.992632+00	
00000000-0000-0000-0000-000000000000	a070bee4-8847-496a-88a3-1cb071a2b7aa	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 16:21:09.490296+00	
00000000-0000-0000-0000-000000000000	06cc75a6-4e98-4e12-a47e-b2641eae0cda	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 17:19:19.490279+00	
00000000-0000-0000-0000-000000000000	3e65f332-f7fd-4e7e-ab35-6cecb787f87a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 17:19:19.493353+00	
00000000-0000-0000-0000-000000000000	51f13542-fc45-46c3-98ef-d542172d8c6a	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 18:17:27.214076+00	
00000000-0000-0000-0000-000000000000	331baf78-1375-4897-b2d4-9b86345170b1	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 18:17:27.22391+00	
00000000-0000-0000-0000-000000000000	db20cfb9-6cf7-4adf-bd74-cace4f6b561b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 19:15:41.293875+00	
00000000-0000-0000-0000-000000000000	0db18394-253e-453f-9eb9-3a7dc3027525	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 19:15:41.299527+00	
00000000-0000-0000-0000-000000000000	67212d8e-6a4e-407d-b816-617b70748718	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-19 19:20:01.84767+00	
00000000-0000-0000-0000-000000000000	95c249ae-5d69-4980-ad69-4bf3e42586c1	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-19 19:20:04.410513+00	
00000000-0000-0000-0000-000000000000	bfcc8389-cfaa-422f-80c8-bb9b9abe8800	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 22:47:45.579272+00	
00000000-0000-0000-0000-000000000000	cde150d9-ff89-4acc-9f53-07ba9bd11bf7	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-19 22:47:45.586002+00	
00000000-0000-0000-0000-000000000000	ee7a546c-d47e-4c9f-a63d-75f69d84e194	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 04:10:16.950924+00	
00000000-0000-0000-0000-000000000000	819d519b-0d04-41d6-ad57-f5fa00bd7a4f	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 04:10:16.960064+00	
00000000-0000-0000-0000-000000000000	1d349c2f-9871-421d-9aab-d3e51cc6989b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 05:08:53.740051+00	
00000000-0000-0000-0000-000000000000	0c3cb31d-bc66-4086-98bc-55509b007265	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 05:08:53.751003+00	
00000000-0000-0000-0000-000000000000	2380fc2c-2d17-411b-9cb0-c7ae86fb18eb	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 06:41:54.768154+00	
00000000-0000-0000-0000-000000000000	293c1b0c-9af5-4127-91ce-c8ddfcd91cca	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 06:41:54.784713+00	
00000000-0000-0000-0000-000000000000	1be60667-7009-4215-b391-ad5b3f33d7e0	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-20 09:18:15.734664+00	
00000000-0000-0000-0000-000000000000	5e417636-e357-4db2-b342-64d2c71d0b78	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 09:21:29.160641+00	
00000000-0000-0000-0000-000000000000	6e615fb2-b2b2-40f6-8e01-202927aff8fe	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 09:21:29.170923+00	
00000000-0000-0000-0000-000000000000	7e8a082e-6e48-4179-84b0-71cb4cd6d31f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 11:05:44.853853+00	
00000000-0000-0000-0000-000000000000	ef72a794-3492-412e-8bb7-c3c744af49c9	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 11:05:44.858315+00	
00000000-0000-0000-0000-000000000000	2b640238-a274-44a8-bea9-7b33b18bb3b5	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 11:15:28.193821+00	
00000000-0000-0000-0000-000000000000	12159b0f-adcc-4ffb-b7b9-7094a9378208	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 11:15:28.197216+00	
00000000-0000-0000-0000-000000000000	79397ed4-8c16-440b-aff5-f554d68aae48	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 15:14:04.277828+00	
00000000-0000-0000-0000-000000000000	fe32daa2-0f66-400b-ace2-0be058454b84	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-20 15:14:04.287927+00	
00000000-0000-0000-0000-000000000000	17480ebf-bc76-4e24-8b60-e2501817a165	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-20 15:54:54.990246+00	
00000000-0000-0000-0000-000000000000	a1fdce61-fd04-40ea-888d-eb3482944a64	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-20 15:55:30.647149+00	
00000000-0000-0000-0000-000000000000	06f85aae-c900-46f4-9867-9915e780f61d	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-21 17:27:50.362497+00	
00000000-0000-0000-0000-000000000000	30058b5b-4dec-461f-aa6c-66935046c336	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-21 17:33:15.608967+00	
00000000-0000-0000-0000-000000000000	eddfa100-f582-403d-b68d-264f74a4c6ab	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-21 17:41:38.599202+00	
00000000-0000-0000-0000-000000000000	9170a660-e140-4f9b-bdbd-ef82b3a77ce4	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 11:33:00.421046+00	
00000000-0000-0000-0000-000000000000	4c39afae-5b65-4a28-8e5f-0d2d2f0018e6	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-25 15:06:14.68167+00	
00000000-0000-0000-0000-000000000000	f519696b-028f-4edc-9193-5bcbf05c32e3	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-25 15:06:14.705071+00	
00000000-0000-0000-0000-000000000000	19501cd4-e534-482a-baee-8368bc763647	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-31 17:53:16.455213+00	
00000000-0000-0000-0000-000000000000	930d0f07-c390-44db-a414-625fb0e7c8d2	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-03-31 17:53:16.480336+00	
00000000-0000-0000-0000-000000000000	0c0f425d-3db5-4f76-9849-c3815ea4d3c9	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-03-31 17:53:59.689772+00	
00000000-0000-0000-0000-000000000000	e91e4784-953a-4403-8652-452f89d1921a	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-31 17:54:02.714833+00	
00000000-0000-0000-0000-000000000000	437bd09d-e9e2-41fd-a056-9dfd1b29ae81	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-04-01 08:22:51.665966+00	
00000000-0000-0000-0000-000000000000	b2fbcf26-4287-4b1a-ad8e-67c91f3fca59	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-05 08:41:14.897245+00	
00000000-0000-0000-0000-000000000000	9c6a93d7-8e21-4a5b-b3a8-587d2ec739af	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-05 08:41:14.917635+00	
00000000-0000-0000-0000-000000000000	070d6d59-70b9-476f-93a6-982782f2f63f	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 16:29:11.512292+00	
00000000-0000-0000-0000-000000000000	90bf5cff-7962-4374-94be-8adc37971c7c	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 16:29:11.539918+00	
00000000-0000-0000-0000-000000000000	f683ace4-0272-4c19-8af6-37ee45f1e768	{"action":"token_refreshed","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 18:16:01.352582+00	
00000000-0000-0000-0000-000000000000	50647e34-4235-47e8-a248-b2c13e4fdafd	{"action":"token_revoked","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-04-26 18:16:01.368386+00	
00000000-0000-0000-0000-000000000000	8e598208-1251-4b4d-9cd8-57799d291beb	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-01 14:35:46.768003+00	
00000000-0000-0000-0000-000000000000	af1c4911-bcc5-442c-babb-fcfdc3827f0d	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-05-01 14:37:08.29242+00	
00000000-0000-0000-0000-000000000000	eb2f4508-8450-4e93-94ae-41efcbc3141d	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-01 14:38:20.902578+00	
00000000-0000-0000-0000-000000000000	a13cdba2-afa7-4c2b-b7da-71df3d7e1188	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-05-12 17:17:33.711568+00	
00000000-0000-0000-0000-000000000000	5450364d-c98c-4248-b36b-3c643241bb61	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 18:15:35.53814+00	
00000000-0000-0000-0000-000000000000	9efcc779-172f-4449-954d-b512c01185ff	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 18:15:35.545161+00	
00000000-0000-0000-0000-000000000000	c98be5fe-7127-436a-b957-b4fb11c3c3ba	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 21:38:19.272698+00	
00000000-0000-0000-0000-000000000000	3134f4c5-d7ec-4afe-bf4d-15506e4d96a1	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 21:38:19.275525+00	
00000000-0000-0000-0000-000000000000	ba332257-29aa-464a-84d4-96d6fa390aae	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 22:58:35.756265+00	
00000000-0000-0000-0000-000000000000	89399efd-1a04-4d3f-a6f3-7c3eec46537a	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-12 22:58:35.759291+00	
00000000-0000-0000-0000-000000000000	4edba357-bdb9-4b2e-9832-2ccb5899da58	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 01:52:58.790131+00	
00000000-0000-0000-0000-000000000000	8aa5e749-271d-44b9-97ea-49a1643aefd0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 01:52:58.798443+00	
00000000-0000-0000-0000-000000000000	f5696e18-3020-43ab-96a5-2ece058ce35f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 02:54:04.209719+00	
00000000-0000-0000-0000-000000000000	47a6fbd9-541c-489f-8dd0-455ce7fa238f	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 02:54:04.213765+00	
00000000-0000-0000-0000-000000000000	c242a1d3-da01-4aee-8112-8057f5b5a695	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 04:03:56.19048+00	
00000000-0000-0000-0000-000000000000	b5ca91eb-f143-405a-b7a7-e1d36794099d	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 04:03:56.192379+00	
00000000-0000-0000-0000-000000000000	cb58f216-c4e5-458a-8f52-6ab8670e14be	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 05:12:03.921403+00	
00000000-0000-0000-0000-000000000000	bd542cf4-a95c-4af5-b04f-5eb60f61fd72	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 05:12:03.923579+00	
00000000-0000-0000-0000-000000000000	4e704ec4-c9bf-4994-9167-a4d2426479a0	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 06:15:31.293128+00	
00000000-0000-0000-0000-000000000000	5bf9ad80-55b8-4f69-9d06-665cd6e6c079	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 06:15:31.303143+00	
00000000-0000-0000-0000-000000000000	eb5b4a65-614c-405c-87fd-e175b170a119	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 07:24:51.636156+00	
00000000-0000-0000-0000-000000000000	b3b6a649-94f6-48d0-954b-a4a2481fdea5	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 07:24:51.642386+00	
00000000-0000-0000-0000-000000000000	5aef2e35-7821-4e79-9f10-e613cb1a7754	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 08:44:44.8979+00	
00000000-0000-0000-0000-000000000000	7e047845-9fea-4b5d-957d-e990c9a7223e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 08:44:44.901286+00	
00000000-0000-0000-0000-000000000000	99293f60-81d2-4f9b-b6ac-94d65f30aba3	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 09:47:11.043215+00	
00000000-0000-0000-0000-000000000000	09661157-81e3-441f-996d-8c99d74774d7	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 09:47:11.045594+00	
00000000-0000-0000-0000-000000000000	41df4e50-0501-4a12-95c5-45395fc2859e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 11:43:34.398579+00	
00000000-0000-0000-0000-000000000000	3cc0ef8d-7c65-4270-941d-c01b7b2b068d	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 11:43:34.402086+00	
00000000-0000-0000-0000-000000000000	06e4c9bc-cb4e-4113-9679-f2f9d22d4b53	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 12:55:59.441096+00	
00000000-0000-0000-0000-000000000000	d4e4355f-e50b-4f6d-a236-4a4fa80f465f	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 12:55:59.444763+00	
00000000-0000-0000-0000-000000000000	3267e03e-9f03-48ff-b4da-25a2082618c9	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 14:48:20.631545+00	
00000000-0000-0000-0000-000000000000	1f7cd594-4066-4951-adc0-10f2d2d3dbca	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 14:48:20.634201+00	
00000000-0000-0000-0000-000000000000	bbe74f17-11ee-4499-9a93-bfb9ff98597e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 16:05:06.632603+00	
00000000-0000-0000-0000-000000000000	7b2977cb-c7cd-4fc2-b5cd-5d51447b4aba	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 16:05:06.637271+00	
00000000-0000-0000-0000-000000000000	b71d7f90-6e87-41a1-9300-aab5dc2d6fec	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 21:13:04.180611+00	
00000000-0000-0000-0000-000000000000	2034c171-de13-4a5b-af0d-5cff93ddeecb	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 21:13:04.192959+00	
00000000-0000-0000-0000-000000000000	42eaaf98-eb82-4f6d-be05-37223dbe7123	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 22:37:49.046395+00	
00000000-0000-0000-0000-000000000000	6d83bba4-6534-4575-a638-3f76b26776a7	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 22:37:49.050697+00	
00000000-0000-0000-0000-000000000000	4b019c90-daf7-468e-ab13-7df679626fd4	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 23:50:30.481411+00	
00000000-0000-0000-0000-000000000000	b55c9a1b-ab0e-4848-9a79-b0c1a7749799	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-13 23:50:30.489785+00	
00000000-0000-0000-0000-000000000000	bf6b7a8d-dccc-4c7a-9516-73106c28964f	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 02:18:19.405561+00	
00000000-0000-0000-0000-000000000000	4ce7ab08-4e41-497d-854b-088c7f72dead	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 02:18:19.411352+00	
00000000-0000-0000-0000-000000000000	42313cd8-443a-4a3a-a10f-8ea5c56b63aa	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 03:45:16.543856+00	
00000000-0000-0000-0000-000000000000	dc34f06f-c1e5-42cf-b65f-19da1ae24e07	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 03:45:16.546787+00	
00000000-0000-0000-0000-000000000000	54beeca2-187f-40d6-9884-038cdd33a218	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 05:00:39.039331+00	
00000000-0000-0000-0000-000000000000	3d01003d-edcd-47ce-b579-b2f909120fd5	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 05:00:39.041181+00	
00000000-0000-0000-0000-000000000000	00aef145-9c27-4630-bbed-3eef8e76548e	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 09:42:28.39162+00	
00000000-0000-0000-0000-000000000000	a592c1d4-92c2-4866-9c34-5d552af2c333	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-14 09:42:28.400501+00	
00000000-0000-0000-0000-000000000000	ba6a8ce5-2b3b-4ac3-b92d-d21dcf996dfe	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-30 09:44:51.253056+00	
00000000-0000-0000-0000-000000000000	26c9fd25-9c85-475a-abda-756f961af97e	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-05-30 09:44:51.264457+00	
00000000-0000-0000-0000-000000000000	32efee58-38be-4139-8d3c-9c14799b08fd	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-09 09:15:30.250094+00	
00000000-0000-0000-0000-000000000000	e29c63d6-b07a-4652-bd36-f39d0507ed85	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-07-09 09:16:09.225796+00	
00000000-0000-0000-0000-000000000000	2bc0cad4-3419-4baf-9781-6c8ed90d21b9	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 11:01:04.995067+00	
00000000-0000-0000-0000-000000000000	66b4478c-9597-4748-87f1-9106e2542c53	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-04 23:20:15.10665+00	
00000000-0000-0000-0000-000000000000	329f1abc-a500-4733-a5ea-4062f12ec867	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-04 23:20:15.12393+00	
00000000-0000-0000-0000-000000000000	6ae69a54-e80c-49d3-8c27-061ec746afcd	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:29:20.955015+00	
00000000-0000-0000-0000-000000000000	16d13e36-7d5b-428c-b343-bc762377c494	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:29:20.967195+00	
00000000-0000-0000-0000-000000000000	6c4a4e8b-376e-42d1-9532-f0520abb1535	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-05 21:25:53.891117+00	
00000000-0000-0000-0000-000000000000	1b84ba07-6eb1-48cf-b37c-e07ab8be8f89	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-08-05 21:25:53.903015+00	
00000000-0000-0000-0000-000000000000	70dc7aa0-a1fe-4ade-a6bd-5d2ae151bdcd	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-26 10:12:33.00693+00	
00000000-0000-0000-0000-000000000000	5c7ba383-1b75-459f-8789-9babae59c65e	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-09-26 10:16:26.514573+00	
00000000-0000-0000-0000-000000000000	7addad29-6071-46f4-9564-dca87b6295c7	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-26 10:17:11.493539+00	
00000000-0000-0000-0000-000000000000	94d76ed2-1fdb-401c-8394-c09bb97dfa27	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-12 12:44:53.946995+00	
00000000-0000-0000-0000-000000000000	0488b262-58ce-41f7-a96b-75970313982b	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-12 12:44:53.977093+00	
00000000-0000-0000-0000-000000000000	8f43e666-da6b-45ce-a7b1-9ff4afcea54c	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-13 06:50:07.589415+00	
00000000-0000-0000-0000-000000000000	9b21ad77-d09f-4713-aeb7-8fd6681cc98d	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-13 06:50:07.620521+00	
00000000-0000-0000-0000-000000000000	3e112ac6-49f0-4dfc-a243-5ac5c0fabca9	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-13 09:07:11.260484+00	
00000000-0000-0000-0000-000000000000	4aaee9a9-5bd6-4cf8-a913-265fac715f03	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-13 09:07:11.275894+00	
00000000-0000-0000-0000-000000000000	d4df63c5-e064-48a5-a765-9e1169372b0b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-14 13:04:40.322911+00	
00000000-0000-0000-0000-000000000000	55e19db0-abca-43ff-8902-2bb2d4be0c92	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-14 13:04:40.351272+00	
00000000-0000-0000-0000-000000000000	0b51203a-1a13-49d2-841c-e4790995a1eb	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-10-14 13:05:16.772666+00	
00000000-0000-0000-0000-000000000000	d0f3cbed-aa42-436f-be9f-270e6162d0bc	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 13:05:19.901933+00	
00000000-0000-0000-0000-000000000000	7633bb1d-6f9d-46c4-88a7-77361075810b	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-16 12:55:05.168019+00	
00000000-0000-0000-0000-000000000000	bc49320f-d431-4f9c-a377-d22e602168f0	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-16 12:55:05.203032+00	
00000000-0000-0000-0000-000000000000	802e4008-a7da-46c6-89bd-4153e5d74eec	{"action":"token_refreshed","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-29 16:36:27.695076+00	
00000000-0000-0000-0000-000000000000	9e20a329-6ae3-4a3f-99db-d6a39c3d845d	{"action":"token_revoked","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"token"}	2025-10-29 16:36:27.728123+00	
00000000-0000-0000-0000-000000000000	c7c4cf06-bab8-4654-bfe4-295e22ea5b1e	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-10-29 17:05:41.004237+00	
00000000-0000-0000-0000-000000000000	02b3212d-2aef-4400-9be9-c684af79c3fc	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-29 17:05:44.429455+00	
00000000-0000-0000-0000-000000000000	55f2d74a-f33c-4f1b-ab96-8fc62683d1c9	{"action":"logout","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-29 17:05:55.315271+00	
00000000-0000-0000-0000-000000000000	5eabff2c-a8ce-4002-aa55-9986eb3a27dd	{"action":"login","actor_id":"8cf9e653-3919-4a86-8473-ec00dab1e4fb","actor_name":"Aditya Veer Singh Narang","actor_username":"avsnarang@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-29 17:06:15.586073+00	
00000000-0000-0000-0000-000000000000	8287b735-68c9-4e0d-a7fc-5389208dd648	{"action":"user_signedup","actor_id":"6988c45c-7dfc-42db-958b-d5a4a13323bc","actor_name":"Abhilakshya Sharma","actor_username":"abhilakshya.sharma@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-02 05:35:10.319632+00	
00000000-0000-0000-0000-000000000000	87cca7d1-f797-4913-8e4d-4186f7257cfc	{"action":"login","actor_id":"6988c45c-7dfc-42db-958b-d5a4a13323bc","actor_name":"Abhilakshya Sharma","actor_username":"abhilakshya.sharma@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-02 05:35:10.361122+00	
00000000-0000-0000-0000-000000000000	dbc9510b-f1a3-4c44-bd93-c83b79937600	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-02 19:16:48.400305+00	
00000000-0000-0000-0000-000000000000	a2512375-c7b2-44bf-892f-c80222d5939b	{"action":"logout","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account"}	2025-11-02 19:16:53.24052+00	
00000000-0000-0000-0000-000000000000	4b01c69b-4011-45fa-a0cb-cd45429628b6	{"action":"login","actor_id":"34d30f66-0603-49ef-a723-c8f954214957","actor_username":"avsnarang@tsh.edu.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-02 19:20:08.043211+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
34d30f66-0603-49ef-a723-c8f954214957	34d30f66-0603-49ef-a723-c8f954214957	{"sub": "34d30f66-0603-49ef-a723-c8f954214957", "email": "avsnarang@tsh.edu.in", "email_verified": false, "phone_verified": false}	email	2025-03-01 15:45:12.969052+00	2025-03-01 15:45:12.969108+00	2025-03-01 15:45:12.969108+00	f74410aa-e2de-4cf3-a7b0-87df7add2f28
8cf9e653-3919-4a86-8473-ec00dab1e4fb	8cf9e653-3919-4a86-8473-ec00dab1e4fb	{"sub": "8cf9e653-3919-4a86-8473-ec00dab1e4fb", "email": "avsnarang@gmail.com", "full_name": "Aditya Veer Singh Narang", "email_verified": false, "phone_verified": false, "has_completed_profile": true}	email	2025-03-02 23:00:47.33865+00	2025-03-02 23:00:47.338697+00	2025-03-02 23:00:47.338697+00	931ad127-f2b6-418f-898b-7086e66a12df
6988c45c-7dfc-42db-958b-d5a4a13323bc	6988c45c-7dfc-42db-958b-d5a4a13323bc	{"sub": "6988c45c-7dfc-42db-958b-d5a4a13323bc", "email": "abhilakshya.sharma@gmail.com", "full_name": "Abhilakshya Sharma", "email_verified": false, "phone_verified": false, "has_completed_profile": true}	email	2025-11-02 05:35:10.289942+00	2025-11-02 05:35:10.290012+00	2025-11-02 05:35:10.290012+00	afa4bfae-f9b2-4cbe-8e30-d7e2e03e6664
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
c0292b6b-ecff-4742-999a-447d8be20bea	2025-10-29 17:06:15.589269+00	2025-10-29 17:06:15.589269+00	password	e38949d9-ffe0-4c40-a617-e4a2b91c9c42
4cf3e753-3569-43a5-8336-acc0fc74e0e7	2025-11-02 05:35:10.425142+00	2025-11-02 05:35:10.425142+00	password	5fb6320f-6127-4217-903e-5c208616e02b
abcbfee2-d5b2-4d47-98d2-ad4a309da6c3	2025-11-02 19:20:08.052316+00	2025-11-02 19:20:08.052316+00	password	470460a7-29a6-416b-a518-c7b510be54cc
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	292	zglyriwipbh6	8cf9e653-3919-4a86-8473-ec00dab1e4fb	f	2025-10-29 17:06:15.587984+00	2025-10-29 17:06:15.587984+00	\N	c0292b6b-ecff-4742-999a-447d8be20bea
00000000-0000-0000-0000-000000000000	293	w54qogck7hnd	6988c45c-7dfc-42db-958b-d5a4a13323bc	f	2025-11-02 05:35:10.394944+00	2025-11-02 05:35:10.394944+00	\N	4cf3e753-3569-43a5-8336-acc0fc74e0e7
00000000-0000-0000-0000-000000000000	295	7jtwqzgd6wqh	34d30f66-0603-49ef-a723-c8f954214957	f	2025-11-02 19:20:08.049076+00	2025-11-02 19:20:08.049076+00	\N	abcbfee2-d5b2-4d47-98d2-ad4a309da6c3
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id) FROM stdin;
c0292b6b-ecff-4742-999a-447d8be20bea	8cf9e653-3919-4a86-8473-ec00dab1e4fb	2025-10-29 17:06:15.587176+00	2025-10-29 17:06:15.587176+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	49.43.169.163	\N	\N
4cf3e753-3569-43a5-8336-acc0fc74e0e7	6988c45c-7dfc-42db-958b-d5a4a13323bc	2025-11-02 05:35:10.363591+00	2025-11-02 05:35:10.363591+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0	49.43.168.106	\N	\N
abcbfee2-d5b2-4d47-98d2-ad4a309da6c3	34d30f66-0603-49ef-a723-c8f954214957	2025-11-02 19:20:08.047018+00	2025-11-02 19:20:08.047018+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	49.43.169.163	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	6988c45c-7dfc-42db-958b-d5a4a13323bc	authenticated	authenticated	abhilakshya.sharma@gmail.com	$2a$10$gas3/9oI3y5KIi67frjxlefKdD8kn7h5/UjEL.XsIHQ1XcBZY6IXS	2025-11-02 05:35:10.340043+00	\N		\N		\N			\N	2025-11-02 05:35:10.363502+00	{"provider": "email", "providers": ["email"]}	{"sub": "6988c45c-7dfc-42db-958b-d5a4a13323bc", "email": "abhilakshya.sharma@gmail.com", "full_name": "Abhilakshya Sharma", "email_verified": true, "phone_verified": false, "has_completed_profile": true}	\N	2025-11-02 05:35:10.217676+00	2025-11-02 05:35:10.424584+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	34d30f66-0603-49ef-a723-c8f954214957	authenticated	authenticated	avsnarang@tsh.edu.in	$2a$10$Pbj5na9sIvTVpmIyacThcuXuTpNnCPjHQJwh4lDlx8D/MplpQhr2a	2025-03-01 15:45:12.976119+00	\N		\N		\N			\N	2025-11-02 19:20:08.046924+00	{"provider": "email", "providers": ["email"]}	{"sub": "34d30f66-0603-49ef-a723-c8f954214957", "email": "avsnarang@tsh.edu.in", "email_verified": true, "phone_verified": false}	\N	2025-03-01 15:45:12.944061+00	2025-11-02 19:20:08.051625+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8cf9e653-3919-4a86-8473-ec00dab1e4fb	authenticated	authenticated	avsnarang@gmail.com	$2a$10$2F.1qjn7nTEUStB7tLSBEOcqf6YbVq5/aVje4dnVsOsgHXDj34cTe	2025-03-02 23:00:47.341892+00	\N		\N		\N			\N	2025-10-29 17:06:15.587095+00	{"provider": "email", "providers": ["email"]}	{"sub": "8cf9e653-3919-4a86-8473-ec00dab1e4fb", "email": "avsnarang@gmail.com", "full_name": "Aditya Veer Singh Narang", "email_verified": true, "phone_verified": false, "has_completed_profile": true}	\N	2025-03-02 23:00:47.335374+00	2025-10-29 17:06:15.588933+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY pgsodium.key (id, status, created, expires, key_type, key_id, key_context, name, associated_data, raw_key, raw_key_nonce, parent_key, comment, user_data) FROM stdin;
\.


--
-- Data for Name: academic_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.academic_sessions (id, value, label, is_active, created_at) FROM stdin;
eea2d083-4c26-48ca-9689-d0973d5ec9c6	2023-24	2023-24	t	2025-03-08 18:55:20.832768+00
d12e5752-0b94-420f-bdab-679bfa67e9c3	2024-25	2024-25	t	2025-03-08 18:55:20.832768+00
b4e89932-0f7b-48f4-98ad-9a6d77f5389b	2025-26	2025-26	t	2025-03-08 18:55:20.832768+00
211b8a81-bcdd-40fd-a54b-3d7d1f1d1684	2026-27	2026-27	t	2025-03-08 18:55:48.736455+00
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_users (id, role, created_at) FROM stdin;
34d30f66-0603-49ef-a723-c8f954214957	administrator	2025-03-01 15:45:13.751423+00
\.


--
-- Data for Name: alumni_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alumni_profiles (id, full_name, batch_year, current_location, occupation, company, bio, linkedin_url, is_public, created_at, updated_at, phone, email, instagram_url, facebook_url, show_contact_info, testimonial, show_testimonial, profile_picture_url, show_in_success) FROM stdin;
8cf9e653-3919-4a86-8473-ec00dab1e4fb	Aditya Veer Singh Narang	2020	Paonta Sahib	Head of IT	The Scholars' Home	\N		t	2025-03-02 23:00:48.206+00	2025-03-03 11:16:34.925+00	9816900056	avsnarang@gmail.com	https://instagram.com/avsnarang	\N	t	\N	f	https://mijwwnwvcngqdrrlfuge.supabase.co/storage/v1/object/public/alumni/profile-pictures/kwn4j8u1eaa_1740958194700.jpeg	t
6988c45c-7dfc-42db-958b-d5a4a13323bc	Abhilakshya Sharma	2015	Paonta Sahib	Photographer	\N	\N	\N	f	2025-11-02 05:35:12.116+00	2025-11-02 05:35:12.116+00	9882300133	abhilakshya.sharma@gmail.com	https://www.instagram.com/lakshyaa_/	\N	t	\N	t	https://mijwwnwvcngqdrrlfuge.supabase.co/storage/v1/object/public/alumni/profile-pictures/6988c45c-7dfc-42db-958b-d5a4a13323bc_1762062079053.jpg	f
\.


--
-- Data for Name: calendar_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calendar_events (id, title, description, start_time, end_time, location, event_type, branch, session, is_public, synced_with_google, google_event_id, created_at, updated_at, is_all_day) FROM stdin;
\.


--
-- Data for Name: event_rsvps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_rsvps (id, event_id, user_id, status, guests, created_at, admission_number, max_guests_per_rsvp, updated_at) FROM stdin;
fbe22558-cb33-40e9-a07d-2a8345de2a5f	19399077-ebeb-4a4b-a565-67a2b66ba499	34d30f66-0603-49ef-a723-c8f954214957	not_attending	1	2025-03-17 10:46:13.540788+00	10001111	\N	2025-03-17 10:46:30.723535+00
\.


--
-- Data for Name: event_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_types (id, value, label, created_at) FROM stdin;
f549c882-5df0-4bbd-84ac-e167c512907d	academic	Academic	2025-03-08 18:48:29.564449+00
178f0e13-06cf-4bdf-bb22-2148df7c6353	social	Social	2025-03-08 18:48:29.564449+00
f7dc3e63-e8ba-4579-ac38-036b914add64	sports	Sports	2025-03-08 18:48:29.564449+00
32880d85-4c04-44de-a486-4cf5164c9db6	cultural	Cultural	2025-03-08 18:48:29.564449+00
4f335617-0303-4825-b7e5-ea45e3f32d20	other	Other	2025-03-08 18:48:29.564449+00
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, date, "time", location, description, cover_image, max_capacity, created_at, updated_at, max_guests_per_rsvp, requires_admission_number, accepting_rsvps) FROM stdin;
19399077-ebeb-4a4b-a565-67a2b66ba499	Graduation Ceremony [Pre-Nursery to KG]	2025-05-31	08:00	The Scholars' Home, Paonta Sahib		https://images.tsh.edu.in/homepage/hero.jpeg	200	2025-03-17 10:45:06.236924+00	2025-11-02 19:28:37.906542+00	2	t	t
d5384b02-a6a5-4c8c-a1ec-74ded4bcafcb	test	2025-11-06	00:01	test	test		5	2025-11-02 19:28:53.161484+00	2025-11-02 19:28:53.161484+00	1	f	t
\.


--
-- Data for Name: featured_testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.featured_testimonials (id, alumni_profile_id, is_visible, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: gallery_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery_events (id, title, description, date, campus, created_at, updated_at, primary_image_url, primary_image_id) FROM stdin;
b10bcb20-13e9-43aa-bc14-517b4e8d64dd	Trip to Manali	Our students recently embarked on an exciting trip to Manali, where they explored breathtaking landscapes, enjoyed thrilling adventures, and created unforgettable memories. From snow-covered peaks to lively bonfires, every moment was filled with fun, laughter, and learning.\n\nWhether it was trekking through scenic trails, exploring local culture, or simply enjoying the cool mountain air, the trip was a perfect blend of adventure and relaxation. It was truly an experience to cherish, strengthening friendships and leaving everyone with stories to tell for years to come!	2024-11-13	Paonta Sahib	2025-03-03 17:38:14.634209+00	2025-03-03 17:38:14.634209+00	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00040.jpg	\N
\.


--
-- Data for Name: gallery_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery_images (id, image_url, caption, created_at, "eventID") FROM stdin;
29ea73ce-7ca1-4f33-b299-13d436e842ed	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00001.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
719b1b7b-a60e-40cf-9688-f7521a0e67d5	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00002.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
efc0b654-9d65-47aa-b02c-8e17be5e1c0c	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00003.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
95a2108c-0641-48dc-a939-9b100488df79	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00004.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
961725cd-7917-4018-afcf-0d2418ad1630	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00005.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
7fca82ec-f79a-4b9d-b5b0-6ee292bdfa4e	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00006.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
04d18748-8723-45b2-b3ca-7c7280922d9b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00007.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
49487164-6a43-4213-95bc-3380b9f2b3d8	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00008.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
e04db9fd-6a75-4d47-899f-9b99bd3a74ea	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00009.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
954ee4fe-5151-4543-a22a-f645307fa86d	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00010.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
8a4a0e8e-7b55-4179-bac5-03a88ad05505	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00011.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
fc71e553-d06c-4da4-b500-39b9e3a4307c	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00012.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
e0636751-f827-4f15-93cf-d043e7165053	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00013.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
d4c7aa4c-7aae-4f37-af2f-500547eb276b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00014.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
5c6ada96-aa24-4122-bef6-218acd184a6a	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00015.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
148bdc61-f49b-470d-8c2b-8c1da0d4761b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00016.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
67aef69f-3376-4d4d-a6aa-c683f9fd6727	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00017.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
7b17cdf1-7770-4552-b4ff-2407a2694ef5	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00018.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
2a0ad64a-3db2-4dc9-96d7-82d664bcabb4	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00019.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
d64f8ca7-658e-4be2-b234-0a8c0b993c5a	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00020.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
c3171eec-01ad-4abd-866a-f84362723642	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00021.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
95568a96-4890-4ae1-80e4-4922f3b25520	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00022.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
c580b43f-f0c8-4ae9-978b-b1c6d8b42ed4	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00023.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
f0b022fa-668e-4875-9851-ce9f0d510f5c	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00024.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
9895ec0b-fa87-4fc1-9509-42ba4d2c4ee9	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00025.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
47c18de1-4c80-4b6e-9053-ebf018b68705	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00026.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
2e7ecc8e-bb6a-43bc-9b34-5497b5064581	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00027.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
db478d3d-553d-4f2a-9ea9-4127604aac51	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00028.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
ed2fbbbe-15ca-48ca-a15c-63a1077f789e	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00029.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
a4e01346-6f91-4e98-83cd-8a9d3ae66d50	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00030.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
e21e1303-d2d5-409f-9aff-7bebacb52304	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00031.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
cfdc7a71-ee71-4de9-8cd0-af4a98ac589f	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00032.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
7043199d-5d1e-45f7-b8c8-e9d9cf4b0520	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00033.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
32f6633d-76f4-4fb1-bfd6-75a9ee8b8652	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00034.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
6dab0f47-4c61-468e-a041-af39f292414b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00035.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
871307d1-6ef1-4a66-aeea-b502cdd0866b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00036.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
8f8158d9-5539-4768-b641-5fc173240a8e	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00037.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
eac36330-1265-4db8-93cd-c8177aa3bf11	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00038.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
01899139-3908-49e8-b851-62009c371e37	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00039.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
623c557c-2d84-4fa6-a875-6937146c79f6	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00040.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
da99d39b-c177-4ad8-bbf0-9a444783696f	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00041.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
bc9dabea-6083-40ac-a308-e61a31dde70d	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00042.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
722e149b-3e0c-4968-9b45-d309464ea7d3	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00043.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
f62114da-571a-447d-ae5b-19f7cab9a66b	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00044.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
0629f56b-4d6d-4e7e-b75c-651b73b4720e	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00045.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
e11a4fbe-ac57-400b-9512-c2932b08b112	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00046.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
bae6e0fe-af86-49f2-9f5a-a46470636eae	https://images.tsh.edu.in/gallery/manaliTrip-PaontaSahib/IMG-00047.jpg		2025-03-05 00:03:55.431663+00	b10bcb20-13e9-43aa-bc14-517b4e8d64dd
\.


--
-- Data for Name: latest_updates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.latest_updates (id, content, is_active, created_at, updated_at, link) FROM stdin;
75094c53-e242-4580-8d09-887829f565f0	Admissions Open for the Session 2025-26. Limited Seats Available, Hurry Up!	f	2025-03-19 12:25:04.985+00	2025-03-20 09:18:30.750358+00	/admissions
4c172a1f-53da-4286-bb91-f15830bcdc3a	Fresh conversations just dropped. Listen now!	t	2025-03-01 15:30:58.282988+00	2025-10-29 16:42:18.159355+00	/video-gallery
\.


--
-- Data for Name: leadership_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leadership_messages (id, role, name, preview, full_message, "order", created_at, updated_at, photo_url, campus, display_locations) FROM stdin;
b1239e27-ed82-4ece-b0a9-6814386bbd55	Chairperson	Ms. Iqbal Kaur Narang	For over two decades, The Scholars' Home has stood as a beacon of educational excellence...	Dear Parents and Students,\n\nFor over two decades, The Scholars' Home has stood as a beacon of educational excellence, nurturing young minds and shaping future leaders. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep-rooted belief in the transformative power of education.\n\nIn today's rapidly evolving world, we remain committed to providing an education that balances academic rigor with character development, technological advancement with traditional values, and individual growth with social responsibility.\n\nTogether, let us continue to build a brighter future for our children.	1	2025-03-01 15:28:34.617398+00	2025-03-01 15:47:53.193+00	\N	all	{homepage,leadership}
e96f1949-fc4f-4bf3-a0f5-e6016438d2b8	Director	Ms. Gurmeet Kaur Narang	The Scholars’ Home is a nurturing ground for future leaders, where each child’s unique potential is cultivated with love, values, and a vision...	THE SCHOLARS’ HOME SCHOOL is a temple of learning where each & every day is like a priceless journey of discovering and learning new things.\n\nEach Scholar is a precious jewel & is unique, we only nurture their hidden potential with love and affection & provide opportunities to strive & lead the world with high moral & ethical values.\nOur goal is to make THE SCHOLARS’ HOME the cradle of leadership and values, from the portals of which will emerge generations of future leaders in every sphere of activity in our country ; as indeed in the world of tomorrow.\n\nEach & every child is taught to study in an atmosphere of Love & Unity, where they can see themselves not only as a member of TSH family but also as a member of one global family.\n\nThe need of the hour is to help our children to become independent thinkers & develop integrated personalities.\n\nToday’s youth are the leaders & nation builders of tomorrow. We put in our sincere efforts to groom them to boldly face the challenges that await them in the future.	3	2025-03-01 15:28:34.617398+00	2025-03-01 15:28:34.617398+00	https://images.tsh.edu.in/leaders/director.jpg	all	{all}
4548d640-00ab-4980-9fcd-b10fded384f4	Senior Principal	Mr. Abhishek Sharma	Together, we nurture young minds, instilling values, fostering growth, and shaping future leaders through a holistic and collaborative...	Dear Parents, \n\nGreetings!\n\nThe Scholars’ Home School, as you know, is renowned for its holistic education approach that facilitates cognitive, physical, emotional, social, and spiritual development. Our integrated value system shapes the right attitude, fostering a nurturing environment for our students.\n\nAs the new principal, I'm wholly committed to unlocking each child's inherent potential and cultivating their unique talent. We aim to shape lifelong learners, future leaders instilled with firm values from the primary levels.\n\nParents, we view you as integral partners in this enriching journey of education. Our shared aspiration is to cultivate innovative global citizens with a robust value system. We emphasise a practical approach to developing life skills and fostering an environment conducive to knowledge exchange, benefiting both students and faculty.\n\nOur educational ethos comprises integrity, honesty, humility, responsibility, contentment, and respect for all religions. We strive to imbibe these values in our students, paving their way towards a brighter and successful future. \n\nI'm excited about our partnership and look forward to fostering a thriving educational environment that ensures the all-round development of our students.\n\nWishing you all a prosperous year ahead.	4	2025-03-01 20:48:09.266574+00	2025-03-01 20:48:09.266574+00	https://images.tsh.edu.in/leaders/principal.jpg	all	{paonta-sahib}
aaee312c-2852-45d8-affc-e4939802fb26	Managing Director	Dr. N.P.S. Narang	At The Scholars’ Home, we nurture young minds with a vision of empowerment, creativity, and leadership, shaping future global citizens with strong...	Having started THE SCHOLARS’ HOME SCHOOL in 2004, our Educational Trust ‘Thakar Singh Memorial Education Trust’ has since consistently displayed full awareness of its social responsibilities. The Trust envisions education as a powerful instrument for the enlightenment and empowerment of our citizens. It is with this philanthropic spirit that we have drawn our educational goal of empowering our students to become self dependent and have a global outlook, albeit with a keen eye to local conditions. \n\nChildren with tender and receptive minds are eager and natural learners. They are quick to observe and absorb all around them. We at The Scholars’ Home endeavour to optimize their creative and adventurous spirit by providing them all possible avenues of creativity, adventure and sport activities. They being free spirits, we encourage their imagination to spread wings and not restrict their thoughts.\nHaving made rapid strides in the very few years since the inception of the school, I see the School continuing rapidly along the path of growth charted out for it. I see infrastructure developing further and coming up to truly global standards. Affiliated to the Central Board of Secondary Education, I see the students of the school excelling in board examination in the years to come. With excellent sports and education facilities, I also see our students’ minds opening up; for the mind is like a parachute-it functions best when it is open. I see our students blossoming into mature and responsible citizens, intensely practical but retaining the power to dream. To dream is to envision a goal. In order to achieve, there must be a goal.\n\nOur goal is to make THE SCHOLARS’ HOME the cradle of leadership and values, from the portals of which will emerge generations of future leaders in every sphere of activity in our country ; as indeed in the world of tomorrow.\n\nWith this, I look into the future with the hope that together we, the management, along with the principal, teachers, administrative staff, our students and their parents will work hand-in-hand to realise the goals we have set out for ourselves.	2	2025-03-01 15:28:34.617398+00	2025-03-01 15:56:58.473+00	https://images.tsh.edu.in/leaders/narang_sir.jpg	all	{all}
\.


--
-- Data for Name: sports_programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sports_programs (id, name, category, coach, achievements, description, age_groups, schedules, images, created_by, created_at, updated_by, updated_at, is_published) FROM stdin;
f0cbbee4-abd4-4c16-a51b-2fab68159d69	Football	Team Sports	Mr. Praveen Kumar			{"Ages 5 to 18"}	[{"type": "Summer", "timings": ["6:00 AM to 7:30 AM"]}]	{"main_image": "https://images.tsh.edu.in/homepage/hero.jpeg", "gallery_images": ["https://images.tsh.edu.in/homepage/hero.jpeg"]}	34d30f66-0603-49ef-a723-c8f954214957	2025-03-20 04:51:46.046032+00	34d30f66-0603-49ef-a723-c8f954214957	2025-05-01 14:50:30.633119+00	t
\.


--
-- Data for Name: sports_registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sports_registrations (id, admission_number, sport_id, medical_conditions, preferred_schedule, created_at, status) FROM stdin;
e1e0a3bc-e8fe-4c70-96fa-c57d8368884d	10001111	f0cbbee4-abd4-4c16-a51b-2fab68159d69	fd	Summer	2025-03-21 18:18:56.94515+00	pending
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (admission_number, full_name, class, created_at, updated_at) FROM stdin;
10001111	Test	test	2025-03-05 11:51:04.663728+00	2025-03-05 11:51:04.663728+00
\.


--
-- Data for Name: success_stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.success_stories (id, title, content, created_at, alumni_id, created_by) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, full_name, profile_picture_url, qualifications, experience_years, designation, department, bio, is_visible, created_at, updated_at, subject, class_level, photo_url) FROM stdin;
3815a667-c723-4c32-930f-59e232f5d228	Damandeep Singh Matneja	\N	{M.Sc.,B.Ed.}	10	Senior Mathematics Teacher	Mathematics	\N	t	2025-03-08 13:04:33.266724+00	2025-05-12 17:23:08.490853+00	{Mathematics}	PGT	\N
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, source_type, author_name, student_name, class, content, profile_picture_url, is_visible, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, role, created_at, updated_at) FROM stdin;
34d30f66-0603-49ef-a723-c8f954214957	avsnarang@tsh.edu.in	admin	2025-03-02 07:10:21.720195+00	2025-03-02 07:10:21.720195+00
\.


--
-- Data for Name: youtube_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.youtube_videos (id, title, description, embed_code, "position", is_visible, created_at, updated_at) FROM stdin;
06cff09b-1030-4258-afa3-56bce84c0efd	Voices Beyond the Classroom | Ep. 01: Unfiltered Wisdom with Dr. Vanit Nalwa	Voices Beyond the Classroom is a series by The Scholars’ Home, where our students step forward as hosts—leading deep, meaningful conversations with inspiring personalities, leaders, and changemakers.\n\nIn this very first episode, our young hosts engage in an unfiltered and thought-provoking dialogue with Dr. Vanit Nalwa, whose vast experience and grounded wisdom shine through as she shares insights on education, life, and values that shape character beyond academics.\n\nThrough this exchange, students not only learn but also grow as independent thinkers—echoing our school’s mission of nurturing compassionate, confident individuals who will make a difference in society.\n\n✨ Stay tuned for more conversations where students bring to light voices that go far beyond the classroom.\n🔔 Don’t forget to subscribe and support their journey of discovery and dialogue!	<iframe width="560" height="315" src="https://www.youtube.com/embed/2nJa8uzNB4g?si=gf6eTcXiVicDRmxE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>	0	t	2025-10-29 17:02:32.0702+00	2025-10-29 17:02:32.0702+00
f2e47226-7934-4ed7-b2d8-f3f00bf3c77b	EP-1 Why TSH?	Discover the story behind The Scholars’ Home – our vision, challenges, and the legacy we continue to build. 🚀🏫 Watch now!	<iframe width="560" height="315" src="https://www.youtube.com/embed/fug6_DnkkXk?si=2QIVapp5RIQhh3ai" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>	2	t	2025-03-20 05:11:43.565219+00	2025-03-20 05:11:43.565219+00
c2819148-7dba-4e18-90eb-e926ff92fc3d	EP-1 The Legacy Series	In this enriching episode, Dr. N.P.S. Narang, Managing Director of The Scholars’ Home, sits down with S. Kulwant Singh Choudhary - a respected community member of Paonta Sahib - to discuss the profound history of Paonta Sahib and its deep connection with Guru Gobind Singh Ji.	<iframe width="560" height="315" src="https://www.youtube.com/embed/ZPGhWl1E9Nc?si=IzCkdsW6matI8UKX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>	1	t	2025-10-14 13:06:00.887833+00	2025-10-14 13:06:00.887833+00
394c96eb-d4d1-49da-a57e-6c0e09ea29b4	EP-2 Why TSH?	How does TSH foster excellence and shape the future of education? 🌱📚 Dive into our journey of growth and innovation! Watch now!	<iframe width="560" height="315" src="https://www.youtube.com/embed/rYgP9hbPtbI?si=0IljyAEMSMzycxEz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>	3	t	2025-03-20 09:19:26.747471+00	2025-03-20 09:19:26.747471+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-03-01 15:27:12
20211116045059	2025-03-01 15:27:15
20211116050929	2025-03-01 15:27:17
20211116051442	2025-03-01 15:27:19
20211116212300	2025-03-01 15:27:21
20211116213355	2025-03-01 15:27:24
20211116213934	2025-03-01 15:27:26
20211116214523	2025-03-01 15:27:29
20211122062447	2025-03-01 15:27:31
20211124070109	2025-03-01 15:27:33
20211202204204	2025-03-01 15:27:35
20211202204605	2025-03-01 15:27:37
20211210212804	2025-03-01 15:27:44
20211228014915	2025-03-01 15:27:46
20220107221237	2025-03-01 15:27:48
20220228202821	2025-03-01 15:27:50
20220312004840	2025-03-01 15:27:52
20220603231003	2025-03-01 15:27:56
20220603232444	2025-03-01 15:27:58
20220615214548	2025-03-01 15:28:00
20220712093339	2025-03-01 15:28:03
20220908172859	2025-03-01 15:28:05
20220916233421	2025-03-01 15:28:07
20230119133233	2025-03-01 15:28:09
20230128025114	2025-03-01 15:28:12
20230128025212	2025-03-01 15:28:14
20230227211149	2025-03-01 15:28:16
20230228184745	2025-03-01 15:28:18
20230308225145	2025-03-01 15:28:20
20230328144023	2025-03-01 15:28:22
20231018144023	2025-03-01 15:28:25
20231204144023	2025-03-01 15:28:28
20231204144024	2025-03-01 15:28:31
20231204144025	2025-03-01 15:28:33
20240108234812	2025-03-01 15:28:35
20240109165339	2025-03-01 15:28:37
20240227174441	2025-03-01 15:28:42
20240311171622	2025-03-01 15:28:45
20240321100241	2025-03-01 15:28:50
20240401105812	2025-03-01 15:28:56
20240418121054	2025-03-01 15:28:59
20240523004032	2025-03-01 15:29:06
20240618124746	2025-03-01 15:29:09
20240801235015	2025-03-01 15:29:11
20240805133720	2025-03-01 15:29:13
20240827160934	2025-03-01 15:29:15
20240919163303	2025-03-01 15:29:18
20240919163305	2025-03-01 15:29:20
20241019105805	2025-03-01 15:29:22
20241030150047	2025-03-01 15:29:30
20241108114728	2025-03-01 15:29:33
20241121104152	2025-03-01 15:29:35
20241130184212	2025-03-01 15:29:38
20241220035512	2025-03-01 15:29:40
20241220123912	2025-03-01 15:29:42
20241224161212	2025-03-01 15:29:44
20250107150512	2025-03-01 15:29:46
20250110162412	2025-03-01 15:29:48
20250123174212	2025-03-01 15:29:51
20250128220012	2025-03-01 15:29:53
20250506224012	2025-06-30 12:01:19
20250523164012	2025-06-30 12:01:21
20250714121412	2025-07-31 12:19:11
20250905041441	2025-11-02 19:19:25
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
alumni	alumni	\N	2025-03-01 15:27:20.599693+00	2025-03-01 15:27:20.599693+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-03-01 15:23:47.941332
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-03-01 15:23:47.961417
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-03-01 15:23:47.976652
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-03-01 15:23:48.022344
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-03-01 15:23:48.066833
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-03-01 15:23:48.080814
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-03-01 15:23:48.096096
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-03-01 15:23:48.110439
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-03-01 15:23:48.123856
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-03-01 15:23:48.137979
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-03-01 15:23:48.151903
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-03-01 15:23:48.16671
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-03-01 15:23:48.184334
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-03-01 15:23:48.198457
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-03-01 15:23:48.213323
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-03-01 15:23:48.253598
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-03-01 15:23:48.267289
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-03-01 15:23:48.281377
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-03-01 15:23:48.296741
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-03-01 15:23:48.31268
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-03-01 15:23:48.327234
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-03-01 15:23:48.348963
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-03-01 15:23:48.390449
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-03-01 15:23:48.426311
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-03-01 15:23:48.440351
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-03-01 15:23:48.455003
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-08-29 18:54:21.979483
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-08-29 18:54:22.433729
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-08-29 18:54:22.542109
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-08-29 18:54:22.631382
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-08-29 18:54:22.665341
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-08-29 18:54:22.74496
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-08-29 18:54:22.825839
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-08-29 18:54:24.137162
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-08-29 18:54:24.14875
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-08-29 18:54:24.187741
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-08-29 18:54:24.252934
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-08-29 18:54:24.346599
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-08-29 18:54:24.435757
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-09-26 10:12:41.932157
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-09-26 10:12:41.972271
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-09-26 10:12:42.002861
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-09-26 10:12:42.010125
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-09-26 10:12:42.020143
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
e26994e6-10f7-4571-86fe-e033b6b705cf	alumni	profile-pictures/kwn4j8u1eaa_1740958194700.jpeg	8cf9e653-3919-4a86-8473-ec00dab1e4fb	2025-03-02 23:29:57.42147+00	2025-08-29 18:54:22.641346+00	2025-03-02 23:29:57.42147+00	{"eTag": "\\"e0c3ad59aa8dc658da803ad47dd2baae\\"", "size": 1970254, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-03-02T23:29:58.000Z", "contentLength": 1970254, "httpStatusCode": 200}	42dfe032-ad5e-43fe-a9d8-7d1f6e26452b	8cf9e653-3919-4a86-8473-ec00dab1e4fb	{}	2
9a73bb73-3be3-44dd-8426-a03b40c9ccde	alumni	profile-pictures/6988c45c-7dfc-42db-958b-d5a4a13323bc_1762062079053.jpg	6988c45c-7dfc-42db-958b-d5a4a13323bc	2025-11-02 05:41:20.714948+00	2025-11-02 05:41:20.714948+00	2025-11-02 05:41:20.714948+00	{"eTag": "\\"77ec1d0df9b4888754e6eb988cfb6613\\"", "size": 2255507, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-02T05:41:21.000Z", "contentLength": 2255507, "httpStatusCode": 200}	9c9ea64c-3444-4f77-8f26-5c918a8553e7	6988c45c-7dfc-42db-958b-d5a4a13323bc	{}	2
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
alumni	profile-pictures	2025-08-29 18:54:22.567646+00	2025-08-29 18:54:22.567646+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250222131305	{"\\\\n\\\\nCREATE TABLE IF NOT EXISTS alumni_profiles (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id),\\\\n  full_name text NOT NULL,\\\\n  batch_year integer NOT NULL,\\\\n  current_location text,\\\\n  occupation text,\\\\n  company text,\\\\n  bio text,\\\\n  linkedin_url text,\\\\n  is_public boolean DEFAULT false,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\nALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Policy for public access to public profiles\\\\nCREATE POLICY \\"Public profiles are viewable by everyone\\"\\\\n  ON alumni_profiles\\\\n  FOR SELECT\\\\n  USING (is_public = true)","\\\\n\\\\n-- Policy for authenticated users to view all profiles\\\\nCREATE POLICY \\"Authenticated users can view all profiles\\"\\\\n  ON alumni_profiles\\\\n  FOR SELECT\\\\n  TO authenticated\\\\n  USING (true)","\\\\n\\\\n-- Policy for users to update their own profile\\\\nCREATE POLICY \\"Users can update own profile\\"\\\\n  ON alumni_profiles\\\\n  FOR UPDATE\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)\\\\n  WITH CHECK (auth.uid() = id)","\\\\n\\\\n-- Policy for users to insert their own profile\\\\nCREATE POLICY \\"Users can insert own profile\\"\\\\n  ON alumni_profiles\\\\n  FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (auth.uid() = id)",""}	square_shape
20250222132712	{"\\\\n\\\\n-- Create a new bucket for alumni profile pictures if it doesn't exist\\\\nINSERT INTO storage.buckets (id, name, public)\\\\nVALUES ('alumni', 'alumni', true)\\\\nON CONFLICT (id) DO NOTHING","\\\\n\\\\n-- Create a policy to allow authenticated users to upload files\\\\nCREATE POLICY \\"Allow authenticated users to upload files\\"\\\\nON storage.objects\\\\nFOR INSERT\\\\nTO authenticated\\\\nWITH CHECK (bucket_id = 'alumni')","\\\\n\\\\n-- Create a policy to allow authenticated users to update their own files\\\\nCREATE POLICY \\"Allow authenticated users to update their own files\\"\\\\nON storage.objects\\\\nFOR UPDATE\\\\nTO authenticated\\\\nUSING (bucket_id = 'alumni' AND (storage.foldername(name))[1] = 'profile-pictures')","\\\\n\\\\n-- Create a policy to allow authenticated users to delete their own files\\\\nCREATE POLICY \\"Allow authenticated users to delete their own files\\"\\\\nON storage.objects\\\\nFOR DELETE\\\\nTO authenticated\\\\nUSING (bucket_id = 'alumni' AND (storage.foldername(name))[1] = 'profile-pictures')","\\\\n\\\\n-- Create a policy to allow public access to read files\\\\nCREATE POLICY \\"Allow public access to read files\\"\\\\nON storage.objects\\\\nFOR SELECT\\\\nTO public\\\\nUSING (bucket_id = 'alumni')",""}	quick_flame
20250222133529	{"\\\\n\\\\nALTER TABLE alumni_profiles \\\\nADD COLUMN IF NOT EXISTS phone text,\\\\nADD COLUMN IF NOT EXISTS email text,\\\\nADD COLUMN IF NOT EXISTS instagram_url text,\\\\nADD COLUMN IF NOT EXISTS facebook_url text,\\\\nADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT false",""}	long_rice
20250222134554	{"\\\\n\\\\n-- Add testimonial column if it doesn't exist\\\\nALTER TABLE alumni_profiles \\\\nADD COLUMN IF NOT EXISTS testimonial text","\\\\n\\\\n-- Create an index for faster testimonial searches\\\\nCREATE INDEX IF NOT EXISTS idx_alumni_profiles_testimonial \\\\nON alumni_profiles (testimonial)\\\\nWHERE testimonial IS NOT NULL",""}	floral_block
20250222135353	{"\\\\n\\\\n-- Add show_testimonial column if it doesn't exist\\\\nALTER TABLE alumni_profiles \\\\nADD COLUMN IF NOT EXISTS show_testimonial boolean DEFAULT true","\\\\n\\\\n-- Create an index for faster filtering of public testimonials\\\\nCREATE INDEX IF NOT EXISTS idx_alumni_profiles_show_testimonial \\\\nON alumni_profiles (show_testimonial)\\\\nWHERE show_testimonial = true",""}	peaceful_cake
20250222135607	{"\\\\n\\\\n-- Create admin_users table\\\\nCREATE TABLE IF NOT EXISTS admin_users (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id),\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\nALTER TABLE admin_users ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create featured_testimonials table\\\\nCREATE TABLE IF NOT EXISTS featured_testimonials (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  alumni_profile_id uuid REFERENCES alumni_profiles(id),\\\\n  is_visible boolean DEFAULT true,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\nALTER TABLE featured_testimonials ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create gallery_events table\\\\nCREATE TABLE IF NOT EXISTS gallery_events (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  title text NOT NULL,\\\\n  description text,\\\\n  date date NOT NULL,\\\\n  campus text NOT NULL,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\nALTER TABLE gallery_events ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create gallery_images table\\\\nCREATE TABLE IF NOT EXISTS gallery_images (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  event_id uuid REFERENCES gallery_events(id) ON DELETE CASCADE,\\\\n  image_url text NOT NULL,\\\\n  caption text,\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\nALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policies for admin users\\\\nCREATE POLICY \\"Admin users can do everything\\"\\\\n  ON admin_users\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\nCREATE POLICY \\"Admin users can manage featured testimonials\\"\\\\n  ON featured_testimonials\\\\n  TO authenticated\\\\n  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))","\\\\n\\\\nCREATE POLICY \\"Admin users can manage gallery events\\"\\\\n  ON gallery_events\\\\n  TO authenticated\\\\n  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))","\\\\n\\\\nCREATE POLICY \\"Admin users can manage gallery images\\"\\\\n  ON gallery_images\\\\n  TO authenticated\\\\n  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))","\\\\n\\\\n-- Create policies for public access\\\\nCREATE POLICY \\"Public can view featured testimonials\\"\\\\n  ON featured_testimonials\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (is_visible = true)","\\\\n\\\\nCREATE POLICY \\"Public can view gallery events\\"\\\\n  ON gallery_events\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\nCREATE POLICY \\"Public can view gallery images\\"\\\\n  ON gallery_images\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)",""}	copper_sky
20250222140339	{"\\\\n\\\\n-- First, we need to get the user ID for admin@tsh.edu.in from auth.users\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- Get the user ID\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- If user exists, add them as admin\\\\n  IF v_user_id IS NOT NULL THEN\\\\n    INSERT INTO admin_users (id)\\\\n    VALUES (v_user_id)\\\\n    ON CONFLICT (id) DO NOTHING","\\\\n  END IF","\\\\nEND $$",""}	broken_pebble
20250222140350	{"\\\\n\\\\nALTER TABLE alumni_profiles \\\\nADD COLUMN IF NOT EXISTS profile_picture_url text",""}	nameless_dawn
20250222140439	{"\\\\n\\\\n-- Create admin user in auth.users if not exists\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- First check if user already exists\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- If user doesn't exist, create them\\\\n  IF v_user_id IS NULL THEN\\\\n    v_user_id := gen_random_uuid()","\\\\n    \\\\n    INSERT INTO auth.users (\\\\n      id,\\\\n      email,\\\\n      encrypted_password,\\\\n      email_confirmed_at,\\\\n      created_at,\\\\n      updated_at,\\\\n      raw_app_meta_data,\\\\n      raw_user_meta_data,\\\\n      is_super_admin,\\\\n      role\\\\n    )\\\\n    VALUES (\\\\n      v_user_id,\\\\n      'admin@tsh.edu.in',\\\\n      -- Password is 'Admin@123'\\\\n      crypt('Admin@123', gen_salt('bf')),\\\\n      now(),\\\\n      now(),\\\\n      now(),\\\\n      '{\\"provider\\":\\"email\\",\\"providers\\":[\\"email\\"]}',\\\\n      '{}',\\\\n      false,\\\\n      'authenticated'\\\\n    )","\\\\n  END IF","\\\\n\\\\n  -- Get the user ID (whether newly created or existing)\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- Add user to admin_users table\\\\n  INSERT INTO admin_users (id)\\\\n  VALUES (v_user_id)\\\\n  ON CONFLICT (id) DO NOTHING","\\\\nEND $$",""}	dusty_spring
20250222140542	{"\\\\n\\\\n-- Enable the pgcrypto extension if not already enabled\\\\nCREATE EXTENSION IF NOT EXISTS pgcrypto","\\\\n\\\\n-- Create admin user in auth.users if not exists\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- First check if user already exists\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- If user doesn't exist, create them\\\\n  IF v_user_id IS NULL THEN\\\\n    v_user_id := gen_random_uuid()","\\\\n    \\\\n    INSERT INTO auth.users (\\\\n      instance_id,\\\\n      id,\\\\n      aud,\\\\n      role,\\\\n      email,\\\\n      encrypted_password,\\\\n      email_confirmed_at,\\\\n      invited_at,\\\\n      confirmation_token,\\\\n      confirmation_sent_at,\\\\n      recovery_token,\\\\n      recovery_sent_at,\\\\n      email_change_token_new,\\\\n      email_change,\\\\n      email_change_sent_at,\\\\n      last_sign_in_at,\\\\n      raw_app_meta_data,\\\\n      raw_user_meta_data,\\\\n      is_super_admin,\\\\n      created_at,\\\\n      updated_at,\\\\n      phone,\\\\n      phone_confirmed_at,\\\\n      phone_change,\\\\n      phone_change_token,\\\\n      phone_change_sent_at,\\\\n      confirmed_at,\\\\n      email_change_token_current,\\\\n      email_change_confirm_status,\\\\n      banned_until,\\\\n      reauthentication_token,\\\\n      reauthentication_sent_at,\\\\n      is_sso_user,\\\\n      deleted_at\\\\n    )\\\\n    VALUES (\\\\n      '00000000-0000-0000-0000-000000000000',\\\\n      v_user_id,\\\\n      'authenticated',\\\\n      'authenticated',\\\\n      'admin@tsh.edu.in',\\\\n      crypt('Admin@123', gen_salt('bf')),\\\\n      now(),\\\\n      NULL,\\\\n      '',\\\\n      NULL,\\\\n      '',\\\\n      NULL,\\\\n      '',\\\\n      '',\\\\n      NULL,\\\\n      NULL,\\\\n      '{\\"provider\\": \\"email\\", \\"providers\\": [\\"email\\"]}',\\\\n      '{}',\\\\n      FALSE,\\\\n      now(),\\\\n      now(),\\\\n      NULL,\\\\n      NULL,\\\\n      '',\\\\n      '',\\\\n      NULL,\\\\n      now(),\\\\n      '',\\\\n      0,\\\\n      NULL,\\\\n      '',\\\\n      NULL,\\\\n      FALSE,\\\\n      NULL\\\\n    )","\\\\n  END IF","\\\\n\\\\n  -- Get the user ID (whether newly created or existing)\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- Add user to admin_users table if not already present\\\\n  INSERT INTO admin_users (id)\\\\n  VALUES (v_user_id)\\\\n  ON CONFLICT (id) DO NOTHING","\\\\n\\\\nEND $$",""}	shiny_glitter
20250222140706	{"\\\\n\\\\n-- Enable the pgcrypto extension if not already enabled\\\\nCREATE EXTENSION IF NOT EXISTS pgcrypto","\\\\n\\\\n-- Create admin user in auth.users if not exists\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- First, remove existing admin user if any\\\\n  DELETE FROM admin_users WHERE id IN (\\\\n    SELECT id FROM auth.users WHERE email = 'admin@tsh.edu.in'\\\\n  )","\\\\n  \\\\n  DELETE FROM auth.users WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- Create new admin user\\\\n  v_user_id := gen_random_uuid()","\\\\n    \\\\n  INSERT INTO auth.users (\\\\n    instance_id,\\\\n    id,\\\\n    aud,\\\\n    role,\\\\n    email,\\\\n    encrypted_password,\\\\n    email_confirmed_at,\\\\n    raw_app_meta_data,\\\\n    raw_user_meta_data,\\\\n    is_super_admin,\\\\n    created_at,\\\\n    updated_at\\\\n  )\\\\n  VALUES (\\\\n    '00000000-0000-0000-0000-000000000000',\\\\n    v_user_id,\\\\n    'authenticated',\\\\n    'authenticated',\\\\n    'admin@tsh.edu.in',\\\\n    crypt('Admin@123', gen_salt('bf')),\\\\n    now(),\\\\n    '{\\"provider\\": \\"email\\", \\"providers\\": [\\"email\\"], \\"role\\": \\"admin\\"}',\\\\n    '{\\"role\\": \\"admin\\"}',\\\\n    FALSE,\\\\n    now(),\\\\n    now()\\\\n  )","\\\\n\\\\n  -- Add user to admin_users table\\\\n  INSERT INTO admin_users (id)\\\\n  VALUES (v_user_id)","\\\\n\\\\nEND $$",""}	silent_castle
20250222140745	{"\\\\n\\\\n-- Enable the pgcrypto extension if not already enabled\\\\nCREATE EXTENSION IF NOT EXISTS pgcrypto","\\\\n\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- First, remove existing admin user if any\\\\n  DELETE FROM admin_users WHERE id IN (\\\\n    SELECT id FROM auth.users WHERE email = 'admin@tsh.edu.in'\\\\n  )","\\\\n  \\\\n  DELETE FROM auth.users WHERE email = 'admin@tsh.edu.in'","\\\\n\\\\n  -- Create new admin user with minimal required fields\\\\n  INSERT INTO auth.users (\\\\n    id,\\\\n    email,\\\\n    encrypted_password,\\\\n    email_confirmed_at,\\\\n    raw_app_meta_data,\\\\n    raw_user_meta_data,\\\\n    created_at,\\\\n    updated_at,\\\\n    aud,\\\\n    role\\\\n  )\\\\n  VALUES (\\\\n    gen_random_uuid(),\\\\n    'admin@tsh.edu.in',\\\\n    crypt('Admin@123', gen_salt('bf')),\\\\n    now(),\\\\n    jsonb_build_object('provider', 'email', 'providers', array['email']),\\\\n    jsonb_build_object('role', 'admin'),\\\\n    now(),\\\\n    now(),\\\\n    'authenticated',\\\\n    'authenticated'\\\\n  )\\\\n  RETURNING id INTO v_user_id","\\\\n\\\\n  -- Add user to admin_users table\\\\n  INSERT INTO admin_users (id)\\\\n  VALUES (v_user_id)","\\\\n\\\\nEND $$",""}	turquoise_ocean
20250222140853	{"\\\\n\\\\n-- Drop existing admin_users table and related data\\\\nDROP TABLE IF EXISTS admin_users CASCADE","\\\\n\\\\n-- Create new management_users table\\\\nCREATE TABLE management_users (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id),\\\\n  role text NOT NULL DEFAULT 'manager',\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE management_users ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policy for management users\\\\nCREATE POLICY \\"Management users can access their own data\\"\\\\n  ON management_users\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\n-- Create policy for public read access to check if user is management\\\\nCREATE POLICY \\"Public can check if user is management\\"\\\\n  ON management_users\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Enable pgcrypto if not already enabled\\\\nCREATE EXTENSION IF NOT EXISTS pgcrypto","\\\\n\\\\n-- Create initial management user\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- First, clean up any existing management user\\\\n  DELETE FROM management_users WHERE id IN (\\\\n    SELECT id FROM auth.users WHERE email = 'management@scholars-home.edu.in'\\\\n  )","\\\\n  \\\\n  DELETE FROM auth.users WHERE email = 'management@scholars-home.edu.in'","\\\\n\\\\n  -- Create new management user\\\\n  INSERT INTO auth.users (\\\\n    id,\\\\n    email,\\\\n    encrypted_password,\\\\n    email_confirmed_at,\\\\n    raw_app_meta_data,\\\\n    raw_user_meta_data,\\\\n    created_at,\\\\n    updated_at,\\\\n    aud,\\\\n    role\\\\n  )\\\\n  VALUES (\\\\n    gen_random_uuid(),\\\\n    'management@scholars-home.edu.in',\\\\n    crypt('ScholarsMgmt@2025', gen_salt('bf')),\\\\n    now(),\\\\n    jsonb_build_object('provider', 'email', 'providers', array['email']),\\\\n    jsonb_build_object('role', 'management'),\\\\n    now(),\\\\n    now(),\\\\n    'authenticated',\\\\n    'authenticated'\\\\n  )\\\\n  RETURNING id INTO v_user_id","\\\\n\\\\n  -- Add user to management_users table\\\\n  INSERT INTO management_users (id, role)\\\\n  VALUES (v_user_id, 'administrator')","\\\\n\\\\nEND $$",""}	dawn_gate
20250222141123	{"\\\\n\\\\n-- Drop existing tables\\\\nDROP TABLE IF EXISTS admin_users CASCADE","\\\\nDROP TABLE IF EXISTS management_users CASCADE","\\\\n\\\\n-- Create new management_users table\\\\nCREATE TABLE management_users (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id),\\\\n  role text NOT NULL DEFAULT 'manager',\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE management_users ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policy for management users\\\\nCREATE POLICY \\"Management users can access their own data\\"\\\\n  ON management_users\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\n-- Create policy for public read access to check if user is management\\\\nCREATE POLICY \\"Public can check if user is management\\"\\\\n  ON management_users\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Create initial management user if doesn't exist\\\\nDO $$\\\\nDECLARE\\\\n  v_user_id uuid","\\\\nBEGIN\\\\n  -- Check if user already exists\\\\n  SELECT id INTO v_user_id\\\\n  FROM auth.users\\\\n  WHERE email = 'management@scholars-home.edu.in'","\\\\n\\\\n  -- Only create user if doesn't exist\\\\n  IF v_user_id IS NULL THEN\\\\n    INSERT INTO auth.users (\\\\n      id,\\\\n      email,\\\\n      encrypted_password,\\\\n      email_confirmed_at,\\\\n      raw_app_meta_data,\\\\n      raw_user_meta_data,\\\\n      created_at,\\\\n      updated_at,\\\\n      aud,\\\\n      role\\\\n    )\\\\n    VALUES (\\\\n      '00000000-0000-0000-0000-000000000001',\\\\n      'management@scholars-home.edu.in',\\\\n      crypt('ScholarsMgmt@2025', gen_salt('bf')),\\\\n      now(),\\\\n      '{\\"provider\\":\\"email\\",\\"providers\\":[\\"email\\"]}',\\\\n      '{\\"role\\":\\"management\\"}',\\\\n      now(),\\\\n      now(),\\\\n      'authenticated',\\\\n      'authenticated'\\\\n    )\\\\n    RETURNING id INTO v_user_id","\\\\n  END IF","\\\\n\\\\n  -- Add user to management_users table if not already present\\\\n  INSERT INTO management_users (id, role)\\\\n  VALUES (v_user_id, 'administrator')\\\\n  ON CONFLICT (id) DO NOTHING","\\\\nEND $$",""}	pale_disk
20250222141238	{"\\\\n\\\\n-- Drop management_users table\\\\nDROP TABLE IF EXISTS management_users CASCADE","\\\\n\\\\n-- Remove management user\\\\nDELETE FROM auth.users \\\\nWHERE email = 'management@scholars-home.edu.in'",""}	precious_reef
20250222141438	{"\\\\n\\\\n-- Create management_users table\\\\nCREATE TABLE IF NOT EXISTS management_users (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id),\\\\n  role text NOT NULL DEFAULT 'manager',\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE management_users ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policy for management users\\\\nCREATE POLICY \\"Management users can access their own data\\"\\\\n  ON management_users\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\n-- Create policy for public read access to check if user is management\\\\nCREATE POLICY \\"Public can check if user is management\\"\\\\n  ON management_users\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Create policies for management users to manage testimonials and gallery\\\\nCREATE POLICY \\"Management users can manage featured testimonials\\"\\\\n  ON featured_testimonials\\\\n  TO authenticated\\\\n  USING (EXISTS (SELECT 1 FROM management_users WHERE id = auth.uid()))","\\\\n\\\\nCREATE POLICY \\"Management users can manage gallery events\\"\\\\n  ON gallery_events\\\\n  TO authenticated\\\\n  USING (EXISTS (SELECT 1 FROM management_users WHERE id = auth.uid()))",""}	curly_credit
20250222142055	{"\\\\n\\\\n-- Drop existing policies if they exist\\\\nDO $$ \\\\nBEGIN\\\\n  -- Drop gallery_events policies\\\\n  DROP POLICY IF EXISTS \\"Management users can manage gallery events\\" ON gallery_events","\\\\n  DROP POLICY IF EXISTS \\"Public can view gallery events\\" ON gallery_events","\\\\n  \\\\n  -- Drop gallery_images policies\\\\n  DROP POLICY IF EXISTS \\"Management users can manage gallery images\\" ON gallery_images","\\\\n  DROP POLICY IF EXISTS \\"Public can view gallery images\\" ON gallery_images","\\\\nEND $$","\\\\n\\\\n-- Create policies for gallery_events\\\\nCREATE POLICY \\"Management users can manage gallery events\\"\\\\n  ON gallery_events\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\nCREATE POLICY \\"Public can view gallery events\\"\\\\n  ON gallery_events\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Create policies for gallery_images\\\\nCREATE POLICY \\"Management users can manage gallery images\\"\\\\n  ON gallery_images\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\nCREATE POLICY \\"Public can view gallery images\\"\\\\n  ON gallery_images\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Add cascade delete for gallery_images when event is deleted\\\\nALTER TABLE gallery_images\\\\nDROP CONSTRAINT IF EXISTS gallery_images_event_id_fkey,\\\\nADD CONSTRAINT gallery_images_event_id_fkey\\\\n  FOREIGN KEY (event_id)\\\\n  REFERENCES gallery_events(id)\\\\n  ON DELETE CASCADE",""}	muddy_leaf
20250222144633	{"\\\\n\\\\n-- Create leadership_messages table\\\\nCREATE TABLE IF NOT EXISTS leadership_messages (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  role text NOT NULL,\\\\n  name text NOT NULL,\\\\n  preview text NOT NULL,\\\\n  full_message text NOT NULL,\\\\n  \\"order\\" integer NOT NULL,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE leadership_messages ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policy for public read access\\\\nCREATE POLICY \\"Anyone can read leadership messages\\"\\\\n  ON leadership_messages\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Create policy for management users to manage messages\\\\nCREATE POLICY \\"Management users can manage leadership messages\\"\\\\n  ON leadership_messages\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\n-- Insert initial messages\\\\nINSERT INTO leadership_messages (role, name, preview, full_message, \\"order\\")\\\\nVALUES \\\\n  (\\\\n    'Chairperson',\\\\n    'Dr. Rajesh Kumar',\\\\n    'For over two decades, The Scholars'' Home has stood as a beacon of educational excellence...',\\\\n    E'Dear Parents and Students,\\\\\\\\n\\\\\\\\nFor over two decades, The Scholars'' Home has stood as a beacon of educational excellence, nurturing young minds and shaping future leaders. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep-rooted belief in the transformative power of education.\\\\\\\\n\\\\\\\\nIn today''s rapidly evolving world, we remain committed to providing an education that balances academic rigor with character development, technological advancement with traditional values, and individual growth with social responsibility.\\\\\\\\n\\\\\\\\nTogether, let us continue to build a brighter future for our children.',\\\\n    1\\\\n  ),\\\\n  (\\\\n    'Managing Director',\\\\n    'Mrs. Priya Sharma',\\\\n    'Our institution''s success story is built on the foundation of innovation, excellence...',\\\\n    E'Welcome to The Scholars'' Home family,\\\\\\\\n\\\\\\\\nOur institution''s success story is built on the foundation of innovation, excellence, and a student-first approach. We believe in creating an environment where every child can discover their potential and pursue their passions.\\\\\\\\n\\\\\\\\nThrough our comprehensive curriculum, state-of-the-art facilities, and dedicated faculty, we ensure that our students receive an education that prepares them not just for examinations, but for life itself.\\\\\\\\n\\\\\\\\nWe invite you to be part of this transformative journey.',\\\\n    2\\\\n  ),\\\\n  (\\\\n    'Director',\\\\n    'Dr. Amit Verma',\\\\n    'Education at The Scholars'' Home goes beyond textbooks and classrooms...',\\\\n    E'Dear Students and Parents,\\\\\\\\n\\\\\\\\nEducation at The Scholars'' Home goes beyond textbooks and classrooms. We focus on creating an environment where learning is engaging, meaningful, and connected to real-world applications.\\\\\\\\n\\\\\\\\nOur dedicated team of educators works tirelessly to ensure that every student receives personalized attention and guidance. We believe in nurturing not just academic excellence, but also creativity, critical thinking, and leadership skills.\\\\\\\\n\\\\\\\\nTogether, we are building a community of lifelong learners and future leaders.',\\\\n    3\\\\n  )",""}	precious_shape
20250222161540	{"\\\\n\\\\n-- Create events table\\\\nCREATE TABLE IF NOT EXISTS events (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  title text NOT NULL,\\\\n  date date NOT NULL,\\\\n  time text NOT NULL,\\\\n  location text NOT NULL,\\\\n  description text NOT NULL,\\\\n  cover_image text NOT NULL,\\\\n  max_capacity integer,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create event_rsvps table\\\\nCREATE TABLE IF NOT EXISTS event_rsvps (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  event_id uuid REFERENCES events(id) ON DELETE CASCADE,\\\\n  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,\\\\n  status text NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),\\\\n  guests integer NOT NULL DEFAULT 1,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  UNIQUE(event_id, user_id)\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE events ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Policies for events table\\\\nCREATE POLICY \\"Anyone can read events\\"\\\\n  ON events\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\nCREATE POLICY \\"Management users can manage events\\"\\\\n  ON events\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\n-- Policies for event_rsvps table\\\\nCREATE POLICY \\"Anyone can view RSVP counts\\"\\\\n  ON event_rsvps\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\nCREATE POLICY \\"Users can manage their own RSVPs\\"\\\\n  ON event_rsvps\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (user_id = auth.uid())","\\\\n\\\\n-- Create function to get RSVP count\\\\nCREATE OR REPLACE FUNCTION get_event_rsvp_count(event_id uuid)\\\\nRETURNS integer\\\\nLANGUAGE plpgsql\\\\nAS $$\\\\nBEGIN\\\\n  RETURN (\\\\n    SELECT COALESCE(SUM(guests), 0)\\\\n    FROM event_rsvps\\\\n    WHERE event_id = $1\\\\n    AND status = 'attending'\\\\n  )","\\\\nEND","\\\\n$$","\\\\n\\\\n-- Add trigger to update updated_at on events\\\\nCREATE OR REPLACE FUNCTION update_updated_at_column()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  NEW.updated_at = now()","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ language 'plpgsql'","\\\\n\\\\nCREATE TRIGGER update_events_updated_at\\\\n  BEFORE UPDATE ON events\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION update_updated_at_column()",""}	round_reef
20250222162142	{"-- Create function to validate max guests\\\\nCREATE OR REPLACE FUNCTION check_max_guests()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  IF EXISTS (\\\\n    SELECT 1 FROM events e\\\\n    WHERE e.id = NEW.event_id\\\\n    AND NEW.guests > e.max_guests_per_rsvp\\\\n  ) THEN\\\\n    RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create function to validate admission number\\\\nCREATE OR REPLACE FUNCTION check_admission_number()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  IF EXISTS (\\\\n    SELECT 1 FROM events e\\\\n    WHERE e.id = NEW.event_id\\\\n    AND e.requires_admission_number = true\\\\n    AND NEW.admission_number IS NULL\\\\n  ) THEN\\\\n    RAISE EXCEPTION 'Admission number is required for this event'","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Add columns to events table\\\\nALTER TABLE events\\\\nADD COLUMN max_guests_per_rsvp integer NOT NULL DEFAULT 4,\\\\nADD COLUMN requires_admission_number boolean NOT NULL DEFAULT false","\\\\n\\\\n-- Add columns to event_rsvps table\\\\nALTER TABLE event_rsvps\\\\nADD COLUMN admission_number text,\\\\nADD COLUMN max_guests_per_rsvp integer","\\\\n\\\\n-- Create triggers for validation\\\\nCREATE TRIGGER validate_max_guests\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION check_max_guests()","\\\\n\\\\nCREATE TRIGGER validate_admission_number\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION check_admission_number()",""}	black_bird
20250222162240	{"-- Create events table if not exists\\\\nCREATE TABLE IF NOT EXISTS events (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  title text NOT NULL,\\\\n  date date NOT NULL,\\\\n  time text NOT NULL,\\\\n  location text NOT NULL,\\\\n  description text NOT NULL,\\\\n  cover_image text NOT NULL,\\\\n  max_capacity integer,\\\\n  max_guests_per_rsvp integer NOT NULL DEFAULT 4,\\\\n  requires_admission_number boolean NOT NULL DEFAULT false,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create event_rsvps table if not exists\\\\nCREATE TABLE IF NOT EXISTS event_rsvps (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  event_id uuid REFERENCES events(id) ON DELETE CASCADE,\\\\n  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,\\\\n  status text NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),\\\\n  guests integer NOT NULL DEFAULT 1,\\\\n  admission_number text,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now(),\\\\n  UNIQUE(event_id, user_id)\\\\n)","\\\\n\\\\n-- Create function to validate guests against max_guests_per_rsvp\\\\nCREATE OR REPLACE FUNCTION validate_rsvp_guests()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- Check if guests exceed max_guests_per_rsvp\\\\n  IF NEW.guests > (SELECT max_guests_per_rsvp FROM events WHERE id = NEW.event_id) THEN\\\\n    RAISE EXCEPTION 'Number of guests cannot exceed maximum allowed per RSVP'","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create function to validate admission number requirement\\\\nCREATE OR REPLACE FUNCTION validate_admission_number()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- Check if admission number is required and provided\\\\n  IF (SELECT requires_admission_number FROM events WHERE id = NEW.event_id) \\\\n     AND NEW.admission_number IS NULL THEN\\\\n    RAISE EXCEPTION 'Admission number is required for this event'","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create triggers to enforce constraints\\\\nDROP TRIGGER IF EXISTS check_rsvp_guests ON event_rsvps","\\\\nCREATE TRIGGER check_rsvp_guests\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp_guests()","\\\\n\\\\nDROP TRIGGER IF EXISTS check_admission_number ON event_rsvps","\\\\nCREATE TRIGGER check_admission_number\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_admission_number()","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE events ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Drop existing policies if they exist\\\\nDROP POLICY IF EXISTS \\"Anyone can view events\\" ON events","\\\\nDROP POLICY IF EXISTS \\"Management users can manage events\\" ON events","\\\\nDROP POLICY IF EXISTS \\"Anyone can view RSVP counts\\" ON event_rsvps","\\\\nDROP POLICY IF EXISTS \\"Users can manage their own RSVPs\\" ON event_rsvps","\\\\n\\\\n-- Create policies for events\\\\nCREATE POLICY \\"Anyone can view events\\"\\\\n  ON events\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\nCREATE POLICY \\"Management users can manage events\\"\\\\n  ON events\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\n-- Create policies for RSVPs\\\\nCREATE POLICY \\"Anyone can view RSVP counts\\"\\\\n  ON event_rsvps\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\nCREATE POLICY \\"Users can manage their own RSVPs\\"\\\\n  ON event_rsvps\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (user_id = auth.uid())",""}	round_cave
20250222162923	{"\\\\n\\\\n-- Create students table\\\\nCREATE TABLE IF NOT EXISTS students (\\\\n  admission_number text PRIMARY KEY,\\\\n  full_name text NOT NULL,\\\\n  class text,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE students ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Create policies\\\\nCREATE POLICY \\"Management users can manage students\\"\\\\n  ON students\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\nCREATE POLICY \\"Anyone can verify admission numbers\\"\\\\n  ON students\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Create function to verify admission number\\\\nCREATE OR REPLACE FUNCTION verify_admission_number(admission_number text)\\\\nRETURNS boolean\\\\nLANGUAGE plpgsql\\\\nAS $$\\\\nBEGIN\\\\n  RETURN EXISTS (\\\\n    SELECT 1 FROM students \\\\n    WHERE students.admission_number = verify_admission_number.admission_number\\\\n  )","\\\\nEND","\\\\n$$",""}	lingering_cherry
20250222163612	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS check_admission_number ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_admission_number()","\\\\n\\\\n-- Create improved admission number validation function\\\\nCREATE OR REPLACE FUNCTION validate_admission_number()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- Only validate if event requires admission number and status is 'attending'\\\\n  IF (SELECT requires_admission_number FROM events WHERE id = NEW.event_id) \\\\n     AND NEW.status = 'attending' THEN\\\\n    -- Check if admission number is provided\\\\n    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n      RAISE EXCEPTION 'Admission number is required for this event'","\\\\n    END IF","\\\\n    \\\\n    -- Verify admission number exists in students table\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM students \\\\n      WHERE admission_number = NEW.admission_number\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Invalid admission number'","\\\\n    END IF","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create new trigger with improved validation\\\\nCREATE TRIGGER check_admission_number\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_admission_number()","\\\\n\\\\n-- Add index for faster admission number lookups\\\\nCREATE INDEX IF NOT EXISTS idx_students_admission_number \\\\nON students(admission_number)",""}	still_fountain
20250222205131	{"-- Add photo_url column to leadership_messages table\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN photo_url text",""}	cool_meadow
20250223102007	{"-- Add campus column to leadership_messages table\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN IF NOT EXISTS campus text DEFAULT 'all'","\\\\n\\\\n-- Create index for faster campus filtering\\\\nCREATE INDEX IF NOT EXISTS idx_leadership_messages_campus \\\\nON leadership_messages(campus)","\\\\n\\\\n-- Update existing messages to have 'all' as campus\\\\nUPDATE leadership_messages\\\\nSET campus = 'all'\\\\nWHERE campus IS NULL",""}	nameless_scene
20250223124602	{"-- Add campus column to leadership_messages table\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN IF NOT EXISTS campus text DEFAULT 'all'","\\\\n\\\\n-- Create index for faster campus filtering\\\\nCREATE INDEX IF NOT EXISTS idx_leadership_messages_campus \\\\nON leadership_messages(campus)","\\\\n\\\\n-- Update existing messages to have 'all' as campus\\\\nUPDATE leadership_messages\\\\nSET campus = 'all'\\\\nWHERE campus IS NULL",""}	cold_wildflower
20250223124922	{"-- Add campus column to leadership_messages table\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN IF NOT EXISTS campus text DEFAULT 'all'","\\\\n\\\\n-- Create index for faster campus filtering\\\\nCREATE INDEX IF NOT EXISTS idx_leadership_messages_campus \\\\nON leadership_messages(campus)","\\\\n\\\\n-- Update existing messages to have 'all' as campus\\\\nUPDATE leadership_messages\\\\nSET campus = 'all'\\\\nWHERE campus IS NULL",""}	fierce_harbor
20250223125945	{"-- Add display_locations column to leadership_messages table\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN IF NOT EXISTS display_locations text[] DEFAULT ARRAY['all']","\\\\n\\\\n-- Create index for faster display_locations filtering\\\\nCREATE INDEX IF NOT EXISTS idx_leadership_messages_display_locations \\\\nON leadership_messages USING GIN (display_locations)","\\\\n\\\\n-- Update existing messages to have 'all' as display location\\\\nUPDATE leadership_messages\\\\nSET display_locations = ARRAY['all']\\\\nWHERE display_locations IS NULL","\\\\n\\\\n-- Add constraint to ensure display_locations is not empty\\\\nALTER TABLE leadership_messages\\\\nADD CONSTRAINT display_locations_not_empty \\\\nCHECK (array_length(display_locations, 1) > 0)","\\\\n\\\\n-- Add constraint to ensure valid display locations\\\\nALTER TABLE leadership_messages\\\\nADD CONSTRAINT valid_display_locations \\\\nCHECK (\\\\n  display_locations <@ ARRAY[\\\\n    'all',\\\\n    'homepage',\\\\n    'leadership',\\\\n    'paonta-sahib',\\\\n    'juniors',\\\\n    'majra'\\\\n  ]::text[]\\\\n)",""}	dry_coast
20250223130045	{"-- Add display_locations column to leadership_messages table with improved validation\\\\nALTER TABLE leadership_messages\\\\nADD COLUMN IF NOT EXISTS display_locations text[] DEFAULT ARRAY['all']","\\\\n\\\\n-- Create index for faster display_locations filtering\\\\nCREATE INDEX IF NOT EXISTS idx_leadership_messages_display_locations \\\\nON leadership_messages USING GIN (display_locations)","\\\\n\\\\n-- Update existing messages to have 'all' as display location\\\\nUPDATE leadership_messages\\\\nSET display_locations = ARRAY['all']\\\\nWHERE display_locations IS NULL","\\\\n\\\\n-- Drop existing constraints if they exist\\\\nALTER TABLE leadership_messages\\\\nDROP CONSTRAINT IF EXISTS display_locations_not_empty,\\\\nDROP CONSTRAINT IF EXISTS valid_display_locations","\\\\n\\\\n-- Add improved constraints\\\\nALTER TABLE leadership_messages\\\\nADD CONSTRAINT display_locations_not_empty \\\\nCHECK (array_length(display_locations, 1) > 0),\\\\nADD CONSTRAINT valid_display_locations \\\\nCHECK (\\\\n  display_locations <@ ARRAY[\\\\n    'all',\\\\n    'homepage',\\\\n    'leadership',\\\\n    'paonta-sahib',\\\\n    'juniors',\\\\n    'majra'\\\\n  ]::text[]\\\\n)","\\\\n\\\\n-- Create function to validate display locations\\\\nCREATE OR REPLACE FUNCTION validate_display_locations()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- If array contains 'all', it should be the only value\\\\n  IF 'all' = ANY(NEW.display_locations) AND array_length(NEW.display_locations, 1) > 1 THEN\\\\n    RAISE EXCEPTION 'When \\"all\\" is selected, no other locations should be specified'","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for display locations validation\\\\nDROP TRIGGER IF EXISTS check_display_locations ON leadership_messages","\\\\nCREATE TRIGGER check_display_locations\\\\n  BEFORE INSERT OR UPDATE ON leadership_messages\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_display_locations()",""}	aged_swamp
20250226190704	{"-- Add primary_image_id column to gallery_events table\\\\nALTER TABLE gallery_events\\\\nADD COLUMN primary_image_id uuid REFERENCES gallery_images(id) ON DELETE SET NULL","\\\\n\\\\n-- Create index for faster lookups\\\\nCREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image \\\\nON gallery_events(primary_image_id)","\\\\n\\\\n-- Create function to validate primary image belongs to event\\\\nCREATE OR REPLACE FUNCTION validate_primary_image()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  IF NEW.primary_image_id IS NOT NULL THEN\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM gallery_images \\\\n      WHERE id = NEW.primary_image_id \\\\n      AND event_id = NEW.id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Primary image must belong to this event'","\\\\n    END IF","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for primary image validation\\\\nCREATE TRIGGER check_primary_image\\\\n  BEFORE INSERT OR UPDATE ON gallery_events\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_primary_image()",""}	rough_feather
20250226191241	{"\\\\n\\\\n-- Check if column exists before adding\\\\nDO $$ \\\\nBEGIN\\\\n  IF NOT EXISTS (\\\\n    SELECT 1 \\\\n    FROM information_schema.columns \\\\n    WHERE table_name = 'gallery_events' \\\\n    AND column_name = 'primary_image_id'\\\\n  ) THEN\\\\n    -- Add primary_image_id column\\\\n    ALTER TABLE gallery_events\\\\n    ADD COLUMN primary_image_id uuid REFERENCES gallery_images(id) ON DELETE SET NULL","\\\\n  END IF","\\\\nEND $$","\\\\n\\\\n-- Create index for faster lookups if not exists\\\\nCREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image \\\\nON gallery_events(primary_image_id)","\\\\n\\\\n-- Create or replace function to validate primary image belongs to event\\\\nCREATE OR REPLACE FUNCTION validate_primary_image()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  IF NEW.primary_image_id IS NOT NULL THEN\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM gallery_images \\\\n      WHERE id = NEW.primary_image_id \\\\n      AND event_id = NEW.id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Primary image must belong to this event'","\\\\n    END IF","\\\\n  END IF","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Drop trigger if exists and recreate\\\\nDROP TRIGGER IF EXISTS check_primary_image ON gallery_events","\\\\nCREATE TRIGGER check_primary_image\\\\n  BEFORE INSERT OR UPDATE ON gallery_events\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_primary_image()",""}	quick_palace
20250226192101	{"-- Add primary_image_url column to gallery_events table\\\\nALTER TABLE gallery_events\\\\nADD COLUMN IF NOT EXISTS primary_image_url text","\\\\n\\\\n-- Create index for faster lookups\\\\nCREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image_url \\\\nON gallery_events(primary_image_url)\\\\nWHERE primary_image_url IS NOT NULL","\\\\n\\\\n-- Update function to handle primary_image_url\\\\nCREATE OR REPLACE FUNCTION validate_primary_image()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- If primary_image_id is set, validate it belongs to the event\\\\n  IF NEW.primary_image_id IS NOT NULL THEN\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM gallery_images \\\\n      WHERE id = NEW.primary_image_id \\\\n      AND event_id = NEW.id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Primary image must belong to this event'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  -- Clear primary_image_id if primary_image_url is set and vice versa\\\\n  IF NEW.primary_image_url IS NOT NULL THEN\\\\n    NEW.primary_image_id = NULL","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql",""}	foggy_wildflower
20250226194408	{"-- Add accepting_rsvps column to events table\\\\nALTER TABLE events \\\\nADD COLUMN IF NOT EXISTS accepting_rsvps boolean NOT NULL DEFAULT true","\\\\n\\\\n-- Create index for faster filtering\\\\nCREATE INDEX IF NOT EXISTS idx_events_accepting_rsvps \\\\nON events(accepting_rsvps)","\\\\n\\\\n-- Update existing events to accept RSVPs by default\\\\nUPDATE events \\\\nSET accepting_rsvps = true \\\\nWHERE accepting_rsvps IS NULL",""}	stark_gate
20250226200016	{"-- Add foreign key relationship between event_rsvps and students\\\\nALTER TABLE event_rsvps\\\\nADD CONSTRAINT event_rsvps_admission_number_fkey\\\\nFOREIGN KEY (admission_number)\\\\nREFERENCES students(admission_number)\\\\nON DELETE SET NULL","\\\\n\\\\n-- Create index for faster lookups\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_admission_number\\\\nON event_rsvps(admission_number)","\\\\n\\\\n-- Update the download RSVPs function to handle the relationship properly\\\\nCREATE OR REPLACE FUNCTION get_event_rsvps(event_id uuid)\\\\nRETURNS TABLE (\\\\n  admission_number text,\\\\n  student_name text,\\\\n  student_class text,\\\\n  guests integer,\\\\n  created_at timestamptz\\\\n) AS $$\\\\nBEGIN\\\\n  RETURN QUERY\\\\n  SELECT \\\\n    er.admission_number,\\\\n    s.full_name as student_name,\\\\n    s.class as student_class,\\\\n    er.guests,\\\\n    er.created_at\\\\n  FROM event_rsvps er\\\\n  LEFT JOIN students s ON er.admission_number = s.admission_number\\\\n  WHERE er.event_id = $1\\\\n  AND er.status = 'attending'\\\\n  ORDER BY er.created_at","\\\\nEND","\\\\n$$ LANGUAGE plpgsql",""}	silent_star
20250226200634	{"\\\\n\\\\n-- Add updated_at column to event_rsvps table\\\\nALTER TABLE event_rsvps\\\\nADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now()","\\\\n\\\\n-- Create trigger to automatically update updated_at\\\\nCREATE OR REPLACE FUNCTION update_event_rsvps_updated_at()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  NEW.updated_at = now()","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\nCREATE TRIGGER update_event_rsvps_updated_at\\\\n  BEFORE UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION update_event_rsvps_updated_at()","\\\\n\\\\n-- Drop existing function before redefining\\\\nDROP FUNCTION IF EXISTS get_event_rsvps(uuid)","\\\\n\\\\n-- Create new get_event_rsvps function with updated return type\\\\nCREATE OR REPLACE FUNCTION get_event_rsvps(event_id uuid)\\\\nRETURNS TABLE (\\\\n  admission_number text,\\\\n  student_name text,\\\\n  student_class text,\\\\n  guests integer,\\\\n  created_at timestamptz,\\\\n  updated_at timestamptz\\\\n) AS $$\\\\nBEGIN\\\\n  RETURN QUERY\\\\n  SELECT \\\\n    er.admission_number,\\\\n    s.full_name as student_name,\\\\n    s.class as student_class,\\\\n    er.guests,\\\\n    er.created_at,\\\\n    er.updated_at\\\\n  FROM event_rsvps er\\\\n  LEFT JOIN students s ON er.admission_number = s.admission_number\\\\n  WHERE er.event_id = $1\\\\n  AND er.status = 'attending'\\\\n  ORDER BY er.created_at","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Add index for faster sorting\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_updated_at\\\\nON event_rsvps(updated_at)",""}	lively_queen
20250226200813	{"\\\\n\\\\n-- Drop existing policies\\\\nDROP POLICY IF EXISTS \\"Anyone can view RSVP counts\\" ON event_rsvps","\\\\nDROP POLICY IF EXISTS \\"Users can manage their own RSVPs\\" ON event_rsvps","\\\\n\\\\n-- Create new policies\\\\n\\\\n-- Allow public to view RSVP counts\\\\nCREATE POLICY \\"Anyone can view RSVP counts\\"\\\\n  ON event_rsvps\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Allow anonymous users to create RSVPs\\\\nCREATE POLICY \\"Anonymous users can create RSVPs\\"\\\\n  ON event_rsvps\\\\n  FOR INSERT\\\\n  TO public\\\\n  WITH CHECK (\\\\n    -- Only allow RSVPs for events that are accepting them\\\\n    EXISTS (\\\\n      SELECT 1 FROM events \\\\n      WHERE id = event_id \\\\n      AND accepting_rsvps = true\\\\n    )\\\\n  )","\\\\n\\\\n-- Allow authenticated users to manage their RSVPs\\\\nCREATE POLICY \\"Authenticated users can manage their RSVPs\\"\\\\n  ON event_rsvps\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (\\\\n    -- Can manage their own RSVPs\\\\n    user_id = auth.uid()\\\\n    -- Management users can manage all RSVPs\\\\n    OR EXISTS (\\\\n      SELECT 1 FROM management_users \\\\n      WHERE id = auth.uid()\\\\n    )\\\\n  )\\\\n  WITH CHECK (\\\\n    -- Can only create/update RSVPs for events that are accepting them\\\\n    EXISTS (\\\\n      SELECT 1 FROM events \\\\n      WHERE id = event_id \\\\n      AND accepting_rsvps = true\\\\n    )\\\\n    -- And must be their own RSVP or be a management user\\\\n    AND (\\\\n      user_id = auth.uid()\\\\n      OR EXISTS (\\\\n        SELECT 1 FROM management_users \\\\n        WHERE id = auth.uid()\\\\n      )\\\\n    )\\\\n  )",""}	jolly_morning
20250226201008	{"\\\\n\\\\n-- Drop existing function if it exists\\\\nDROP FUNCTION IF EXISTS get_event_total_guests(uuid)","\\\\n\\\\n-- Create function to get total guests count\\\\nCREATE OR REPLACE FUNCTION get_event_total_guests(event_id uuid)\\\\nRETURNS integer AS $$\\\\nBEGIN\\\\n  RETURN (\\\\n    SELECT COALESCE(SUM(guests), 0)\\\\n    FROM event_rsvps\\\\n    WHERE event_id = $1\\\\n    AND status = 'attending'\\\\n  )","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create index for faster guest counting\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_guests\\\\nON event_rsvps(event_id, status, guests)\\\\nWHERE status = 'attending'","\\\\n\\\\n-- Update admission number validation function\\\\nCREATE OR REPLACE FUNCTION validate_admission_number()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- Always require admission number verification\\\\n  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n    RAISE EXCEPTION 'Student admission number is required'","\\\\n  END IF","\\\\n    \\\\n  -- Verify admission number exists in students table\\\\n  IF NOT EXISTS (\\\\n    SELECT 1 FROM students \\\\n    WHERE admission_number = NEW.admission_number\\\\n  ) THEN\\\\n    RAISE EXCEPTION 'Invalid admission number'","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Drop existing trigger\\\\nDROP TRIGGER IF EXISTS check_admission_number ON event_rsvps","\\\\n\\\\n-- Create new trigger that runs for all RSVPs\\\\nCREATE TRIGGER check_admission_number\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_admission_number()",""}	humble_ember
20250226201150	{"-- Drop existing function if it exists\\\\nDROP FUNCTION IF EXISTS get_event_total_guests(uuid)","\\\\n\\\\n-- Create function to get total guests count with explicit parameter name\\\\nCREATE OR REPLACE FUNCTION get_event_total_guests(p_event_id uuid)\\\\nRETURNS integer AS $$\\\\nBEGIN\\\\n  RETURN (\\\\n    SELECT COALESCE(SUM(guests), 0)\\\\n    FROM event_rsvps\\\\n    WHERE event_id = p_event_id\\\\n    AND status = 'attending'\\\\n  )","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create index for faster guest counting if it doesn't exist\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_guests\\\\nON event_rsvps(event_id, status, guests)\\\\nWHERE status = 'attending'",""}	quiet_summit
20250226201928	{"\\\\n\\\\n-- First, delete duplicate RSVPs keeping only the most recent one\\\\nWITH duplicates AS (\\\\n  SELECT DISTINCT ON (event_id, admission_number) \\\\n    id,\\\\n    event_id,\\\\n    admission_number,\\\\n    created_at\\\\n  FROM event_rsvps\\\\n  WHERE admission_number IS NOT NULL\\\\n  ORDER BY event_id, admission_number, created_at DESC\\\\n)\\\\nDELETE FROM event_rsvps e\\\\nUSING (\\\\n  SELECT er.id\\\\n  FROM event_rsvps er\\\\n  LEFT JOIN duplicates d ON d.id = er.id\\\\n  WHERE er.admission_number IS NOT NULL\\\\n  AND d.id IS NULL\\\\n) AS to_delete\\\\nWHERE e.id = to_delete.id","\\\\n\\\\n-- Now we can safely add the unique constraint\\\\nALTER TABLE event_rsvps\\\\nDROP CONSTRAINT IF EXISTS unique_admission_number_per_event","\\\\n\\\\nALTER TABLE event_rsvps\\\\nADD CONSTRAINT unique_admission_number_per_event \\\\nUNIQUE NULLS NOT DISTINCT (event_id, admission_number)","\\\\n\\\\n-- Update validation function to check for existing RSVPs\\\\nCREATE OR REPLACE FUNCTION validate_admission_number()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- Always require admission number verification\\\\n  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n    RAISE EXCEPTION 'Student admission number is required'","\\\\n  END IF","\\\\n    \\\\n  -- Verify admission number exists in students table\\\\n  IF NOT EXISTS (\\\\n    SELECT 1 FROM students \\\\n    WHERE admission_number = NEW.admission_number\\\\n  ) THEN\\\\n    RAISE EXCEPTION 'Invalid admission number'","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql",""}	floral_breeze
20250226202009	{"\\\\n\\\\n-- Create function to validate RSVP status changes\\\\nCREATE OR REPLACE FUNCTION validate_rsvp_status_change()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- If this is an update and status is changing\\\\n  IF TG_OP = 'UPDATE' AND NEW.status != OLD.status THEN\\\\n    -- Always allow changing from 'attending' to 'not_attending'\\\\n    IF OLD.status = 'attending' AND NEW.status = 'not_attending' THEN\\\\n      RETURN NEW","\\\\n    END IF","\\\\n\\\\n    -- For all other status changes, verify admission number\\\\n    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n      RAISE EXCEPTION 'Student admission number is required'","\\\\n    END IF","\\\\n    \\\\n    -- Verify admission number exists in students table\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM students \\\\n      WHERE admission_number = NEW.admission_number\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Invalid admission number'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for status change validation\\\\nDROP TRIGGER IF EXISTS check_rsvp_status_change ON event_rsvps","\\\\nCREATE TRIGGER check_rsvp_status_change\\\\n  BEFORE UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp_status_change()","\\\\n\\\\n-- Update existing RSVPs to ensure data consistency\\\\nUPDATE event_rsvps\\\\nSET guests = 1\\\\nWHERE status = 'not_attending'",""}	pink_fountain
20250226202044	{"\\\\n\\\\n-- Create function to validate RSVP status changes\\\\nCREATE OR REPLACE FUNCTION validate_rsvp_status_change()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  -- If this is an update and status is changing\\\\n  IF TG_OP = 'UPDATE' AND NEW.status != OLD.status THEN\\\\n    -- Always allow changing from 'attending' to 'not_attending'\\\\n    IF OLD.status = 'attending' AND NEW.status = 'not_attending' THEN\\\\n      RETURN NEW","\\\\n    END IF","\\\\n\\\\n    -- For all other status changes, verify admission number\\\\n    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n      RAISE EXCEPTION 'Student admission number is required'","\\\\n    END IF","\\\\n    \\\\n    -- Verify admission number exists in students table\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM students \\\\n      WHERE admission_number = NEW.admission_number\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Invalid admission number'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for status change validation\\\\nDROP TRIGGER IF EXISTS check_rsvp_status_change ON event_rsvps","\\\\nCREATE TRIGGER check_rsvp_status_change\\\\n  BEFORE UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp_status_change()","\\\\n\\\\n-- Update existing RSVPs to ensure data consistency\\\\nUPDATE event_rsvps\\\\nSET guests = 1\\\\nWHERE status = 'not_attending'",""}	sweet_snow
20250226202712	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS check_admission_number ON event_rsvps","\\\\nDROP TRIGGER IF EXISTS check_rsvp_status_change ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_admission_number()","\\\\nDROP FUNCTION IF EXISTS validate_rsvp_status_change()","\\\\n\\\\n-- Create function to get total guests for an event\\\\nCREATE OR REPLACE FUNCTION get_event_total_guests(p_event_id uuid)\\\\nRETURNS integer AS $$\\\\nBEGIN\\\\n  RETURN (\\\\n    SELECT COALESCE(SUM(guests), 0)\\\\n    FROM event_rsvps\\\\n    WHERE event_id = p_event_id\\\\n    AND status = 'attending'\\\\n  )","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create comprehensive RSVP validation function\\\\nCREATE OR REPLACE FUNCTION validate_rsvp()\\\\nRETURNS TRIGGER AS $$\\\\nDECLARE\\\\n  v_event_accepts_rsvps boolean","\\\\nBEGIN\\\\n  -- Check if event is accepting RSVPs\\\\n  SELECT accepting_rsvps INTO v_event_accepts_rsvps\\\\n  FROM events\\\\n  WHERE id = NEW.event_id","\\\\n\\\\n  IF NOT v_event_accepts_rsvps THEN\\\\n    RAISE EXCEPTION 'This event is no longer accepting RSVPs'","\\\\n  END IF","\\\\n\\\\n  -- For new RSVPs or status changes to 'attending'\\\\n  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.status = 'attending')) THEN\\\\n    -- Verify admission number\\\\n    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n      RAISE EXCEPTION 'Student admission number is required'","\\\\n    END IF","\\\\n    \\\\n    -- Verify admission number exists in students table\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM students \\\\n      WHERE admission_number = NEW.admission_number\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Invalid admission number'","\\\\n    END IF","\\\\n\\\\n    -- Check for existing RSVPs with this admission number\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM event_rsvps\\\\n      WHERE event_id = NEW.event_id\\\\n      AND admission_number = NEW.admission_number\\\\n      AND status = 'attending'\\\\n      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'This student has already RSVP''d for this event'","\\\\n    END IF","\\\\n\\\\n    -- Check max guests per RSVP\\\\n    IF NEW.guests > (\\\\n      SELECT max_guests_per_rsvp \\\\n      FROM events \\\\n      WHERE id = NEW.event_id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n    END IF","\\\\n\\\\n    -- Check event capacity if set\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM events e\\\\n      WHERE e.id = NEW.event_id\\\\n      AND e.max_capacity IS NOT NULL\\\\n      AND (\\\\n        SELECT COALESCE(SUM(guests), 0)\\\\n        FROM event_rsvps\\\\n        WHERE event_id = e.id\\\\n        AND status = 'attending'\\\\n        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n      ) + NEW.guests > e.max_capacity\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Event has reached maximum capacity'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  -- For status changes from 'attending' to 'not_attending'\\\\n  IF TG_OP = 'UPDATE' AND OLD.status = 'attending' AND NEW.status = 'not_attending' THEN\\\\n    -- Keep the admission number but set guests to 1\\\\n    NEW.guests := 1","\\\\n    -- Keep the existing admission number\\\\n    NEW.admission_number := OLD.admission_number","\\\\n  END IF","\\\\n\\\\n  -- For all other cases\\\\n  IF NEW.status = 'not_attending' THEN\\\\n    -- Always set guests to 1 for non-attending RSVPs\\\\n    NEW.guests := 1","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for RSVP validation\\\\nDROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps","\\\\nCREATE TRIGGER validate_rsvp\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp()","\\\\n\\\\n-- Create index for faster guest counting\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_guests\\\\nON event_rsvps(event_id, status, guests)","\\\\n\\\\n-- Create index for faster admission number lookups\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_admission_number\\\\nON event_rsvps(event_id, admission_number)\\\\nWHERE admission_number IS NOT NULL","\\\\n\\\\n-- Create index for faster status filtering\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_status\\\\nON event_rsvps(event_id, status)","\\\\n\\\\n-- Create partial index for attending RSVPs\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_attending\\\\nON event_rsvps(event_id, admission_number)\\\\nWHERE status = 'attending'","\\\\n\\\\n-- Create function to check if student can RSVP\\\\nCREATE OR REPLACE FUNCTION can_student_rsvp(\\\\n  p_event_id uuid,\\\\n  p_admission_number text,\\\\n  p_current_rsvp_id uuid DEFAULT NULL\\\\n)\\\\nRETURNS boolean AS $$\\\\nBEGIN\\\\n  RETURN NOT EXISTS (\\\\n    SELECT 1 \\\\n    FROM event_rsvps\\\\n    WHERE event_id = p_event_id\\\\n    AND admission_number = p_admission_number\\\\n    AND status = 'attending'\\\\n    AND id != COALESCE(p_current_rsvp_id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n  )","\\\\nEND","\\\\n$$ LANGUAGE plpgsql",""}	dry_union
20250226203658	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_rsvp()","\\\\n\\\\n-- Create comprehensive RSVP validation function\\\\nCREATE OR REPLACE FUNCTION validate_rsvp()\\\\nRETURNS TRIGGER AS $$\\\\nDECLARE\\\\n  v_event_accepts_rsvps boolean","\\\\nBEGIN\\\\n  -- Check if event is accepting RSVPs\\\\n  SELECT accepting_rsvps INTO v_event_accepts_rsvps\\\\n  FROM events\\\\n  WHERE id = NEW.event_id","\\\\n\\\\n  IF NOT v_event_accepts_rsvps THEN\\\\n    RAISE EXCEPTION 'This event is no longer accepting RSVPs'","\\\\n  END IF","\\\\n\\\\n  -- For new RSVPs or status changes\\\\n  IF TG_OP = 'INSERT' OR NEW.status != OLD.status THEN\\\\n    -- Always require admission number for any status\\\\n    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n      RAISE EXCEPTION 'Student admission number is required'","\\\\n    END IF","\\\\n    \\\\n    -- Verify admission number exists in students table\\\\n    IF NOT EXISTS (\\\\n      SELECT 1 FROM students \\\\n      WHERE admission_number = NEW.admission_number\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Invalid admission number'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  -- For attending status\\\\n  IF NEW.status = 'attending' THEN\\\\n    -- Check max guests per RSVP\\\\n    IF NEW.guests > (\\\\n      SELECT max_guests_per_rsvp \\\\n      FROM events \\\\n      WHERE id = NEW.event_id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n    END IF","\\\\n\\\\n    -- Check event capacity if set\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM events e\\\\n      WHERE e.id = NEW.event_id\\\\n      AND e.max_capacity IS NOT NULL\\\\n      AND (\\\\n        SELECT COALESCE(SUM(guests), 0)\\\\n        FROM event_rsvps\\\\n        WHERE event_id = e.id\\\\n        AND status = 'attending'\\\\n        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n      ) + NEW.guests > e.max_capacity\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Event has reached maximum capacity'","\\\\n    END IF","\\\\n  END IF","\\\\n\\\\n  -- For not attending status\\\\n  IF NEW.status = 'not_attending' THEN\\\\n    -- Set guests to 1 for non-attending RSVPs\\\\n    NEW.guests := 1","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for RSVP validation\\\\nCREATE TRIGGER validate_rsvp\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp()","\\\\n\\\\n-- Create index for faster guest counting\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_guests\\\\nON event_rsvps(event_id, status, guests)","\\\\n\\\\n-- Create index for faster admission number lookups\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_admission_number\\\\nON event_rsvps(event_id, admission_number)\\\\nWHERE admission_number IS NOT NULL","\\\\n\\\\n-- Create index for faster status filtering\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_status\\\\nON event_rsvps(event_id, status)","\\\\n\\\\n-- Create partial index for attending RSVPs\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_attending\\\\nON event_rsvps(event_id, admission_number)\\\\nWHERE status = 'attending'",""}	odd_tooth
20250226204518	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_rsvp()","\\\\n\\\\n-- Create comprehensive RSVP validation function\\\\nCREATE OR REPLACE FUNCTION validate_rsvp()\\\\nRETURNS TRIGGER AS $$\\\\nDECLARE\\\\n  v_event_accepts_rsvps boolean","\\\\n  v_existing_rsvp_id uuid","\\\\nBEGIN\\\\n  -- Check if event is accepting RSVPs\\\\n  SELECT accepting_rsvps INTO v_event_accepts_rsvps\\\\n  FROM events\\\\n  WHERE id = NEW.event_id","\\\\n\\\\n  IF NOT v_event_accepts_rsvps THEN\\\\n    RAISE EXCEPTION 'This event is no longer accepting RSVPs'","\\\\n  END IF","\\\\n\\\\n  -- Always require admission number\\\\n  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n    RAISE EXCEPTION 'Student admission number is required'","\\\\n  END IF","\\\\n  \\\\n  -- Verify admission number exists in students table\\\\n  IF NOT EXISTS (\\\\n    SELECT 1 FROM students \\\\n    WHERE admission_number = NEW.admission_number\\\\n  ) THEN\\\\n    RAISE EXCEPTION 'Invalid admission number'","\\\\n  END IF","\\\\n\\\\n  -- Check for existing RSVP with this admission number\\\\n  SELECT id INTO v_existing_rsvp_id\\\\n  FROM event_rsvps\\\\n  WHERE event_id = NEW.event_id\\\\n  AND admission_number = NEW.admission_number\\\\n  AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)","\\\\n\\\\n  -- If there's an existing RSVP, update it instead of creating a new one\\\\n  IF v_existing_rsvp_id IS NOT NULL THEN\\\\n    -- Update the existing RSVP\\\\n    UPDATE event_rsvps\\\\n    SET \\\\n      status = NEW.status,\\\\n      guests = CASE WHEN NEW.status = 'attending' THEN NEW.guests ELSE 1 END,\\\\n      updated_at = now()\\\\n    WHERE id = v_existing_rsvp_id","\\\\n    \\\\n    -- Return NULL to prevent the original INSERT/UPDATE\\\\n    RETURN NULL","\\\\n  END IF","\\\\n\\\\n  -- For attending status\\\\n  IF NEW.status = 'attending' THEN\\\\n    -- Check max guests per RSVP\\\\n    IF NEW.guests > (\\\\n      SELECT max_guests_per_rsvp \\\\n      FROM events \\\\n      WHERE id = NEW.event_id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n    END IF","\\\\n\\\\n    -- Check event capacity if set\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM events e\\\\n      WHERE e.id = NEW.event_id\\\\n      AND e.max_capacity IS NOT NULL\\\\n      AND (\\\\n        SELECT COALESCE(SUM(guests), 0)\\\\n        FROM event_rsvps\\\\n        WHERE event_id = e.id\\\\n        AND status = 'attending'\\\\n        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n      ) + NEW.guests > e.max_capacity\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Event has reached maximum capacity'","\\\\n    END IF","\\\\n  ELSE\\\\n    -- Set guests to 1 for non-attending RSVPs\\\\n    NEW.guests := 1","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for RSVP validation\\\\nCREATE TRIGGER validate_rsvp\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp()","\\\\n\\\\n-- Drop the unique constraint if it exists\\\\nALTER TABLE event_rsvps\\\\nDROP CONSTRAINT IF EXISTS unique_admission_number_per_event","\\\\n\\\\n-- Create indexes for better performance\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_lookup\\\\nON event_rsvps(event_id, admission_number)","\\\\n\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_status_guests\\\\nON event_rsvps(event_id, status, guests)\\\\nWHERE status = 'attending'",""}	small_castle
20250226205326	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_rsvp()","\\\\n\\\\n-- Create improved RSVP validation function\\\\nCREATE OR REPLACE FUNCTION validate_rsvp()\\\\nRETURNS TRIGGER AS $$\\\\nDECLARE\\\\n  v_event_accepts_rsvps boolean","\\\\n  v_existing_rsvp record","\\\\n  v_student_name text","\\\\nBEGIN\\\\n  -- Check if event is accepting RSVPs\\\\n  SELECT accepting_rsvps INTO v_event_accepts_rsvps\\\\n  FROM events\\\\n  WHERE id = NEW.event_id","\\\\n\\\\n  IF NOT v_event_accepts_rsvps THEN\\\\n    RAISE EXCEPTION 'This event is no longer accepting RSVPs'","\\\\n  END IF","\\\\n\\\\n  -- Always require admission number\\\\n  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n    RAISE EXCEPTION 'Student admission number is required'","\\\\n  END IF","\\\\n  \\\\n  -- Verify admission number exists and get student name\\\\n  SELECT full_name INTO v_student_name\\\\n  FROM students \\\\n  WHERE admission_number = NEW.admission_number","\\\\n\\\\n  IF v_student_name IS NULL THEN\\\\n    RAISE EXCEPTION 'Invalid admission number'","\\\\n  END IF","\\\\n\\\\n  -- Check for existing RSVP with this admission number\\\\n  SELECT * INTO v_existing_rsvp\\\\n  FROM event_rsvps\\\\n  WHERE event_id = NEW.event_id\\\\n  AND admission_number = NEW.admission_number\\\\n  AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n  LIMIT 1","\\\\n\\\\n  -- If there's an existing RSVP, update it instead of creating a new one\\\\n  IF v_existing_rsvp IS NOT NULL THEN\\\\n    -- Update the existing RSVP\\\\n    UPDATE event_rsvps\\\\n    SET \\\\n      status = NEW.status,\\\\n      guests = CASE WHEN NEW.status = 'attending' THEN NEW.guests ELSE 1 END,\\\\n      updated_at = now()\\\\n    WHERE id = v_existing_rsvp.id","\\\\n    \\\\n    -- Return NULL to prevent the original INSERT/UPDATE\\\\n    RETURN NULL","\\\\n  END IF","\\\\n\\\\n  -- For attending status\\\\n  IF NEW.status = 'attending' THEN\\\\n    -- Check max guests per RSVP\\\\n    IF NEW.guests > (\\\\n      SELECT max_guests_per_rsvp \\\\n      FROM events \\\\n      WHERE id = NEW.event_id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n    END IF","\\\\n\\\\n    -- Check event capacity if set\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM events e\\\\n      WHERE e.id = NEW.event_id\\\\n      AND e.max_capacity IS NOT NULL\\\\n      AND (\\\\n        SELECT COALESCE(SUM(guests), 0)\\\\n        FROM event_rsvps\\\\n        WHERE event_id = e.id\\\\n        AND status = 'attending'\\\\n        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n      ) + NEW.guests > e.max_capacity\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Event has reached maximum capacity'","\\\\n    END IF","\\\\n  ELSE\\\\n    -- Set guests to 1 for non-attending RSVPs\\\\n    NEW.guests := 1","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for RSVP validation\\\\nCREATE TRIGGER validate_rsvp\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp()","\\\\n\\\\n-- Create function to get total guests for an event\\\\nCREATE OR REPLACE FUNCTION get_event_total_guests(p_event_id uuid)\\\\nRETURNS integer AS $$\\\\nBEGIN\\\\n  RETURN (\\\\n    SELECT COALESCE(SUM(guests), 0)\\\\n    FROM event_rsvps\\\\n    WHERE event_id = p_event_id\\\\n    AND status = 'attending'\\\\n  )","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create function to check if student can RSVP\\\\nCREATE OR REPLACE FUNCTION check_student_rsvp_status(\\\\n  p_event_id uuid,\\\\n  p_admission_number text\\\\n)\\\\nRETURNS TABLE (\\\\n  can_rsvp boolean,\\\\n  current_status text,\\\\n  current_guests integer,\\\\n  student_name text\\\\n) AS $$\\\\nBEGIN\\\\n  RETURN QUERY\\\\n  SELECT \\\\n    CASE \\\\n      WHEN e.accepting_rsvps = false THEN false\\\\n      ELSE true\\\\n    END as can_rsvp,\\\\n    er.status::text,\\\\n    er.guests,\\\\n    s.full_name\\\\n  FROM events e\\\\n  LEFT JOIN event_rsvps er ON er.event_id = e.id \\\\n    AND er.admission_number = p_admission_number\\\\n  LEFT JOIN students s ON s.admission_number = p_admission_number\\\\n  WHERE e.id = p_event_id","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create indexes for better performance\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_lookup\\\\nON event_rsvps(event_id, admission_number)","\\\\n\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_status_guests\\\\nON event_rsvps(event_id, status, guests)\\\\nWHERE status = 'attending'",""}	noisy_leaf
20250226205603	{"-- Drop existing triggers and functions\\\\nDROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps","\\\\nDROP FUNCTION IF EXISTS validate_rsvp()","\\\\nDROP FUNCTION IF EXISTS check_student_rsvp_status(uuid, text)","\\\\n\\\\n-- Create improved RSVP validation function\\\\nCREATE OR REPLACE FUNCTION validate_rsvp()\\\\nRETURNS TRIGGER AS $$\\\\nDECLARE\\\\n  v_event_accepts_rsvps boolean","\\\\n  v_existing_rsvp record","\\\\n  v_student_name text","\\\\nBEGIN\\\\n  -- Check if event is accepting RSVPs\\\\n  SELECT accepting_rsvps INTO v_event_accepts_rsvps\\\\n  FROM events\\\\n  WHERE id = NEW.event_id","\\\\n\\\\n  IF NOT v_event_accepts_rsvps THEN\\\\n    RAISE EXCEPTION 'This event is no longer accepting RSVPs'","\\\\n  END IF","\\\\n\\\\n  -- Always require admission number\\\\n  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN\\\\n    RAISE EXCEPTION 'Student admission number is required'","\\\\n  END IF","\\\\n  \\\\n  -- Verify admission number exists and get student name\\\\n  SELECT full_name INTO v_student_name\\\\n  FROM students \\\\n  WHERE admission_number = NEW.admission_number","\\\\n\\\\n  IF v_student_name IS NULL THEN\\\\n    RAISE EXCEPTION 'Invalid admission number'","\\\\n  END IF","\\\\n\\\\n  -- Check for existing RSVP with this admission number\\\\n  SELECT * INTO v_existing_rsvp\\\\n  FROM event_rsvps\\\\n  WHERE event_id = NEW.event_id\\\\n  AND admission_number = NEW.admission_number\\\\n  AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n  LIMIT 1","\\\\n\\\\n  -- If there's an existing RSVP, update it instead of creating a new one\\\\n  IF v_existing_rsvp IS NOT NULL THEN\\\\n    -- Update the existing RSVP\\\\n    UPDATE event_rsvps\\\\n    SET \\\\n      status = NEW.status,\\\\n      guests = CASE WHEN NEW.status = 'attending' THEN NEW.guests ELSE 1 END,\\\\n      updated_at = now()\\\\n    WHERE id = v_existing_rsvp.id","\\\\n    \\\\n    -- Return NULL to prevent the original INSERT/UPDATE\\\\n    RETURN NULL","\\\\n  END IF","\\\\n\\\\n  -- For attending status\\\\n  IF NEW.status = 'attending' THEN\\\\n    -- Check max guests per RSVP\\\\n    IF NEW.guests > (\\\\n      SELECT max_guests_per_rsvp \\\\n      FROM events \\\\n      WHERE id = NEW.event_id\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP'","\\\\n    END IF","\\\\n\\\\n    -- Check event capacity if set\\\\n    IF EXISTS (\\\\n      SELECT 1 FROM events e\\\\n      WHERE e.id = NEW.event_id\\\\n      AND e.max_capacity IS NOT NULL\\\\n      AND (\\\\n        SELECT COALESCE(SUM(guests), 0)\\\\n        FROM event_rsvps\\\\n        WHERE event_id = e.id\\\\n        AND status = 'attending'\\\\n        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)\\\\n      ) + NEW.guests > e.max_capacity\\\\n    ) THEN\\\\n      RAISE EXCEPTION 'Event has reached maximum capacity'","\\\\n    END IF","\\\\n  ELSE\\\\n    -- Set guests to 1 for non-attending RSVPs\\\\n    NEW.guests := 1","\\\\n  END IF","\\\\n\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create trigger for RSVP validation\\\\nCREATE TRIGGER validate_rsvp\\\\n  BEFORE INSERT OR UPDATE ON event_rsvps\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION validate_rsvp()","\\\\n\\\\n-- Create function to get student details\\\\nCREATE OR REPLACE FUNCTION get_student_details(p_admission_number text)\\\\nRETURNS TABLE (\\\\n  admission_number text,\\\\n  full_name text,\\\\n  class_name text,\\\\n  is_valid boolean\\\\n) AS $$\\\\nBEGIN\\\\n  RETURN QUERY\\\\n  SELECT \\\\n    s.admission_number,\\\\n    s.full_name,\\\\n    s.class,\\\\n    true as is_valid\\\\n  FROM students s\\\\n  WHERE s.admission_number = p_admission_number\\\\n  UNION ALL\\\\n  SELECT \\\\n    p_admission_number,\\\\n    NULL::text,\\\\n    NULL::text,\\\\n    false\\\\n  WHERE NOT EXISTS (\\\\n    SELECT 1 FROM students \\\\n    WHERE admission_number = p_admission_number\\\\n  )\\\\n  LIMIT 1","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create function to check student RSVP status\\\\nCREATE OR REPLACE FUNCTION check_student_rsvp_status(\\\\n  p_event_id uuid,\\\\n  p_admission_number text\\\\n)\\\\nRETURNS TABLE (\\\\n  can_rsvp boolean,\\\\n  current_status text,\\\\n  current_guests integer,\\\\n  student_name text\\\\n) AS $$\\\\nBEGIN\\\\n  RETURN QUERY\\\\n  SELECT \\\\n    CASE \\\\n      WHEN e.accepting_rsvps = false THEN false\\\\n      ELSE true\\\\n    END as can_rsvp,\\\\n    er.status::text,\\\\n    er.guests,\\\\n    s.full_name\\\\n  FROM events e\\\\n  LEFT JOIN event_rsvps er ON er.event_id = e.id \\\\n    AND er.admission_number = p_admission_number\\\\n  LEFT JOIN students s ON s.admission_number = p_admission_number\\\\n  WHERE e.id = p_event_id","\\\\nEND","\\\\n$$ LANGUAGE plpgsql","\\\\n\\\\n-- Create indexes for better performance\\\\nCREATE INDEX IF NOT EXISTS idx_students_admission_lookup\\\\nON students(admission_number)","\\\\n\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_lookup\\\\nON event_rsvps(event_id, admission_number)","\\\\n\\\\nCREATE INDEX IF NOT EXISTS idx_event_rsvps_status_guests\\\\nON event_rsvps(event_id, status, guests)\\\\nWHERE status = 'attending'",""}	shy_jungle
20250301111642	{"-- Create testimonials table if it doesn't exist\\\\nCREATE TABLE IF NOT EXISTS testimonials (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  source_type text NOT NULL CHECK (source_type IN ('parent', 'student', 'alumni')),\\\\n  author_name text NOT NULL,\\\\n  student_name text,\\\\n  class text,\\\\n  content text NOT NULL,\\\\n  profile_picture_url text,\\\\n  is_visible boolean DEFAULT false,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS if not already enabled\\\\nALTER TABLE testimonials ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Drop existing policies if they exist\\\\nDROP POLICY IF EXISTS \\"Management users can manage testimonials\\" ON testimonials","\\\\nDROP POLICY IF EXISTS \\"Public can view visible testimonials\\" ON testimonials","\\\\n\\\\n-- Create policies\\\\nCREATE POLICY \\"Management users can manage testimonials\\"\\\\n  ON testimonials\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\nCREATE POLICY \\"Public can view visible testimonials\\"\\\\n  ON testimonials\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (is_visible = true)","\\\\n\\\\n-- Create or replace function to update updated_at\\\\nCREATE OR REPLACE FUNCTION update_testimonial_updated_at()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  NEW.updated_at = now()","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ language 'plpgsql'","\\\\n\\\\n-- Drop trigger if exists and recreate\\\\nDROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials","\\\\nCREATE TRIGGER update_testimonials_updated_at\\\\n  BEFORE UPDATE ON testimonials\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION update_testimonial_updated_at()","\\\\n\\\\n-- Drop index if exists and recreate\\\\nDROP INDEX IF EXISTS idx_testimonials_source_type_visible","\\\\nCREATE INDEX idx_testimonials_source_type_visible \\\\nON testimonials(source_type, is_visible)",""}	copper_band
20250301111836	{"-- Create latest_updates table\\\\nCREATE TABLE IF NOT EXISTS latest_updates (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  content text NOT NULL,\\\\n  is_active boolean DEFAULT true,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable RLS\\\\nALTER TABLE latest_updates ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Drop existing policies if they exist\\\\nDROP POLICY IF EXISTS \\"Management users can manage updates\\" ON latest_updates","\\\\nDROP POLICY IF EXISTS \\"Public can view active updates\\" ON latest_updates","\\\\n\\\\n-- Create policies\\\\nCREATE POLICY \\"Management users can manage updates\\"\\\\n  ON latest_updates\\\\n  FOR ALL\\\\n  TO authenticated\\\\n  USING (EXISTS (\\\\n    SELECT 1 FROM management_users \\\\n    WHERE id = auth.uid()\\\\n  ))","\\\\n\\\\nCREATE POLICY \\"Public can view active updates\\"\\\\n  ON latest_updates\\\\n  FOR SELECT\\\\n  TO public\\\\n  USING (is_active = true)","\\\\n\\\\n-- Create or replace function to update updated_at\\\\nCREATE OR REPLACE FUNCTION update_latest_updates_updated_at()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  NEW.updated_at = now()","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ language 'plpgsql'","\\\\n\\\\n-- Drop trigger if exists and recreate\\\\nDROP TRIGGER IF EXISTS update_latest_updates_updated_at ON latest_updates","\\\\nCREATE TRIGGER update_latest_updates_updated_at\\\\n  BEFORE UPDATE ON latest_updates\\\\n  FOR EACH ROW\\\\n  EXECUTE FUNCTION update_latest_updates_updated_at()","\\\\n\\\\n-- Insert initial update if table is empty\\\\nINSERT INTO latest_updates (content, is_active)\\\\nSELECT 'Admissions Open for 2025-26 • Annual Sports Day on March 15th • Inter-School Science Exhibition on April 5th • Parent-Teacher Meeting on March 20th', true\\\\nWHERE NOT EXISTS (SELECT 1 FROM latest_updates)",""}	snowy_river
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 295, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: academic_sessions academic_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_sessions
    ADD CONSTRAINT academic_sessions_pkey PRIMARY KEY (id);


--
-- Name: academic_sessions academic_sessions_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_sessions
    ADD CONSTRAINT academic_sessions_value_key UNIQUE (value);


--
-- Name: alumni_profiles alumni_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumni_profiles
    ADD CONSTRAINT alumni_profiles_pkey PRIMARY KEY (id);


--
-- Name: calendar_events calendar_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar_events
    ADD CONSTRAINT calendar_events_pkey PRIMARY KEY (id);


--
-- Name: event_rsvps event_rsvps_event_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_rsvps
    ADD CONSTRAINT event_rsvps_event_id_user_id_key UNIQUE (event_id, user_id);


--
-- Name: event_rsvps event_rsvps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_rsvps
    ADD CONSTRAINT event_rsvps_pkey PRIMARY KEY (id);


--
-- Name: event_types event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_types
    ADD CONSTRAINT event_types_pkey PRIMARY KEY (id);


--
-- Name: event_types event_types_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_types
    ADD CONSTRAINT event_types_value_key UNIQUE (value);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: featured_testimonials featured_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.featured_testimonials
    ADD CONSTRAINT featured_testimonials_pkey PRIMARY KEY (id);


--
-- Name: gallery_events gallery_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_events
    ADD CONSTRAINT gallery_events_pkey PRIMARY KEY (id);


--
-- Name: gallery_images gallery_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_images
    ADD CONSTRAINT gallery_images_pkey PRIMARY KEY (id);


--
-- Name: latest_updates latest_updates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.latest_updates
    ADD CONSTRAINT latest_updates_pkey PRIMARY KEY (id);


--
-- Name: leadership_messages leadership_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leadership_messages
    ADD CONSTRAINT leadership_messages_pkey PRIMARY KEY (id);


--
-- Name: admin_users management_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT management_users_pkey PRIMARY KEY (id);


--
-- Name: sports_programs sports_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_programs
    ADD CONSTRAINT sports_programs_pkey PRIMARY KEY (id);


--
-- Name: sports_registrations sports_registrations_admission_number_sport_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_registrations
    ADD CONSTRAINT sports_registrations_admission_number_sport_id_key UNIQUE (admission_number, sport_id);


--
-- Name: sports_registrations sports_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_registrations
    ADD CONSTRAINT sports_registrations_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (admission_number);


--
-- Name: success_stories success_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT success_stories_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: youtube_videos youtube_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.youtube_videos
    ADD CONSTRAINT youtube_videos_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_alumni_profiles_show_in_success; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alumni_profiles_show_in_success ON public.alumni_profiles USING btree (show_in_success);


--
-- Name: idx_alumni_profiles_show_testimonial; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alumni_profiles_show_testimonial ON public.alumni_profiles USING btree (show_testimonial) WHERE (show_testimonial = true);


--
-- Name: idx_alumni_profiles_testimonial; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_alumni_profiles_testimonial ON public.alumni_profiles USING btree (testimonial) WHERE (testimonial IS NOT NULL);


--
-- Name: idx_event_rsvps_admission_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_admission_number ON public.event_rsvps USING btree (admission_number);


--
-- Name: idx_event_rsvps_attending; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_attending ON public.event_rsvps USING btree (event_id, admission_number) WHERE (status = 'attending'::text);


--
-- Name: idx_event_rsvps_guests; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_guests ON public.event_rsvps USING btree (event_id, status, guests) WHERE (status = 'attending'::text);


--
-- Name: idx_event_rsvps_lookup; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_lookup ON public.event_rsvps USING btree (event_id, admission_number);


--
-- Name: idx_event_rsvps_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_status ON public.event_rsvps USING btree (event_id, status);


--
-- Name: idx_event_rsvps_status_guests; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_status_guests ON public.event_rsvps USING btree (event_id, status, guests) WHERE (status = 'attending'::text);


--
-- Name: idx_event_rsvps_updated_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_rsvps_updated_at ON public.event_rsvps USING btree (updated_at);


--
-- Name: idx_events_accepting_rsvps; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_events_accepting_rsvps ON public.events USING btree (accepting_rsvps);


--
-- Name: idx_latest_updates_link; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_latest_updates_link ON public.latest_updates USING btree (link) WHERE (link IS NOT NULL);


--
-- Name: idx_leadership_messages_campus; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_leadership_messages_campus ON public.leadership_messages USING btree (campus);


--
-- Name: idx_leadership_messages_display_locations; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_leadership_messages_display_locations ON public.leadership_messages USING gin (display_locations);


--
-- Name: idx_students_admission_lookup; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_students_admission_lookup ON public.students USING btree (admission_number);


--
-- Name: idx_students_admission_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_students_admission_number ON public.students USING btree (admission_number);


--
-- Name: idx_success_stories_alumni_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_success_stories_alumni_id ON public.success_stories USING btree (alumni_id);


--
-- Name: idx_success_stories_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_success_stories_created_at ON public.success_stories USING btree (created_at DESC);


--
-- Name: idx_teachers_class_level; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachers_class_level ON public.teachers USING btree (class_level);


--
-- Name: idx_teachers_full_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachers_full_name ON public.teachers USING btree (full_name);


--
-- Name: idx_teachers_subject; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachers_subject ON public.teachers USING btree (subject);


--
-- Name: idx_testimonials_source_type_visible; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_testimonials_source_type_visible ON public.testimonials USING btree (source_type, is_visible);


--
-- Name: idx_youtube_videos_position; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_youtube_videos_position ON public.youtube_videos USING btree ("position");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: leadership_messages check_display_locations; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_display_locations BEFORE INSERT OR UPDATE ON public.leadership_messages FOR EACH ROW EXECUTE FUNCTION public.validate_display_locations();


--
-- Name: gallery_events check_primary_image; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_primary_image BEFORE INSERT OR UPDATE ON public.gallery_events FOR EACH ROW EXECUTE FUNCTION public.validate_primary_image();


--
-- Name: event_rsvps check_rsvp_guests; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_rsvp_guests BEFORE INSERT OR UPDATE ON public.event_rsvps FOR EACH ROW EXECUTE FUNCTION public.validate_rsvp_guests();


--
-- Name: sports_registrations check_student_admission; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_student_admission BEFORE INSERT OR UPDATE ON public.sports_registrations FOR EACH ROW EXECUTE FUNCTION public.verify_student_admission();


--
-- Name: sports_programs set_sports_programs_auth_fields; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_sports_programs_auth_fields BEFORE INSERT OR UPDATE ON public.sports_programs FOR EACH ROW EXECUTE FUNCTION public.set_auth_user_fields();


--
-- Name: calendar_events set_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.calendar_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: event_rsvps update_event_rsvps_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_event_rsvps_updated_at BEFORE UPDATE ON public.event_rsvps FOR EACH ROW EXECUTE FUNCTION public.update_event_rsvps_updated_at();


--
-- Name: events update_events_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: latest_updates update_latest_updates_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_latest_updates_updated_at BEFORE UPDATE ON public.latest_updates FOR EACH ROW EXECUTE FUNCTION public.update_latest_updates_updated_at();


--
-- Name: sports_programs update_sports_programs_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_sports_programs_updated_at BEFORE UPDATE ON public.sports_programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: teachers update_teachers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: testimonials update_testimonials_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_testimonial_updated_at();


--
-- Name: event_rsvps validate_admission_number; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER validate_admission_number BEFORE INSERT OR UPDATE ON public.event_rsvps FOR EACH ROW EXECUTE FUNCTION public.check_admission_number();


--
-- Name: event_rsvps validate_max_guests; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER validate_max_guests BEFORE INSERT OR UPDATE ON public.event_rsvps FOR EACH ROW EXECUTE FUNCTION public.check_max_guests();


--
-- Name: event_rsvps validate_rsvp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER validate_rsvp BEFORE INSERT OR UPDATE ON public.event_rsvps FOR EACH ROW EXECUTE FUNCTION public.validate_rsvp();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: alumni_profiles alumni_profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumni_profiles
    ADD CONSTRAINT alumni_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: event_rsvps event_rsvps_admission_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_rsvps
    ADD CONSTRAINT event_rsvps_admission_number_fkey FOREIGN KEY (admission_number) REFERENCES public.students(admission_number) ON DELETE SET NULL;


--
-- Name: event_rsvps event_rsvps_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_rsvps
    ADD CONSTRAINT event_rsvps_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_rsvps event_rsvps_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_rsvps
    ADD CONSTRAINT event_rsvps_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: featured_testimonials featured_testimonials_alumni_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.featured_testimonials
    ADD CONSTRAINT featured_testimonials_alumni_profile_id_fkey FOREIGN KEY (alumni_profile_id) REFERENCES public.alumni_profiles(id);


--
-- Name: gallery_images gallery_images_eventID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery_images
    ADD CONSTRAINT "gallery_images_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES public.gallery_events(id);


--
-- Name: admin_users management_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT management_users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: sports_programs sports_programs_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_programs
    ADD CONSTRAINT sports_programs_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: sports_programs sports_programs_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_programs
    ADD CONSTRAINT sports_programs_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES auth.users(id);


--
-- Name: sports_registrations sports_registrations_admission_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_registrations
    ADD CONSTRAINT sports_registrations_admission_number_fkey FOREIGN KEY (admission_number) REFERENCES public.students(admission_number);


--
-- Name: sports_registrations sports_registrations_sport_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sports_registrations
    ADD CONSTRAINT sports_registrations_sport_id_fkey FOREIGN KEY (sport_id) REFERENCES public.sports_programs(id);


--
-- Name: success_stories success_stories_alumni_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT success_stories_alumni_id_fkey FOREIGN KEY (alumni_id) REFERENCES public.alumni_profiles(id) ON DELETE CASCADE;


--
-- Name: success_stories success_stories_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.success_stories
    ADD CONSTRAINT success_stories_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: users users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: calendar_events valid_event_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar_events
    ADD CONSTRAINT valid_event_type FOREIGN KEY (event_type) REFERENCES public.event_types(value) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: users auth_users_policy; Type: POLICY; Schema: auth; Owner: supabase_auth_admin
--

CREATE POLICY auth_users_policy ON auth.users TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: youtube_videos Admin users can manage videos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admin users can manage videos" ON public.youtube_videos TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: users Admins can view all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all users" ON public.users FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.users users_1
  WHERE ((users_1.id = auth.uid()) AND (users_1.role = 'admin'::public.user_role)))));


--
-- Name: sports_programs Allow admin full access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admin full access" ON public.sports_programs TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.auth_user_roles
  WHERE ((auth_user_roles.user_id = auth.uid()) AND (auth_user_roles.role = 'admin'::public.user_role)))));


--
-- Name: sports_programs Allow admins to delete sports_programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admins to delete sports_programs" ON public.sports_programs FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.auth_user_roles
  WHERE ((auth_user_roles.user_id = auth.uid()) AND (auth_user_roles.role = 'admin'::public.user_role)))));


--
-- Name: sports_programs Allow admins to insert sports_programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admins to insert sports_programs" ON public.sports_programs FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.auth_user_roles
  WHERE ((auth_user_roles.user_id = auth.uid()) AND (auth_user_roles.role = 'admin'::public.user_role)))));


--
-- Name: sports_programs Allow admins to update sports_programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow admins to update sports_programs" ON public.sports_programs FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.auth_user_roles
  WHERE ((auth_user_roles.user_id = auth.uid()) AND (auth_user_roles.role = 'admin'::public.user_role)))));


--
-- Name: sports_programs Allow all authenticated users to view sports_programs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow all authenticated users to view sports_programs" ON public.sports_programs FOR SELECT TO authenticated USING (true);


--
-- Name: calendar_events Allow all users to view calendar events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow all users to view calendar events" ON public.calendar_events FOR SELECT USING (true);


--
-- Name: calendar_events Allow authenticated users to manage calendar events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage calendar events" ON public.calendar_events TO authenticated USING (true) WITH CHECK (true);


--
-- Name: sports_programs Allow public access to published sports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public access to published sports" ON public.sports_programs FOR SELECT USING ((is_published = true));


--
-- Name: event_rsvps Anonymous users can create RSVPs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anonymous users can create RSVPs" ON public.event_rsvps FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.events
  WHERE ((events.id = event_rsvps.event_id) AND (events.accepting_rsvps = true)))));


--
-- Name: users Anyone can check user roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can check user roles" ON public.users FOR SELECT USING (true);


--
-- Name: events Anyone can read events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read events" ON public.events FOR SELECT USING (true);


--
-- Name: leadership_messages Anyone can read leadership messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can read leadership messages" ON public.leadership_messages FOR SELECT USING (true);


--
-- Name: students Anyone can verify admission numbers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can verify admission numbers" ON public.students FOR SELECT USING (true);


--
-- Name: event_rsvps Anyone can view RSVP counts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view RSVP counts" ON public.event_rsvps FOR SELECT USING (true);


--
-- Name: events Anyone can view events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);


--
-- Name: users Authenticated users can check if they exist; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can check if they exist" ON public.users FOR SELECT TO authenticated USING (true);


--
-- Name: event_rsvps Authenticated users can manage their RSVPs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can manage their RSVPs" ON public.event_rsvps TO authenticated USING (((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))))) WITH CHECK (((EXISTS ( SELECT 1
   FROM public.events
  WHERE ((events.id = event_rsvps.event_id) AND (events.accepting_rsvps = true)))) AND ((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))))));


--
-- Name: teachers Enable delete for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable delete for authenticated users only" ON public.teachers FOR DELETE USING ((auth.role() = 'authenticated'::text));


--
-- Name: sports_registrations Enable insert for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for all users" ON public.sports_registrations FOR INSERT WITH CHECK (true);


--
-- Name: teachers Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.teachers FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: sports_registrations Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.sports_registrations FOR SELECT USING (true);


--
-- Name: teachers Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.teachers FOR SELECT USING (true);


--
-- Name: users Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.users FOR SELECT USING ((auth.uid() = id));


--
-- Name: teachers Enable update for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for authenticated users only" ON public.teachers FOR UPDATE USING ((auth.role() = 'authenticated'::text));


--
-- Name: teachers Enable write access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable write access for authenticated users" ON public.teachers USING ((auth.role() = 'authenticated'::text));


--
-- Name: admin_users Management users can access their own data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can access their own data" ON public.admin_users TO authenticated USING ((auth.uid() = id));


--
-- Name: events Management users can manage events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage events" ON public.events TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: featured_testimonials Management users can manage featured testimonials; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage featured testimonials" ON public.featured_testimonials TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: gallery_events Management users can manage gallery events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage gallery events" ON public.gallery_events TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: gallery_images Management users can manage gallery images; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage gallery images" ON public.gallery_images TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: leadership_messages Management users can manage leadership messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage leadership messages" ON public.leadership_messages TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: students Management users can manage students; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage students" ON public.students TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: testimonials Management users can manage testimonials; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage testimonials" ON public.testimonials TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: latest_updates Management users can manage updates; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can manage updates" ON public.latest_updates TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: alumni_profiles Management users can update alumni profiles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Management users can update alumni profiles" ON public.alumni_profiles FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid())))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.id = auth.uid()))));


--
-- Name: admin_users Public can check if user is management; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can check if user is management" ON public.admin_users FOR SELECT USING (true);


--
-- Name: latest_updates Public can view active updates; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view active updates" ON public.latest_updates FOR SELECT USING ((is_active = true));


--
-- Name: featured_testimonials Public can view featured testimonials; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view featured testimonials" ON public.featured_testimonials FOR SELECT USING ((is_visible = true));


--
-- Name: gallery_events Public can view gallery events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view gallery events" ON public.gallery_events FOR SELECT USING (true);


--
-- Name: gallery_images Public can view gallery images; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view gallery images" ON public.gallery_images FOR SELECT USING (true);


--
-- Name: testimonials Public can view visible testimonials; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view visible testimonials" ON public.testimonials FOR SELECT USING ((is_visible = true));


--
-- Name: youtube_videos Public can view visible videos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view visible videos" ON public.youtube_videos FOR SELECT USING ((is_visible = true));


--
-- Name: users Users can insert their own record; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own record" ON public.users FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: admin_users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

--
-- Name: alumni_profiles admin_write_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_write_access ON public.alumni_profiles TO authenticated USING (((auth.jwt() ->> 'role'::text) = 'admin'::text));


--
-- Name: alumni_profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.alumni_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: alumni_profiles authenticated_read_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY authenticated_read_access ON public.alumni_profiles FOR SELECT TO authenticated USING (true);


--
-- Name: calendar_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

--
-- Name: users enable_read_for_all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enable_read_for_all ON public.users FOR SELECT USING (true);


--
-- Name: users enable_write_for_authenticated; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY enable_write_for_authenticated ON public.users TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: event_rsvps; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

--
-- Name: events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

--
-- Name: featured_testimonials; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.featured_testimonials ENABLE ROW LEVEL SECURITY;

--
-- Name: gallery_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.gallery_events ENABLE ROW LEVEL SECURITY;

--
-- Name: gallery_images; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

--
-- Name: latest_updates; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.latest_updates ENABLE ROW LEVEL SECURITY;

--
-- Name: leadership_messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.leadership_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: alumni_profiles public_read_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_read_access ON public.alumni_profiles FOR SELECT USING ((is_public = true));


--
-- Name: users public_users_modify_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_users_modify_policy ON public.users TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: users public_users_read_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_users_read_policy ON public.users FOR SELECT USING (true);


--
-- Name: users public_users_select_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_users_select_policy ON public.users FOR SELECT USING (true);


--
-- Name: users public_users_write_policy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY public_users_write_policy ON public.users TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: sports_programs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

--
-- Name: sports_registrations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.sports_registrations ENABLE ROW LEVEL SECURITY;

--
-- Name: students; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

--
-- Name: teachers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

--
-- Name: testimonials; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

--
-- Name: alumni_profiles user_self_access; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_self_access ON public.alumni_profiles TO authenticated USING ((auth.uid() = id));


--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: youtube_videos; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Allow authenticated updates; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated updates" ON storage.objects FOR UPDATE TO authenticated USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Allow authenticated uploads; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: objects Allow authenticated users to delete their own files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated users to delete their own files" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'alumni'::text) AND ((storage.foldername(name))[1] = 'profile-pictures'::text)));


--
-- Name: objects Allow authenticated users to update their own files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated users to update their own files" ON storage.objects FOR UPDATE TO authenticated USING (((bucket_id = 'alumni'::text) AND ((storage.foldername(name))[1] = 'profile-pictures'::text)));


--
-- Name: objects Allow authenticated users to upload files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow authenticated users to upload files" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'alumni'::text));


--
-- Name: objects Allow public access to read files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow public access to read files" ON storage.objects FOR SELECT USING ((bucket_id = 'alumni'::text));


--
-- Name: objects Allow public read access; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING ((bucket_id = 'avatars'::text));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid) TO anon;
GRANT ALL ON FUNCTION public.can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.can_student_rsvp(p_event_id uuid, p_admission_number text, p_current_rsvp_id uuid) TO service_role;


--
-- Name: FUNCTION check_admission_number(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_admission_number() TO anon;
GRANT ALL ON FUNCTION public.check_admission_number() TO authenticated;
GRANT ALL ON FUNCTION public.check_admission_number() TO service_role;


--
-- Name: FUNCTION check_if_user_is_admin(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_if_user_is_admin() TO anon;
GRANT ALL ON FUNCTION public.check_if_user_is_admin() TO authenticated;
GRANT ALL ON FUNCTION public.check_if_user_is_admin() TO service_role;


--
-- Name: FUNCTION check_max_guests(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_max_guests() TO anon;
GRANT ALL ON FUNCTION public.check_max_guests() TO authenticated;
GRANT ALL ON FUNCTION public.check_max_guests() TO service_role;


--
-- Name: FUNCTION check_student_rsvp_status(p_event_id uuid, p_admission_number text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_student_rsvp_status(p_event_id uuid, p_admission_number text) TO anon;
GRANT ALL ON FUNCTION public.check_student_rsvp_status(p_event_id uuid, p_admission_number text) TO authenticated;
GRANT ALL ON FUNCTION public.check_student_rsvp_status(p_event_id uuid, p_admission_number text) TO service_role;


--
-- Name: FUNCTION delete_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.delete_user() TO anon;
GRANT ALL ON FUNCTION public.delete_user() TO authenticated;
GRANT ALL ON FUNCTION public.delete_user() TO service_role;


--
-- Name: FUNCTION get_event_rsvp_count(event_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_event_rsvp_count(event_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_event_rsvp_count(event_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_event_rsvp_count(event_id uuid) TO service_role;


--
-- Name: FUNCTION get_event_rsvps(event_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_event_rsvps(event_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_event_rsvps(event_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_event_rsvps(event_id uuid) TO service_role;


--
-- Name: FUNCTION get_event_total_guests(p_event_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_event_total_guests(p_event_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_event_total_guests(p_event_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_event_total_guests(p_event_id uuid) TO service_role;


--
-- Name: FUNCTION get_student_details(p_admission_number text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_student_details(p_admission_number text) TO anon;
GRANT ALL ON FUNCTION public.get_student_details(p_admission_number text) TO authenticated;
GRANT ALL ON FUNCTION public.get_student_details(p_admission_number text) TO service_role;


--
-- Name: FUNCTION get_user_role(user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_user_role(user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_user_role(user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_user_role(user_id uuid) TO service_role;


--
-- Name: FUNCTION set_auth_user_fields(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_auth_user_fields() TO anon;
GRANT ALL ON FUNCTION public.set_auth_user_fields() TO authenticated;
GRANT ALL ON FUNCTION public.set_auth_user_fields() TO service_role;


--
-- Name: FUNCTION update_event_rsvps_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_event_rsvps_updated_at() TO anon;
GRANT ALL ON FUNCTION public.update_event_rsvps_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.update_event_rsvps_updated_at() TO service_role;


--
-- Name: FUNCTION update_latest_updates_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_latest_updates_updated_at() TO anon;
GRANT ALL ON FUNCTION public.update_latest_updates_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.update_latest_updates_updated_at() TO service_role;


--
-- Name: FUNCTION update_testimonial_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_testimonial_updated_at() TO anon;
GRANT ALL ON FUNCTION public.update_testimonial_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.update_testimonial_updated_at() TO service_role;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION validate_display_locations(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_display_locations() TO anon;
GRANT ALL ON FUNCTION public.validate_display_locations() TO authenticated;
GRANT ALL ON FUNCTION public.validate_display_locations() TO service_role;


--
-- Name: FUNCTION validate_primary_image(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_primary_image() TO anon;
GRANT ALL ON FUNCTION public.validate_primary_image() TO authenticated;
GRANT ALL ON FUNCTION public.validate_primary_image() TO service_role;


--
-- Name: FUNCTION validate_rsvp(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_rsvp() TO anon;
GRANT ALL ON FUNCTION public.validate_rsvp() TO authenticated;
GRANT ALL ON FUNCTION public.validate_rsvp() TO service_role;


--
-- Name: FUNCTION validate_rsvp_guests(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_rsvp_guests() TO anon;
GRANT ALL ON FUNCTION public.validate_rsvp_guests() TO authenticated;
GRANT ALL ON FUNCTION public.validate_rsvp_guests() TO service_role;


--
-- Name: FUNCTION validate_schedule_types(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.validate_schedule_types() TO anon;
GRANT ALL ON FUNCTION public.validate_schedule_types() TO authenticated;
GRANT ALL ON FUNCTION public.validate_schedule_types() TO service_role;


--
-- Name: FUNCTION verify_admission_number(admission_number text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.verify_admission_number(admission_number text) TO anon;
GRANT ALL ON FUNCTION public.verify_admission_number(admission_number text) TO authenticated;
GRANT ALL ON FUNCTION public.verify_admission_number(admission_number text) TO service_role;


--
-- Name: FUNCTION verify_student_admission(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.verify_student_admission() TO anon;
GRANT ALL ON FUNCTION public.verify_student_admission() TO authenticated;
GRANT ALL ON FUNCTION public.verify_student_admission() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION add_prefixes(_bucket_id text, _name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.add_prefixes(_bucket_id text, _name text) TO postgres;


--
-- Name: FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;


--
-- Name: FUNCTION delete_prefix(_bucket_id text, _name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.delete_prefix(_bucket_id text, _name text) TO postgres;


--
-- Name: FUNCTION delete_prefix_hierarchy_trigger(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.delete_prefix_hierarchy_trigger() TO postgres;


--
-- Name: FUNCTION enforce_bucket_name_length(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.enforce_bucket_name_length() TO postgres;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION get_level(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_level(name text) TO postgres;


--
-- Name: FUNCTION get_prefix(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_prefix(name text) TO postgres;


--
-- Name: FUNCTION get_prefixes(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_prefixes(name text) TO postgres;


--
-- Name: FUNCTION get_size_by_bucket(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_size_by_bucket() TO postgres;


--
-- Name: FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;


--
-- Name: FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;


--
-- Name: FUNCTION objects_insert_prefix_trigger(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.objects_insert_prefix_trigger() TO postgres;


--
-- Name: FUNCTION objects_update_prefix_trigger(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.objects_update_prefix_trigger() TO postgres;


--
-- Name: FUNCTION operation(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.operation() TO postgres;


--
-- Name: FUNCTION prefixes_insert_trigger(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.prefixes_insert_trigger() TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_authorizations TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_clients TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_consents TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE academic_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.academic_sessions TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.academic_sessions TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.academic_sessions TO service_role;


--
-- Name: TABLE admin_users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.admin_users TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.admin_users TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.admin_users TO service_role;


--
-- Name: TABLE alumni_profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alumni_profiles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alumni_profiles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.alumni_profiles TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.users TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.users TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.users TO service_role;


--
-- Name: TABLE auth_user_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.auth_user_roles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.auth_user_roles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.auth_user_roles TO service_role;


--
-- Name: TABLE calendar_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.calendar_events TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.calendar_events TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.calendar_events TO service_role;


--
-- Name: TABLE event_rsvps; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_rsvps TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_rsvps TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_rsvps TO service_role;


--
-- Name: TABLE event_types; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_types TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_types TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.event_types TO service_role;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.events TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.events TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.events TO service_role;


--
-- Name: TABLE featured_testimonials; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.featured_testimonials TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.featured_testimonials TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.featured_testimonials TO service_role;


--
-- Name: TABLE gallery_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_events TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_events TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_events TO service_role;


--
-- Name: TABLE gallery_images; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_images TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_images TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.gallery_images TO service_role;


--
-- Name: TABLE latest_updates; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.latest_updates TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.latest_updates TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.latest_updates TO service_role;


--
-- Name: TABLE leadership_messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leadership_messages TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leadership_messages TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leadership_messages TO service_role;


--
-- Name: TABLE sports_programs; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_programs TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_programs TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_programs TO service_role;


--
-- Name: TABLE sports_registrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_registrations TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_registrations TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.sports_registrations TO service_role;


--
-- Name: TABLE students; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.students TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.students TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.students TO service_role;


--
-- Name: TABLE success_stories; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.success_stories TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.success_stories TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.success_stories TO service_role;


--
-- Name: TABLE teachers; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.teachers TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.teachers TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.teachers TO service_role;


--
-- Name: TABLE testimonials; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.testimonials TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.testimonials TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.testimonials TO service_role;


--
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_roles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_roles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_roles TO service_role;


--
-- Name: TABLE youtube_videos; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.youtube_videos TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.youtube_videos TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.youtube_videos TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets_analytics TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.prefixes TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO postgres;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO postgres;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

