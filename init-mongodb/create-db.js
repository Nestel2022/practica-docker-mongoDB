// Create admin user if needed
db.getSiblingDB("admin").auth("root", "example");

// Create DB and collection
db = db.getSiblingDB("practica-database");
db.createCollection("users", { 
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+\@.+\..+$",
          description: "must be a valid email and is required"
        }
      }
    }
  }
});

print("Database and collection created successfully");