'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('token')
      table.string('type')
      table.boolean('is_revoked',{ default: false })
      table.timestamps()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
