import { Router } from 'express';
import { clothingStokController } from './test.controller';

class ClothingStockRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/test', clothingStokController.test);
    }
}

const clothingStokRoutes = new ClothingStockRoutes();
export default clothingStokRoutes.router;
