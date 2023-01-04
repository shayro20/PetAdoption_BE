exports.up = function (knex) {
  return knex.schema.createTable("pets", (table) => {
    table.increments("petId").primary();
    table.enu("type", ["Dog", "Cat", "Other"]);
    table.string("name").notNull();
    table.enu("adoptionStatus", ["Available", "Adopted", "Fostered"]).defaultTo("Available").notNull();
    table.string("picture").notNull();
    table.string("breed").notNull();
    table.float("height").notNull();
    table.float("weight").notNull();
    table.string("color").notNull();
    table.text("bio");
    table.boolean("hypoallergenic").notNull().defaultTo(false);
    table.string("diet");
    table.integer("ownerId");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pets");
};
