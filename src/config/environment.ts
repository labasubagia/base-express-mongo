import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  databaseUrl: string;
  port: string | number;
}

const environment: Environment = {
  databaseUrl: process.env.DATABASE_URL as string,
  port: process.env.PORT || 5000,
};

export default environment;
