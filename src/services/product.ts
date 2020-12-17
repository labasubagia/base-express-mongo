import PaginationHelper from '../helpers/pagination';
import ProductModel, { Product } from '../models/product';
import { ModelDocument } from '../types/Model';
import { PaginationData, PaginationParams } from '../types/Pagination';

export default class ProductService {
  public static async create(payload: Product) {
    const result = await ProductModel.create(payload);
    return result;
  }

  public static async getPaginate(
    payload: PaginationParams
  ): Promise<PaginationData<ModelDocument<Product> | unknown>> {
    const paginated = await ProductModel.aggregate<
      PaginationData<ModelDocument<Product>>
    >([...PaginationHelper.getAggregateModifier(payload)]);
    return paginated.length ? paginated[0] : PaginationHelper.getDefaultData();
  }
}
