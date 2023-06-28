/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('likedworkouts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('workout_id').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTable("likedworkouts");
  };
  