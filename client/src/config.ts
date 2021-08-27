import dotenv from 'dotenv';

dotenv.config();

const config = {
  REACT_APP_API_URL: process.env.API_HOST || 'grupo03.sytes.net',
  REACT_APP_CLIENT_URL: process.env.CLIENT_URL || 'grupo03.sytes.net',
  REACT_APP_CLIENT_PORT: process.env.CLIENT_PORT || '3000', //80
  port: process.env.API_PORT || '3001'
};

export default config;
