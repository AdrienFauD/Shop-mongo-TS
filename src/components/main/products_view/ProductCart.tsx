import { useContext, useEffect } from "react"
import { Col, Image, Row } from "react-bootstrap"
import useLoadProductInfos from "../../../hooks/useLoadProductInfos"
import styles from "../../../styles/ProductCart.module.css"
import { UserContext } from "../../../App"

interface ProductCartProps {
    productId: string,
    updateTotalArticle: () => void,
    updateIsLoading: () => void
}

export default function ProductCart({ productId, updateTotalArticle, updateIsLoading }: ProductCartProps) {

    const { product, isLoading } = useLoadProductInfos(productId)

    const user=useContext(UserContext)

    useEffect(() => {
        updateTotalArticle()
        updateIsLoading()
    }, [])

    if (isLoading) return (
        <Row className={styles.cartPlaceholderInfos}>
            <Col xs={3} className={styles.cartPlaceholderImg}>
            </Col>
            <Col className={styles.cartPlaceholderColDesc}>
            </Col>
        </Row>
    )

    return (
        <>
            <Row>
                <Col xs={3}>
                    <Image style={{ maxWidth: '100px', margin: '0 auto' }} src={product?.thumbnail} />
                </Col>
                <Col className="m-2">
                    <Row className="h2">{product?.name}</Row>
                    <Row>{product?.price}</Row>
                    <Row>{product?.stock} in stock</Row>
                    <Row>
                        {/* <AddToCartButton 
                            userId={user?._id}
                            productId={productId}
                            stock={product?.stock}
                            itemsNumber={itemsNumber}
                            setItemsNumber={setItemsNumber}
                            handleUpdateQuantity={handleUpdateQuantity}
                            onClickAddToCart={onClickAddToCart}
                        /> */}
                    </Row>

                </Col>
            </Row>

        </>
    )
}
