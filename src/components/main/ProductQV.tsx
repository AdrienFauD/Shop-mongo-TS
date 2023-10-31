import styles from "../../styles/ProductQV.module.css"
import { Product as ProductModel } from "../../models/product"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { MdDelete } from "react-icons/md"
import { User } from "../../models/user"
import { Link } from "react-router-dom"

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
        images
    } = product


    return (
        <Card
            className={styles.card}
            onClick={() => {
                onProductClicked(product)
                handleUpdateShowEditProduct()
            }}
        >
            <Card.Img  src={thumbnail} className={styles.cardImg} />
            <Card.Body>
                <Link to={name}>
                    <Card.Img src={images && images[0]} className={styles.cardImg} />
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