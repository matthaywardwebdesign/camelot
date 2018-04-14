/* Include dependencies */
import os from 'os';
import config from 'config';
import { DEFAULT_ERROR_MESSAGE } from 'constants';

const errorHandler = ( err, req, res, next ) => {
  /* If the headers have already been sent pass this up the chain */
  if ( res.headersSent ) {
    return next( err );
  }

  /* The default error code is 500 - Internal Server Error */
  let code = 500;

  /* If a error code is defined in the error then use it as the status code */
  if ( err.code ) {
    code = err.code;
  }

  /**
   * If the error has a response body (commonly occurs when calling upstream APIs)
   * use the status from the response instead
   */
  if ( err.response ) {
    code = err.response.status;
  }

  /* Define the default error message */
  let message = DEFAULT_ERROR_MESSAGE;

  /* If a message was provided with the error use it instead */
  if ( err.message ) {
    message = err.message;
  }

  /* If the error has a response body use the response body as the message */
  if ( err.response ){
    message = err.response.data;
  }

  /* If an error field is provided on the error use it as the message */
  if ( err.error ) {
    message = err.error;
  }

  /* If the error code is less than 200 throw an internal server error */
  if ( code < 200 ) {
    res.status( 500 );
    res.json({ error: DEFAULT_ERROR_MESSAGE, hostname: os.hostname(), version: config.version });
    return;
  }

  /**
   * Send back a JSON formatted error message using the calculated values
   * as well as including hostname and version
   */
  res.status( code );
  res.json({ error: message, hostname: os.hostname(), version: config.version });
};

export default errorHandler;
