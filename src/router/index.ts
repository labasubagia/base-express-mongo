import { Router, Request, Response } from 'express';
import { HTTP_CODE_ERROR_NOT_FOUND, HTTP_CODE_SUCCESS } from '../const/http';
import { BaseResponse } from '../types/Response';
import product from './product';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  const data: BaseResponse<string> = {
    success: true,
    data: 'Server alive',
    messages: [],
    meta: [],
  };
  res.status(HTTP_CODE_SUCCESS).json(data);
});

router.use('/product', product);

// 404
router.use((_: Request, res: Response) => {
  const data: BaseResponse<null> = {
    success: false,
    data: null,
    messages: ['Page not found'],
    meta: [],
  };
  res.status(HTTP_CODE_ERROR_NOT_FOUND).json(data);
});

export default router;
