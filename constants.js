const BAD_REQUEST = 400;
const UNAUTHRIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONF_REQUEST = 409;
const INTERNAL_SERVER_ERROR = 500;

const regex = /^http(s)?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  BAD_REQUEST, UNAUTHRIZED, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, CONF_REQUEST, regex,
};
