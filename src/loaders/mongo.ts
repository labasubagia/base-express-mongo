/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import EnvironmentConfig from '../config/environment';

export const initMongo = async (dbName?: string) => {
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName,
  };
  if (!dbName) delete options.dbName;
  await mongoose.connect(EnvironmentConfig.databaseUrl, options);
};
