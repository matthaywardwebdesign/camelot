/* Import dependencies */
import API from 'lib/api';
import {
  getApplicationInformation,
  rawHTMLToPDF,
  resource
} from 'controllers';

class Routes {
  load() {
    /* Load all of the routes */
    API.registerRoute( 'get', '/', getApplicationInformation );
    API.registerRoute( 'post', '/raw', rawHTMLToPDF );
    API.registerRoute( 'get', '/url', resource );
    /* Enable the error handler */
    API.enableErrorHandler();
  }
}

export default new Routes();
