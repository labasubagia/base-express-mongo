import dotenv from 'dotenv';

dotenv.config();

export default class EnvironmentConfig {
  public static databaseUrl = process.env.DATABASE_URL as string;

  public static port = process.env.PORT || 5000;
}
