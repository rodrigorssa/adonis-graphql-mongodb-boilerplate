const DefaultBusiness = require('../Business/default')
module.exports = {
  Query: {
    testString () {
      return new DefaultBusiness().defaultMessage()
    }
  }
}
