exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("userId").primary();
    table.string("email").notNull();
    table.string("password").notNull();
    table.boolean("isAdmin").notNull();
    table.string("firstName").notNull();
    table.string("lastName").notNull();
    table.string("phone").notNull();
    table.string("bio");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
