#!/bin/bash

echo "########### Waiting for MongoDB to initialize ###########"
until mongosh --eval "print(\"waited for connection\")" 2>/dev/null; do
    sleep 2
done

echo "########### Loading data ###########"
mongoimport --uri "mongodb://root:example@localhost:27017/practica-database?authSource=admin" \
--collection users \
--type json \
--file /tmp/data/users.json \
--jsonArray \
--drop

echo "########### Data loaded ###########"