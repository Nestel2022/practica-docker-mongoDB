db = db.getSiblingDB("practica-database");
db.createCollection("users", { capped: false });

print("Base de datos y coleccion creados correctamente!!!");