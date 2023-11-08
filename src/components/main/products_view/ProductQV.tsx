import styles from "../../../styles/ProductQV.module.css"
import { Product as ProductModel } from "../../../models/product"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { MdDelete } from "react-icons/md"
import { User } from "../../../models/user"
import { Link } from "react-router-dom"
import { Col } from "react-bootstrap"

interface ProductProps {
    product: ProductModel,
    loggedinUser: User | null,
    onProductClicked: (product: ProductModel) => void,
    onDeleteProductClicked: (product: ProductModel) => void,
    handleUpdateShowEditProduct: () => void
}

const ProductQV = ({ product, loggedinUser, onProductClicked, onDeleteProductClicked, handleUpdateShowEditProduct }: ProductProps) => {

    const {
        thumbnail,
        name,
        price,
        description,
        rating,
        seller,
    } = product


    return (
        <Card
            className={styles.card}
            onClick={() => {
                onProductClicked(product)
                handleUpdateShowEditProduct()
            }}
        >
            <Card.Header className="m-2">
                <Link to={name}>
                <Card.Img src={thumbnail} className={styles.cardImg} />
            </Link>
            </Card.Header>
            <Card.Body>
                <Link to={name}>
                    <Card.Title>
                        {name}
                        {loggedinUser &&
                            <MdDelete
                                className="text-muted ms-auto"
                                onClick={(e) => {
                                    onDeleteProductClicked(product)
                                    e.stopPropagation()
                                }}
                            />
                        }
                    </Card.Title>
                </Link>
                <Card.Text>{price}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{rating}</Card.Text>
                <Card.Text>{seller}</Card.Text>
                <Button variant="dark"><Link to={name}>Go to product</Link></Button>
            </Card.Body>
        </Card>
    )
}

export default ProductQV