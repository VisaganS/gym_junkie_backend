/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("workout", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("type").notNullable();
        table.string("image");
        table.integer("likes").notNullable();
        table.integer("comments").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("exercise", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("muscle").notNullable();
        table.string("equipment").notNullable();
        table.string("difficulty").notNullable();
        table.text("instructions").notNullable();
        table
          .integer("workout_id")
          .unsigned()
          .references("workout.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("workout").dropTable("exercise");
  };
