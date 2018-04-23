/* Include dependencies */
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ErrorHandler from './ErrorHandler';
import Logger from 'lib/logging';

class API {
  /* Sets up the API */
  constructor() {
    /* Create a new express server */
    this.app = express();

    /* Use JSON body parsing */
    this.app.use( bodyParser.json({}));

    /* Add cors support */
    this.app.use( cors());

    /* Serve up the temp directory under docs route */
    this.app.use( '/docs', express.static( 'tmp' ));

    /* Listen on the defined port */
    this.app.listen( config.api.port, () => {
      Logger.info( `${config.appName} is now listening on ${config.api.port}` );
    });
  }

  /**
   * Starts the error handler. The reason we do this is that the error handler
   * must be defined after all the routes otherwise it won't work correctly.
   */
  enableErrorHandler() {
    /* Create an error handler */
    this.app.use( ErrorHandler );
  }

  /* Registers a route on the API */
  registerRoute( method, path, callback ) {
    this.app[method]( path, ( req, res, next ) => {
      /**
       * We wrap the whole application in a try catch so that we can throw
       * errors from anywhere in the application easily
       */
      try {
        /* Call the route handler and store the result */
        const request = callback( req, res, next );

        /**
         * If the result is defined and we are able to catch an
         * error (async routes) then define the catch handler
         */
        if ( request && request.catch ) {
          request.catch( error => {
            /* Pass the error to the error handler / other middleware */
            return next( error );
          });
        }
      } catch ( error ) {
        /**
         * Any other errors will be caught here, pass them to the
         * error handler / other middleware
         */
        return next( error );
      }
    });
  }
}

export default new API();
