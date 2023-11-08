import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Cart as CartModel } from '../../models/cart'
import { User } from '../../models/user'
import * as UserApi from "../../network/users_api"
import ProductCart from './products_view/ProductCart'
import ConfirmOrder from './ConfirmOrder'
import Loading from './Loading'

interface CartProps {
    user: User
}

export default function Cart({ user }: CartProps) {

    const [userCart, setUserCart] = useState<CartModel>()
    const [totalItems, setTotalItems] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [showConfirmOrder, setShowConfirmOrder] = useState(false)

    useEffect(() => {
        async function fetchGetUserCart(userid: string) {
            try {
                const response = await UserApi.getUserCart(userid)
                setUserCart(response)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        fetchGetUserCart(user._id)
    }, [userCart, user])


    if (!user) return null

    return (
        <Container>
            <Row>
                <Col >
                    <div> Your cart </div>
                </Col>
            </Row>
            {isLoading && 
                <Loading />
            }
            {userCart?.products.map(product => (
                <>
                    <ProductCart
                        productId={product[0]}
                        updateTotalArticle={() => { setTotalItems(prev => prev + parseFloat(product[1])) }}
                        updateIsLoading={() => setIsLoading(false)}
                    />
                </>
            ))}

            <Row>
                Total ({totalItems} articles) : Price discounted
            </Row>
            <Row>
                <Button onClick={() =>{setShowConfirmOrder(true)}}>Izi</Button>
            </Row>
            <ConfirmOrder 
            show={showConfirmOrder}
            handleClose={() => setShowConfirmOrder(false)}
            />
        </Container>
    )
}
