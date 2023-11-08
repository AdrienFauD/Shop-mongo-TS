import { Col, Navbar } from "react-bootstrap"
import NavBarAuth from "../auth/NavBarAuth"
import { User } from "../../models/user"
import UserCart from "./UserCartIcon"
import styles from "../../styles/App.module.css"
import { Link } from "react-router-dom"
import UserProducts from "../main/UserProducts"

interface NavigationAuthProps {
	loggedinUser: User | null,
	onSignInClicked: () => void
	onLoginClicked: () => void
	onLogOutSuccessFull: () => void
}

export default function Navigation({ loggedinUser, onSignInClicked, onLoginClicked, onLogOutSuccessFull }: NavigationAuthProps) {
	
	return (
		<Navbar expand="sm" className="bg-dark ">
			<Col sm={9}>
				<Navbar.Brand className={styles.colorWhite}>
					<Link to={"/"}>
						Welcome !!!!
					</Link>
				</Navbar.Brand>
			</Col>
			{loggedinUser && 
			<Col>
				<UserProducts/>
			</Col>
			}
			<Col>
				<NavBarAuth
					loggedinUser={loggedinUser}
					onSignInClicked={onSignInClicked}
					onLogOutSuccessFull={onLogOutSuccessFull}
					onLoginClicked={onLoginClicked}
				/>
			</Col>
			{loggedinUser &&
				<Col>
					<UserCart
						user={loggedinUser._id}
					/>
				</Col>
			}
		</Navbar>
	)
}
