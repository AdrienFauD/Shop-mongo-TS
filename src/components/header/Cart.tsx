import { useEffect, useState } from "react";
import { Cart } from "../../models/cart";
import * as UserApi from "../../network/users_api";
import styles from "../../styles/App.module.css";

type CartProps = {
  user: string,
}

export default function UserCart({ user }: CartProps) {

  const [userCart, setUserCart] = useState<Cart>()

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
  }, [user])

  return (
    <div className={`basket ${styles.basket}`}>
      {JSON.stringify(userCart?.products.length)}
    </div>
  )
}
