import { SchemaOptions } from 'mongoose';

export default class ModelConfig {
  public static customTimestamps: SchemaOptions['timestamps'] = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
}
