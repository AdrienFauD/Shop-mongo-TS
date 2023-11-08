import { User } from "../models/user";
import * as ProductApi from "../network/product_api"
import { useEffect, useState } from "react"
import { Product as ProductModel } from "../models/product"
import AddEditProductForm from "../components/main/AddEditProductForm";


type EditProductPageProps = {
    loggedinUser: User | null,
}

export default function EditProductPage({ loggedinUser }: EditProductPageProps) {

    const [sellerProducts, setSellerProducts] = useState<ProductModel[]>([])

    useEffect(() => {
        async function fetchProducts(seller: false | string) {
            if (!seller) {
                return
            }
            try {
                const sellerProducts = await ProductApi.fetchSellerProducts(seller)
                setSellerProducts(sellerProducts)
            } catch (error) {
                console.error(error)
            }
        }
        if (loggedinUser) {
            fetchProducts(loggedinUser.seller)
        }
    }, [loggedinUser])

    return (
        <>
            {sellerProducts.map(product => (
                <>
                    <AddEditProductForm
                        productToEdit={product}
                        onProductSaved={() => { }}
                    />
                </>
            ))}
        </>
    )
}
