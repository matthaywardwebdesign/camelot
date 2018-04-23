/* Import dependencies */
import API from 'lib/api';
import {
  getApplicationInformation,
  rawHTMLToPDF,
} from 'controllers';

class Routes {
  load() {
    /* Load all of the routes */
    API.registerRoute( 'get', '/', getApplicationInformation );
    API.registerRoute( 'post', '/raw', rawHTMLToPDF );
    API.registerRoute( 'get', '/get-pdf', rawHTMLToPDF );
    /* Enable the error handler */
    API.enableErrorHandler();
  }
}

export default new Routes();
