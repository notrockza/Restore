export interface Product {
    id:              number;
    name:            string;
    description:     string;
    price:           number;
    pictureUrl:      string;
    type?:            string;
    brand:           string;
    quantityInStock?: number;
}
//? จะใช่หรือไม่ใช่ก็ได้นะ (หรือยังไม่ใช้)