import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('### DATABASE CONNECTION ESTABLISHED SUCCESSFULLY');
  })
  .catch(error => {
    console.log('#### FAILED TO CONNECT TO DATABASE ####', error.message);
  });
