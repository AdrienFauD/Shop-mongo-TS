import { useForm } from "react-hook-form"
import {Button, Form} from "react-bootstrap"
import { User } from "../../models/user"
import { LoginCredentials } from "../../network/users_api"
import * as UserApi from "../../network/users_api"
import TextInputField from "../form/TextInputField"

interface LoginFormProps {
    onLoginSuccessfull: (user: User) => void
}

const LoginForm = ({onLoginSuccessfull} : LoginFormProps) =>{

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>()

    async function onSubmit(credentials : LoginCredentials){
        try {
            const user = await UserApi.login(credentials)
            onLoginSuccessfull(user)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
                name ="username"
                label ="Username"
                type="text"
                placeholder="Username"
                register = {register}
                registerOptions= {{required : "Required"}}
                error={errors.username}
            />
            <TextInputField
                name ="password"
                label ="Password"
                type="password"
                placeholder="Password"
                register = {register}
                registerOptions= {{required : "Required"}}
                error={errors.password}
            />
            <Button
                type="submit"
                disabled={isSubmitting}
            >
                Log in
            </Button>
            <Form.Label>Forgot password</Form.Label>
        </Form>
    )
}

export default LoginForm