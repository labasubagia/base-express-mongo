import PaginationHelper from '../helpers/pagination';
import ProductModel, { Product } from '../models/product';
import { PaginationParams } from '../types/Pagination';
import { ModelResponse } from '../types/Response';

export default class ProductService {
  public static async create(payload: Product) {
    const result = await ProductModel.create(payload);
    return result;
  }

  public static async getPaginate(payload: PaginationParams) {
    const result = await ProductModel.aggregate<ModelResponse<Product>>([
      { $skip: PaginationHelper.getSkip(payload.pageSize, payload.page) },
      { $limit: payload.pageSize },
    ]);
    return result;
  }
}
