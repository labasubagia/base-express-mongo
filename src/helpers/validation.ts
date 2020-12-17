import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BaseResponse, ErrorResponse } from '../types/Response';
import { HTTP_CODE_ERROR_VALIDATION } from '../const/http';

interface FormattedError {
  [key: string]: string;
}

export default class ValidationHelper {
  public static validate(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map((validation) => validation.run(req)));
      const errors = validationResult(req);
      if (errors.isEmpty()) return next();
      const formattedErrors: FormattedError = Object.assign(
        {},
        ...Object.entries(errors.mapped()).map(([key, error]) => ({
          [key]: error.msg,
        }))
      );
      const data: BaseResponse<ErrorResponse<FormattedError>> = {
        success: false,
        messages: ['Validation error'],
        meta: [],
        data: { errors: formattedErrors },
      };
      return res.status(HTTP_CODE_ERROR_VALIDATION).json(data);
    };
  }
}
