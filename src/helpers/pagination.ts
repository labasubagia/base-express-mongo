export default class PaginationHelper {
  public static getSkip(pageSize: number, page: number) {
    return pageSize * (page - 1);
  }
}
