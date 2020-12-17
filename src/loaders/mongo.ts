import mongoose from 'mongoose';
import EnvironmentConfig from '../config/environment';

const initMongo = async () => {
  await mongoose.connect(EnvironmentConfig.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default initMongo;
