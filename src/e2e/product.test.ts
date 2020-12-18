import request from 'supertest';
import faker from 'faker';
import app from '../loaders/app';
import { closeMongo, initMongo } from '../loaders/mongo';
import ProductModel, { Product } from '../models/product';
import { PaginationData } from '../types/Pagination';
import { ModelDocument } from '../types/Model';
import PaginationHelper from '../helpers/pagination';
import MongoHelper from '../helpers/mongo';

describe('[e2e] Test product route', () => {
  const total = Math.floor(faker.random.number({ min: 5, max: 15 }));
  const products: Product[] = Array(total)
    .fill(null)
    .map(
      () =>
        ({
          name: faker.random.word(),
          quantity: faker.random.number({ min: 1 }),
        } as Product)
    );
  const product = products[0];

  beforeAll(async () => {
    await initMongo('db_e2e_product');
  });

  afterEach(async () => {
    await ProductModel.deleteMany({});
  });

  afterAll(async () => {
    await closeMongo();
  });

  describe('product create', () => {
    it('should be able to create product', async () => {
      expect.hasAssertions();
      const response = await request(app).post('/product').send(product);
      expect((response.body?.data as Product)?.name).toStrictEqual(
        product.name
      );
    });
  });

  describe('get paginate products', () => {
    const pageSize = faker.random.number({ min: 1, max: total });
    const pageNumber = faker.random.number({
      min: 1,
      max: Math.ceil(total / pageSize),
    });
    const url = `/product?page_size=${pageSize}&page=${pageNumber}`;

    beforeEach(async () => {
      await ProductModel.insertMany(products);
    });

    it('should be able to get correct data', async () => {
      expect.hasAssertions();
      const response = await request(app).get(url);
      const actual = response.body?.data as PaginationData<
        ModelDocument<Product>
      >;
      const expected = PaginationHelper.getPaginatedArray(
        MongoHelper.getNormalizedData(await ProductModel.find()),
        { pageSize, page: pageNumber }
      );
      expect(actual).toStrictEqual(expected);
    });
  });
});
