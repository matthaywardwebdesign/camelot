/* Import dependencies */
import API from 'lib/api';
import {
  getApplicationInformation,
} from 'controllers';

class Routes {
  load() {
    /* Load all of the routes */
    API.registerRoute( 'get', '/', getApplicationInformation );

    /* Enable the error handler */
    API.enableErrorHandler();
  }
}

export default new Routes();
