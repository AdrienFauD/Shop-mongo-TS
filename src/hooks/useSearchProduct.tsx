import { useEffect, useState } from "react"
import * as ProductApi from "../network/product_api"
import { Product as ProductModel } from "../models/product"

export default function useSearchProduct(query: string) {

    const [searchResult, setSearchResult] = useState<ProductModel[]>()
    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await ProductApi.fetchProductsSearch(query)
                setSearchResult(response)
            } catch (error) {
                console.error(error)
            }
        }
        loadProduct()
    }, [])


    return { searchResult }
}
