import { Document } from 'mongoose';

export interface BaseResponse<T> {
  success: boolean;
  data: T;
  messages: string[];
  meta: string[];
}

export interface ErrorResponse<T> {
  errors: {
    [key in keyof T]: string;
  };
}

export type ModelResponse<T> = (T & Document<unknown>) | null;
