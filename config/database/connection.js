import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as config from '../../utils/config.js';
dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log('### DATABASE CONNECTION ESTABLISHED SUCCESSFULLY');
  })
  .catch(error => {
    console.log('#### FAILED TO CONNECT TO DATABASE ####', error.message);
  });
