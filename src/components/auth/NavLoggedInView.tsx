import { Button } from "react-bootstrap"
import { User } from "../../models/user"
import * as UserApi from "../../network/users_api"

interface LogOutProps {
    user: User,
    onLogoutSuccessfull: () => void
}

const NavLoggedInView = ({ user, onLogoutSuccessfull }: LogOutProps) => {

    async function logout() {
        try {
            await UserApi.logout()
            onLogoutSuccessfull()
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    return(
        <>
            <div>{user.username}</div>
            <Button className="p-2" variant="dark" onClick={logout}>Log out</Button>
        </>
    )
}

export default NavLoggedInView