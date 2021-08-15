import dotenv from 'dotenv';

dotenv.config();

const config = {

  REACT_APP_API_URL: process.env.API_HOST || '190.106.131.153',
  port: process.env.API_PORT || '3001',
};

export default config;
