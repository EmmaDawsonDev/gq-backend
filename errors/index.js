class CustomError extends Error {}

class Forbidden extends CustomError {
  constructor() {
    super();
    this.errorCode = 403;
    this.errorMessage = "Access denied!";
  }
}

class ResourceNotFound extends CustomError {
  constructor(payload) {
    super();
    this.errorCode = 404;
    this.errorMessage = `${payload} not found.`;
  }
}

class InvalidCredentials extends CustomError {
  constructor() {
    super();
    this.errorCode = 401;
    this.errorMessage = `Email and password don't match`;
  }
}

class MissingCredentials extends CustomError {
  constructor(...arr) {
    super();
    this.errorCode = 400;
    this.errorMessage = `Missing credentials: ${arr.join(", ")} required`;
  }
}

class InvalidRequest extends CustomError {
  constructor(message) {
    super();
    this.errorCode = 400;
    this.errorMessage = `Invalid request. ${message}.`;
  }
}

class Unauthorized extends CustomError {
  constructor() {
    super();
    this.errorCode = 401;
    this.errorMessage = `Unauthorized.`;
  }
}

class TokenExpired extends CustomError {
  constructor() {
    super();
    this.errorCode = 401;
    this.errorMessage = `Token has expired, please log in again.`;
  }
}

class InvalidBody extends CustomError {
  constructor(...arr) {
    super();
    this.errorCode = 400;
    this.errorMessage = `${arr.join(", ")} required.`;
  }
}

class UnsupportedFileType extends CustomError {
  constructor(message) {
    super();
    this.errorCode = 415;
    this.errorMessage = `Unsupported file type. ${message}`;
  }
}

class Teapot extends CustomError {
  constructor() {
    super();
    this.errorCode = 418;
    this.errorMessage = `I'm a Teapot, yes you are.`;
  }
}

module.exports = {
  Teapot,
  CustomError,
  Forbidden,
  ResourceNotFound,
  InvalidCredentials,
  Unauthorized,
  InvalidBody,
  InvalidRequest,
  UnsupportedFileType,
  TokenExpired,
  MissingCredentials,
};