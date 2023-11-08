import { Button, Card } from "react-bootstrap"
import { Product } from "../../../models/product"
import { useEffect, useState } from "react"
import * as ProductApi from "../../../network/product_api";
import { Link } from "react-router-dom";
import styles from "../../../styles/ProductCart.module.css"


interface OffCanvasCartProductQVProps {
  product: string
}

export default function OffCanvasCartProductQV({ product }: OffCanvasCartProductQVProps) {

  const [productData, setProductData] = useState<Product>()
  const [discountedPrice, setDiscountedPrice] = useState<number>()

  useEffect(() => {
    async function loadProduct(productId: string) {
      try {
        const response = await ProductApi.fetchProductsWithId(productId)
        setProductData(response)
      } catch (error) {
        console.error(error)
      }
    }
    loadProduct(product[0])
  })

  if (!productData) return null

  return (
    <Card className="text-center bg-dark text-white">
      <Link to={productData.name}>
        <Card.Img src={productData?.thumbnail} className={`${styles.cartImgProduct} bg-white`} />
      </Link>
      <Card.Body >
        <Card.Text>{productData.price} </Card.Text>
        <Card.Text>Quantity : {product[1]}</Card.Text>
      </Card.Body>
    </Card>
  )
}
