import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_PAGE_SIZE,
} from '../const/pagination';
import { PaginationData, PaginationParams } from '../types/Pagination';

export default class PaginationHelper {
  public static getAggregateModifier(payload: PaginationParams) {
    return [
      {
        $facet: {
          items: [
            { $skip: this.getSkip(payload) },
            { $limit: payload.pageSize },
          ],
          info: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          total: {
            $ifNull: [{ $arrayElemAt: ['$info.total', 0] }, 0],
          },
        },
      },
      {
        $addFields: {
          last_page: {
            $cond: {
              if: payload.pageSize > 0,
              then: {
                $ceil: {
                  $divide: ['$total', payload.pageSize],
                },
              },
              else: 0,
            },
          },
          current_page: payload.page,
          page_size: payload.pageSize,
        },
      },
      {
        $project: { info: false },
      },
    ];
  }

  public static getDefaultData(
    payload?: PaginationParams
  ): PaginationData<unknown> {
    return {
      items: [],
      total: 0,
      current_page: payload?.page || PAGINATION_DEFAULT_PAGE,
      page_size: payload?.pageSize || PAGINATION_DEFAULT_PAGE_SIZE,
      last_page: 0,
    };
  }

  public static getPaginatedArray<T>(
    array: T[],
    payload: PaginationParams
  ): PaginationData<T> {
    return {
      current_page: payload.page,
      page_size: payload.pageSize,
      total: array.length,
      last_page: array.length ? Math.ceil(array.length / payload.pageSize) : 0,
      items: array.slice(
        this.getSkip(payload),
        payload.pageSize * payload.page
      ),
    };
  }

  public static getSkip(payload: PaginationParams) {
    return payload.pageSize * (payload.page - 1);
  }
}
