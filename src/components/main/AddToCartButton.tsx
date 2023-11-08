import { Button, ButtonToolbar, Col, Form } from 'react-bootstrap'
import styles from "../../styles/ProductDescription.module.css"


interface AddToCartButtonProps {
    userId: string,
    productId: string,
    stock: number,
    itemsNumber: number,
    setItemsNumber: (number: number) => void,
    handleUpdateQuantity: (value: number) => void,
    onClickAddToCart: (user: string, product: string, iteration: number) => void
}

export default function AddToCartButton({ userId, productId, stock, itemsNumber, setItemsNumber, handleUpdateQuantity, onClickAddToCart }: AddToCartButtonProps) {

    return (
        <ButtonToolbar>
            <Col xs={1} onClick={() => {
                if (itemsNumber > 0) setItemsNumber(itemsNumber - 1)
            }}>
                <Button className={styles.changeQuantityBox} >
                    -
                </Button>
            </Col>
            <Col xs={1}>
                <Form.Control
                    size="sm"
                    type="text"
                    onChange={(e) => handleUpdateQuantity(parseFloat(e.target.value))}
                    value={itemsNumber}
                    min={0}
                    max={10}
                />
            </Col>
            <Col xs={1} onClick={() => { if (itemsNumber < stock) setItemsNumber(itemsNumber + 1) }}>
                <Button className={styles.changeQuantityBox} >
                    +
                </Button>
            </Col>
            <Col>
                <Button 
                variant='outline-warning'
                size={'lg'} 
                onClick={() => { console.log(itemsNumber); onClickAddToCart(userId, productId, itemsNumber) }}>
                    Add to your basket
                </Button>
            </Col>
        </ButtonToolbar>
    )
}
