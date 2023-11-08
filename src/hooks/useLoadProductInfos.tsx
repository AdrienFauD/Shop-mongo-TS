import { useEffect, useState } from "react";
import { Product as ProductModel } from "../models/product";
import * as ProductApi from "../network/product_api"

export default function useLoadProductInfos(productId: string) {

    const [product, setProduct] = useState<ProductModel>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadProduct(productId: string) {
            try {
                const response = await ProductApi.fetchProductsWithId(productId)
                setProduct(response)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        loadProduct(productId)
    }, [])

    return { product, isLoading }
}