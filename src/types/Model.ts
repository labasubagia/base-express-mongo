/* eslint-disable camelcase */
import mongoose from 'mongoose';

export interface Timestamps {
  created_at?: string;
  updated_at?: string;
}

export interface BaseModelFields extends Timestamps {
  _id?: mongoose.Types.ObjectId;
}
