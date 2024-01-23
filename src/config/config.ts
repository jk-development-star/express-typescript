import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.DB_URL || '';
const MONGO_DB_NAME = process.env.DB_NAME || '';
const family: number = 4;
const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

const DB_OPTIONS = {
  dbName: MONGO_DB_NAME,
  family: family,
};

export const config = {
  mongo: {
    url: MONGO_URL,
    options: DB_OPTIONS,
  },
  server: {
    port: PORT,
  },
};
