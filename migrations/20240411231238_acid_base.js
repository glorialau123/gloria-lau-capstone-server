/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("acidBaseQuestions", function (table) {
      table.increments("id").primary();
      table.string("text");
    })
    .createTable("acidBaseOptions", function (table) {
      table.increments("id").primary();
      table.integer("question_id").unsigned();
      table.foreign("question_id").references("acidBaseQuestions.id");
      table.string("text");
      table.boolean("isCorrect");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("acidBaseOptions").dropTable("acidBaseQuestions");
};
