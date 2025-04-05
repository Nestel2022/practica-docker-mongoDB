#!/bin/bash

echo "########### Esperando a que MongoDB se inicie ###########"
until mongosh --eval "print(\"waited for connection\")" 2>/dev/null; do
    sleep 1
done

echo "########### Cargando datos a MongoDB ###########"
mongoimport --db practica-database \
--collection users \
--type json \
--file /tmp/data/users.json \
--jsonArray

echo "########### Datos cargados ###########"