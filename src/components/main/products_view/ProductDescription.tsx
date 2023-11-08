import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { UserContext } from "../../../App"
import { Product as ProductModel } from "../../../models/product"
import appStyles from "../../../styles/App.module.css"
import styles from "../../../styles/ProductDescription.module.css"
import AddToCartButton from "../AddToCartButton"
import Loading from "../Loading"


type ProductDescriptionProps = {
	product: ProductModel,
	onClickAddToCart: (user: string, product: string, iteration: number) => void
}

export default function ProductDescription({ product, onClickAddToCart }: ProductDescriptionProps) {

	const [discountPrice, setDiscountPrice] = useState<string | null>(null)
	const [itemsNumber, setItemsNumber] = useState<number>(0)
	const user = useContext(UserContext)
	const [currentImg, setCurrentImg] = useState<string>()

	useEffect(() => {
		if (product.discount) {
			const newPrice = (parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discount)) / 100).toFixed(2)
			setDiscountPrice(newPrice)
		}
		setCurrentImg(product.images[0])
	}, [])


	const handleUpdateQuantity = (value: number) => {
		if (value < 0 || value > product.stock) return
		if (!value) setItemsNumber(0)
		else {
			setItemsNumber(value)
		}
	}


	return (
		<Container fluid="lg">
			<Row className="justify-content-md-center">
				<Col lg="6" >
					<Row className="justify-content-md-center">
						<Col xs="auto" sm="auto" lg="2">
							{product.images.map(img => (
								<Button
									variant="light"
									key={img}
									className="m-1 imgHoverable"
									onClick={() => { setCurrentImg(img) }}
								>
									<Image src={img} className={styles.imgTiny} />
								</Button>
							))}
						</Col>
						<Col xs="9" sm="9" md="9" lg="9" className="imgHoverable">
							<Image src={currentImg} className={`${styles.imgFull} mt-4`} />
						</Col>
					</Row>
				</Col>
				<Col xs lg="6" >
					<Row className={styles.title}>
						{product.name}
					</Row>
					<Row className={styles.pricing}>
						{product.discount
							? <>
								<p>
									<span className={styles.discount}>{product.discount}% </span>
									<span>{discountPrice} </span>
									<span className={appStyles.crossed}>{product.price} </span>
								</p>
							</>
							: product.price
						}


					</Row>
					<Row className={styles.description}>
						{product.description}
					</Row>
					{user ?
						<AddToCartButton
							itemsNumber={itemsNumber}
							setItemsNumber={setItemsNumber}
							handleUpdateQuantity={handleUpdateQuantity}
							onClickAddToCart={onClickAddToCart}
							userId={user._id}
							productId={product._id}
							stock={product.stock}
						/>
						: null
					}
				</Col>
			</Row>
		</Container>
	)
}
