import dotenv from 'dotenv';

dotenv.config();

const config = {
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'clubdb',
  dbPort: process.env.DB_PORT || '5432',
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.API_PORT || '3001',
  clientPort: process.env.CLIENT_PORT || '3000',
  host: process.env.API_HOST || 'localhost',//'grupo03.sytes.net'
  cors: process.env.CORS || 'localhost:3000',//'grupo03.sytes.net:3000'
};

export default config;