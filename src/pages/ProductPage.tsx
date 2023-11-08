import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductDescription from "../components/main/products_view/ProductDescription"
import { Product as ProductModel } from "../models/product"
import * as ProductApi from "../network/product_api"
import * as UserApi from "../network/users_api"
import Loading from "../components/main/Loading"

export default function ProductPage() {

	const { productParams } = useParams<string>()
	const [productName, setProductName] = useState<ProductModel>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		async function fetchProductsWithParam() {
			let response: ProductModel
			try {
				if (productParams) {
					console.log(productParams)
					response = await ProductApi.fetchProductsTitle(productParams)
					setProductName(response)
					setIsLoading(false)
				}
			} catch (error) {
				console.log(error)
			}
		}
		console.log(productParams)
		fetchProductsWithParam()

	}, [productParams])

	async function handleAddProductToCart(userId: string, productId: string, productIteration: number) {
		try {
			if (!productId || !userId) return
			await UserApi.updateUserCart(userId, productId, productIteration)

		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			{productName
				? <ProductDescription onClickAddToCart={handleAddProductToCart} product={productName} />
				: isLoading
					? <Loading />
					: "Product not found"
			}
		</>
	)
}
