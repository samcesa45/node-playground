import app from './app.js';
import './config/database/connection.js';
import * as logger from './utils/logger.js';
import * as config from './utils/config.js';

app.listen(config.PORT || 3001, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
