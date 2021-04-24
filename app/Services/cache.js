const { promisify } = require('util');
const redis = use('Config/redis');
const Logger = use('Logger');

class CacheService {
  constructor(key, tid) {
    this.client = redis.getclient();
    this.base_key = 'app.key';
    this.key = this.base_key + key;
    this.day_seconds = 86400;
    this.tid = tid || null;
  }

  getFromCache(key = '') {
    if (!this.client.connected) {
      return null;
    }
    Logger.info(`Getting ${this.key + key} from cache.`, this.tid);
    const get = promisify(this.client.get).bind(this.client);
    return get(this.key + key)
      .then(result => JSON.parse(result))
      .catch(() => null);
  }

  setToCache({ data = null, expiresIn = this.day_seconds, key = '' }) {
    if (!this.client.connected) {
      return null;
    }
    const set = promisify(this.client.set).bind(this.client);
    return set(this.key + key, JSON.stringify(data), 'EX', expiresIn)
      .then(() => {
        Logger.info(`${this.key} - Expires in ${expiresIn} seconds.`, this.tid);
      })
      .catch(() => {
        Logger.error('Could not add to cache.', this.tid);
      });
  }

  deleteFromCache() {
    if (!this.client.connected) {
      return null;
    }
    const del = promisify(this.client.del).bind(this.client);
    return del(this.key).catch(() => {
      Logger.error('Could not delete from cache.', this.tid);
    });
  }
}

module.exports = CacheService;
