/* Include dependencies */
import config from 'config';

/* Returns information about the currently running application */
export default ( req, res ) => {
  res.send({
    name: config.appName,
    version: config.version,
  });
};
