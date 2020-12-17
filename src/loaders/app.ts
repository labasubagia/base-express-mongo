import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import router from '../router';
import EnvironmentConfig from '../config/environment';

const app: express.Application = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

export const initApp = async () => {
  app.listen(EnvironmentConfig.port, () => {
    console.log('Server listening at port', EnvironmentConfig.port);
  });
};

export default app;
