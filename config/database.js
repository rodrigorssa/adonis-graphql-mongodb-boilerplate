'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mongodb'),
   /*
  |--------------------------------------------------------------------------
  | MongoDB
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MongoDB database.
  |
  */
  mongodb: {
    client: 'mongodb',
    connectionString: `mongodb${Env.get('DB_TYPE_CONNECTION','')}://${Env.get('DB_USER', '')}:${Env.get('DB_PASSWORD', '')}@${Env.get('DB_HOST', '')}/${Env.get('DB_DATABASE', '') + Env.get('DB_REPLICASET', '')}`,
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', 27017),
      username: Env.get('DB_USER', 'admin'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'gdb-admin'),
      options: {
        // All options can be found at http://mongoosejs.com/docs/connections.html
        replicaSet: Env.get('DB_REPLICA_SET', ''),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      debug: false
    }
  },
}
