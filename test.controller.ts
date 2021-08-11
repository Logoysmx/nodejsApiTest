import { Request, Response, response } from 'express';
import db from './database';
import { IProduct } from "./products.interface";

class ClothingStockController {

    async test(req: Request, res: Response) {
        res.json({'response': 'Ok'});
    }

    async listClothingModel(req: Request, res: Response) {
        // const { productType, limit } = req.params;
        
        const limit = parseInt(req.params.limit);
        const productType = parseInt(req.params.productType);
        const offers = req.params.filterByOffer && req.params.filterByOffer ==='offers' ? true : false;
        const brandFilter = req.params.filterByBrand && req.params.filterByBrand ==='filter' ? true : false;
    
    
        const result = await db.query(
        'CALL getProducts(?, ?)', 
        [productType, limit], 
        (error:any, results:any, fields:any) => {
            if(!error) {
                let objResponse: IProduct[] = [];
                results[0].forEach((element:any, index:number) => {
    
                    objResponse.push({
                        id: element.id_product,
                        product: element.product_name,
                        description: element.product_description,
                        price: element.product_price,
                        offer_price: element.product_offer_price,
                        model: element.model,
                        added: element.created_datetime,
                        productPreview: element.photo,
                        productType: element.product_type,
                        external_shops: {
                            ml: {
                                url: element.url_product_ml,
                                shortner: element.url_product_tracker
                            }
                        }
                    });
                });
    
                objResponse = objResponse.filter((thing:any, index:number, self:any) =>
                    index === self.findIndex((t:any) => (
                        t.id === thing.id
                    ))
                );
    
                //Filtering if the list of products has offers
                if(offers) {
                    let products = objResponse.filter(p => p.offer_price != 0);
                    res.json(products);
                } else {
                    res.json(objResponse);
                }
                
            } else{
                res.sendStatus(404).json({error: 'Error'});
            }
        });
    }    

}

export const clothingStokController = new ClothingStockController();
