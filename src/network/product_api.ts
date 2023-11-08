import { Product } from "../models/product"

export async function fetchData(input: RequestInfo, init: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errBody = await response.json()
        const errMsg = errBody.error
        throw Error(errMsg)
    }
}


export async function fetchProducts(): Promise<Product[]> {
    const response = await fetchData("api/tree/products", { method: "GET" })
    return response.json()
}

export async function fetchProductsWithId(productId: string): Promise<Product> {
    const response = await fetchData("api/tree/products/" + productId, { method: "GET" })
    return response.json()
}

export async function fetchSellerProducts(sellerId: string): Promise<Product[]> {
    const response = await fetchData("api/tree/products/seller_edit/" + sellerId, { method: "GET" })
    return response.json()
}


export async function fetchProductsSearch(searchQuery: string): Promise<Product[]> {
    const response = await fetchData("api/tree/products/query", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchQuery)
    })
    return response.json()
}


export async function fetchProductsTitle(productName: string): Promise<Product> {

    const response = await fetchData("api/tree/products/search_title/" + productName, { method: "GET" })
    return response.json()
}




export interface ProductInput {
    name: string,
    price: string,
    description: string,
    stock: number,
    seller: string,
    category: string,
    images: string[],
    thumbnail: string
}

export async function createProduct(product: ProductInput) {
    const response = await fetchData("api/tree/products",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
    return response.json()
}

export async function deleteProduct(productId: string) {
    await fetchData("api/tree/products/" + productId, { method: "DELETE" })
}

export async function updateProduct(productId: string, product: ProductInput): Promise<Product> {
    const response = await fetchData("/api/tree/products/" + productId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
    console.log(product)
    return response.json()
}