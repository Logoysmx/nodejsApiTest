export interface IProduct {
    id: number;
    product: string;
    description: string;
    price: number;
    offer_price: number,
    model: number;
    added: Date;
    productPreview?:  String;
    external_shops: Object;
    photos?: any[];
    productType: number;
}
