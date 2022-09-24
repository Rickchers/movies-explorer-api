const { CONF_REQUEST } = require('../../constants');

class ConflictRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONF_REQUEST;
  }
}

module.exports = ConflictRequest;
