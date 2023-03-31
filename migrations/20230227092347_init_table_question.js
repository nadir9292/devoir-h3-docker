/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable("question", function (table) {
    table.increments("id")
    table.string("interrogation", 255).notNullable()
    table.string("first_answer", 255).notNullable()
    table.string("second_answer", 255).notNullable()
    table.string("third_answer", 255)
    table.string("fourth_answer", 255)
    table.integer("good_answer").notNullable()
    table.integer("points").notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable("question")
}
