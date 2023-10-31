import { Nav } from "react-bootstrap"
import { User } from "../../models/user"
import NavLoggedInView from "./NavLoggedInView"
import NavLoggedOutView from "./NavLoggedOutView"

interface NavBarAuthProps {
    loggedinUser: User | null,
    onSignInClicked: () => void
    onLoginClicked: () => void
    onLogOutSuccessFull: () => void
}

const NavBarAuth = ({ loggedinUser, onSignInClicked, onLogOutSuccessFull, onLoginClicked }: NavBarAuthProps) => {
    return (
        <Nav>
            {loggedinUser
                ? <NavLoggedInView user={loggedinUser} onLogoutSuccessfull={onLogOutSuccessFull} />
                : <NavLoggedOutView onLoginClicked={onLoginClicked} onSignInClicked={onSignInClicked} />
            }
        </Nav>

    )
}

export default NavBarAuth
