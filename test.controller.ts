import { Request, Response, response } from 'express';

class ClothingStockController {

    async test(req: Request, res: Response) {
        res.json({'response': 'Ok'});
    }

}

export const clothingStokController = new ClothingStockController();
