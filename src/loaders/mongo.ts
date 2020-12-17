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

export const closeMongo = async () => {
  await mongoose.connection.close();
};
