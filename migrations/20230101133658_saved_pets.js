exports.up = function (knex) {
  return knex.schema.createTable("saved_pets", function (table) {
    table.integer("userId").unsigned().references("userId").inTable("users");
    table.integer("petId").unsigned().references("petId").inTable("pets");
    table.primary(["userId", "petId"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("saved_pets");
};
