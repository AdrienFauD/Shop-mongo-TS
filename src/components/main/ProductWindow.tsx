import { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap"
import { Product as ProductModel } from "../../models/product"
import * as ProductApi from "../../network/product_api"
import ProductQV from './ProductQV'
import { User } from '../../models/user'

type ProductWindowProps = {
    loggedinUser: User | null
}

export default function ProductWindow(loggedinUser: ProductWindowProps) {
    const [products, setProducts] = useState<ProductModel[]>([])
    const [productToEdit, setProductToEdit] = useState<ProductModel | null>(null)
    const [showAddEditProduct, setShowAddEditProduct] = useState<0 | 1>(0)

    useEffect(() => {
        async function loadProducts() {
            try {
                const products = await ProductApi.fetchProducts()
                setProducts(products)
            } catch (error) {
                alert(error)
            }
        }
        loadProducts()
    }, [])

    async function deleteProduct(product: ProductModel) {
        try {
            await ProductApi.deleteProduct(product._id)
            setProducts(products.filter(existingProduct => existingProduct._id !== product._id))
        } catch (error) {
            console.error();
            alert(error)
        }
    }


    function handleUpdateShowEditProduct() {
        setShowAddEditProduct(1)
    }

    return (
        <Row>
            {products.map(product => (
                <Col key={product._id}>
                    <ProductQV
                        product={product}
                        loggedinUser={loggedinUser.loggedinUser}
                        key={product._id}
                        handleUpdateShowEditProduct={handleUpdateShowEditProduct}
                        onProductClicked={setProductToEdit}
                        onDeleteProductClicked={deleteProduct}
                    />
                </Col>
            ))}
        </Row>
    )
}

