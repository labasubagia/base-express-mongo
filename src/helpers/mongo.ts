export default class MongoHelper {
  public static getNormalizedData<T>(data: T) {
    return JSON.parse(JSON.stringify(data)) as T;
  }
}
