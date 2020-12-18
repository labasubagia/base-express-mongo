/* eslint-disable camelcase */
export interface PaginationParams {
  pageSize: number;
  page: number;
}

export interface PaginationData<T> {
  current_page: number;
  items: T[];
  last_page: number;
  page_size: number;
  total: number;
}
