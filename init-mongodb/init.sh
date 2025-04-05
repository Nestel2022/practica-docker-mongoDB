#!/bin/bash

echo "########### Waiting for MongoDB to start ###########"
until mongosh --eval "print(\"waited for connection\")" 2>/dev/null; do
    sleep 1
done

echo "########### Loading data to Mongo DB ###########"
mongoimport --db practica-database \
--collection users \
--type json \
--file /tmp/data/users.json \
--jsonArray

echo "########### Data loaded ###########"