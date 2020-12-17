import { ModelDocument } from './Model';

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

export type ModelResponse<T> = ModelDocument<T> | null;
