import { Offcanvas } from "react-bootstrap";
import { Cart } from "../../models/cart";
import OffCanvasCartProductQV from "./products_view/OffCanvasCartProductQV";
import { Link } from "react-router-dom";


interface OffCanvasCartProps {
  show: boolean,
  handleClose: () => void,
  cart: Cart | undefined
}

export default function OffCanvasCart({ show, handleClose, cart }: OffCanvasCartProps) {

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your cart {cart ? "is empty. " : null}</Offcanvas.Title>
        </Offcanvas.Header>
        {cart ?
          <Offcanvas.Body>
            {cart.products.map(product => (
              <OffCanvasCartProductQV product={product} />
            ))
            }
          </Offcanvas.Body>
          : null
        }
      <Link to={"/cart"}>
        <div>Go to your cart</div>
      </Link>
      </Offcanvas>
    </>
  )
}
