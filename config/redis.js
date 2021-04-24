const redis = require('redis');
const Logger = use('Logger');

module.exports = class Redis {
  constructor() {
    this.client = {};
  }

  static createConnection() {
    let state = 'OK';

    this.client = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    this.client.on('error', err => {
      Logger.error(err);
    });

    this.client.on('ready', () => {
      Logger.info('Redis Connected!');
      if (state === 'RECONNECTING') {
        state = 'OK';
        Logger.info(`Redis Connection:${state}`);
      }
    });

    this.client.on('reconnecting', () => {
      state = 'RECONNECTING';
    });
  }

  static getclient() {
    return this.client;
  }

};
