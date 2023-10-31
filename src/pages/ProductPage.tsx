import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as ProductApi from "../network/product_api"
import { Product as ProductModel} from "../models/product"
import ProductDescription from "../components/main/ProductDescription"

export default function ProductPage() {

	const { productId } = useParams<string>()
	const [productName, setProductName] = useState<ProductModel>()

	useEffect(() => {
		async function fetchProductsWithParam() {
			let response: ProductModel
			try {
				if (productId) {
					response = await ProductApi.fetchProductsTitle(productId)
					setProductName(response)
				} 
			} catch (error) {
				console.log(error)
			}
		}
		console.log(productId)
		fetchProductsWithParam()
		
	}, [productId])
	

	return (
		<>
			{productName
				? <ProductDescription product={productName}/>
				: "Product not found"
			}
		</>
	)
}
