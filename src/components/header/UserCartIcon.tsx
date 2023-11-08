import { useEffect, useState } from "react";
import { Cart } from "../../models/cart";
import * as UserApi from "../../network/users_api";
import styles from "../../styles/App.module.css";
import { Button } from "react-bootstrap";
import OffCanvasCart from "../main/OffCanvasCart";

type CartProps = {
  user: string,
}

export default function UserCart({ user }: CartProps) {

  const [userCart, setUserCart] = useState<Cart>()
  const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false)


  useEffect(() => {
    async function fetchGetUserCart(userid: string) {
      try {
        const response = await UserApi.getUserCart(userid)
        setUserCart(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetUserCart(user)
  }, [userCart, user])


  const handleShowOffCanvas = () => setShowOffCanvas(true);
  const handleClose = () => setShowOffCanvas(false);


  return (
    <>
      <Button className={styles.basket} onClick={handleShowOffCanvas}>
        {JSON.stringify(userCart?.products.length)}
      </Button>
      {showOffCanvas &&
        <OffCanvasCart
          show={showOffCanvas}
          handleClose={handleClose}
          cart={userCart}
        />
      }

    </>
  )
}
