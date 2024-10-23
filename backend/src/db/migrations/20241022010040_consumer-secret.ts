import { Knex } from "knex";

import { TableName } from "../schemas";

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable(TableName.ConsumerSecret)) {
    return;
  }

  await knex.schema.createTable(TableName.ConsumerSecret, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.string("name").notNullable();
    t.string("username");
    t.string("password");
    t.timestamps(true, true, true);
    t.uuid("userId").notNullable();
    t.foreign("userId").references("id").inTable(TableName.Users).onDelete("CASCADE");
    t.uuid("orgId").notNullable();
    t.foreign("orgId").references("id").inTable(TableName.Organization).onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.ConsumerSecret);
}
