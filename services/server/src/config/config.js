const dotEnv = require('dotenv');

dotEnv.config();

export const dataBase = {
  database: process.env.MONGODB_DATABASE || 'test',
  URI: process.env.MONGODB_URL || 'mongodb://localhost:27017',
};

export const server = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3001,
};