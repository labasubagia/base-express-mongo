import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import ProductService from '../services/product';
import { Product } from '../models/product';
import { BaseResponse, ModelResponse } from '../types/Response';
import ValidationHelper from '../helpers/validation';
import { HTTP_CODE_SUCCESS, HTTP_CODE_SUCCESS_INSERT } from '../const/http';
import {
  PAGINATION_DEFAULT_PAGE_SIZE,
  PAGINATION_DEFAULT_PAGE,
} from '../const/pagination';
import { PaginationData } from '../types/Pagination';
import { ModelDocument } from '../types/Model';

export default class ProductController {
  public static validateOnCreate = ValidationHelper.validate(
    checkSchema({
      name: {
        exists: {
          errorMessage: 'Name is required',
        },
      },
      quantity: {
        isInt: {
          errorMessage: 'Quantity must be integer and minimal 0',
          options: { min: 0 },
        },
        optional: true,
        toInt: true,
      },
    })
  );

  public static async create(req: Request, res: Response) {
    const product = await ProductService.create({
      name: req.body?.name,
      quantity: req.body?.quantity,
    });
    const data: BaseResponse<ModelResponse<Product>> = {
      success: true,
      messages: [],
      meta: [],
      data: product,
    };
    return res.status(HTTP_CODE_SUCCESS_INSERT).json(data);
  }

  public static validateOnGetPaginate = ValidationHelper.validate(
    checkSchema({
      page_size: {
        isInt: {
          errorMessage: 'Page size must be integer and minimal 1',
          options: { min: 1 },
        },
        optional: { options: { nullable: true } },
      },
      page: {
        isInt: {
          errorMessage: 'Page size must be integer and minimal 1',
          options: { min: 1 },
        },
        optional: { options: { nullable: true } },
      },
    })
  );

  public static async getPaginate(req: Request, res: Response) {
    const pageSize =
      Number(req.query?.page_size) || PAGINATION_DEFAULT_PAGE_SIZE;
    const page = Number(req.query?.page) || PAGINATION_DEFAULT_PAGE;
    const data: BaseResponse<
      PaginationData<ModelDocument<Product> | unknown>
    > = {
      success: true,
      messages: [],
      meta: [],
      data: await ProductService.getPaginate({ pageSize, page }),
    };
    return res.status(HTTP_CODE_SUCCESS).json(data);
  }
}
