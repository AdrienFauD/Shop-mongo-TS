import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavBarLoggedOutViewProps {
    onSignInClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignInClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button variant="dark" onClick={onSignInClicked}><Link to={"/signin"}>Sign Up</Link></Button>
            <Button variant="dark" onClick={onLoginClicked}><Link to={"/login"}>Log In</Link></Button>
        </>
    );
}

export default NavBarLoggedOutView