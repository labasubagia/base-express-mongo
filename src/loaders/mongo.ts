import mongoose from 'mongoose';
import environment from '../config/environment';

const initMongo = async () => {
  await mongoose.connect(environment.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default initMongo;
