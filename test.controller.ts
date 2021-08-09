import { Request, Response, response } from 'express';

class ClothingStockController {

    async test(req: Request, res: Response) {
        res.sendStatus(200).json({response: 'Ok'});
    }

}

export const clothingStokController = new ClothingStockController();
