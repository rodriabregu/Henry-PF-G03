import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes/index';
import { error } from "./@app";
/* import config from './lib/config'; */

const app: Application = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' })); //middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(express.static('public'))

app.use((err: error, _req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.use('/api',routes);

export default app;
