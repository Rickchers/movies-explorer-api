const { UNAUTHRIZED } = require('../../constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHRIZED;
  }
}

module.exports = Unauthorized;
