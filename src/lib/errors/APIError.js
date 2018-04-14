class APIError extends Error {
  constructor( code, error ) {
    super( error );
    this.code = code;
    this.error = error;
    Error.captureStackTrace( this, APIError );
  }

  toString() {
    return JSON.stringify({ code: this.code, error: this.error });
  }
}

export default APIError;
