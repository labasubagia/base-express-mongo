import { Router } from 'express';
import ProductController from '../controllers/product';

const router = Router();

router.post('/', ProductController.validateOnCreate, ProductController.create);

router.get(
  '/',
  ProductController.validateOnGetPaginate,
  ProductController.getPaginate
);

export default router;
