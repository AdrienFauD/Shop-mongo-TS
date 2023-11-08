export interface Product {
    _id : string,
    createdAt : string,
    name : string,
    price : string,
    discount? : string,
    rating : string,
    description : string,
    stock : number,
    seller : string,
    quantitySold : string,
    category : string,
    images : string[],
    thumbnail : string
}