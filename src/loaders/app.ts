import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import router from '../router';
import environment from '../config/environment';

export const app: express.Application = express();

const initApp = async () => {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);
  app.listen(environment.port, () => {
    console.log('Server listening at port', environment.port);
  });
};

export default initApp;
