import app from './app.js';
import http from 'http';
import * as logger from './utils/logger.js';
import * as config from './utils/config.js';

const server = http.createServer(app);
server.listen(config.PORT || 3001, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
