// Create DB and collection without authentication
db = db.getSiblingDB("practica-database");

// Crear colección users
db.createCollection("users", { capped: false });

print("Database and collection created successfully");