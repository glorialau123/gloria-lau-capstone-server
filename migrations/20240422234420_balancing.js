/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema
    .createTable("balancingQuestions", (table) => {
      table.increments("id").primary();
      table.string("text");
    })
    .createTable("balancingOptions", (table) => {
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
  knex.schema
  .dropTable('balancingOptions').dropTable('balancingQuestions');
};
