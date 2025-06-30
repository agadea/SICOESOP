#!/bin/bash

set -e

# Espera a que Postgres esté listo
until pg_isready -h localhost -p 5432 -U "$POSTGRES_USER"; do
  echo "Esperando a que Postgres esté listo..."
  sleep 2
done

# Verifica si existe una tabla clave (ajusta el nombre si es necesario)
TABLE_EXISTS=$(psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "SELECT to_regclass('public.tu_tabla_clave') IS NOT NULL;")

if [ "$TABLE_EXISTS" != "t" ]; then
  echo "La tabla clave no existe. Restaurando desde init-plain.sql..."
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/init.sql
else
  echo "La base de datos ya está inicializada."
fi
