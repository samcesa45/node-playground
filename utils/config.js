import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
