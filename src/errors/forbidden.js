const { FORBIDDEN } = require('../../constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = Forbidden;
