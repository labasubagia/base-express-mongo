import { initApp } from './loaders/app';
import { initMongo } from './loaders/mongo';

(async (): Promise<void> => {
  try {
    await initMongo();
    await initApp();
  } catch (error) {
    console.error(error);
  }
})();
