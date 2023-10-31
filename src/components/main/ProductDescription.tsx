import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Product as ProductModel } from "../../models/product"
import styles from "../../styles/ProductDescription.module.css"
import appStyles from "../../styles/App.module.css"
import { useEffect, useState } from "react"

type ProductDescriptionProps = {
	product: ProductModel
}

export default function ProductDescription(product: ProductDescriptionProps) {

	const [discountPrice, setDiscountPrice] = useState<string | null>(null)

	useEffect(() => {
		if (product.product.discount) {
			const newPrice = (parseFloat(product.product.price) - (parseFloat(product.product.price) * parseFloat(product.product.discount)) / 100).toFixed(2)
			setDiscountPrice(newPrice)
		}
	})


	// _id : string,
	// createdAt : string,
	// name : string,
	// price : string,
	// discount? : string,
	// rating : string,
	// description : string,
	// stock : string,
	// seller : string,
	// quantitySold : string,
	// category : string,
	// images : string[],
	// thumbnail : string


	return (
		<Container fluid="md">
			<Row>
				<Col>
					<Row>
						<Col xs={1} >
							{product.product.images.map(img => (
								<p><Image src={img} className={styles.imgTiny} /></p>
							))}
						</Col>
						<Col xs={11}>
							<Image src={product.product.thumbnail} className={styles.imgFull} fluid />
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className={styles.title}>
						{product.product.name}
					</Row>
					<Row className={styles.pricing}>
						{product.product.discount
							? <>
								<p>
									<span className={styles.discount}>{product.product.discount}% </span>
									<span>{discountPrice} </span>
									<span className={appStyles.crossed}>{product.product.price} </span>
								</p>
							</>
							: product.product.price
						}


					</Row>
					<Row className={styles.description}>
						{product.product.description}
					</Row>
					<Row>
						<Button>
							Add to your basket

						</Button>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}
