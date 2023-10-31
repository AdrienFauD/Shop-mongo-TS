import { useForm } from "react-hook-form"
import {Button, Form} from "react-bootstrap"
import { User } from "../../models/user"
import { SignInCredentials } from "../../network/users_api"
import * as UserApi from "../../network/users_api"
import TextInputField from "../form/TextInputField"


interface SignInFormProps {
    onLoginSuccessfull: (user: User) => void
}

const SignInForm = ({onLoginSuccessfull} : SignInFormProps) =>{

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInCredentials>()

    async function onSubmit(credentials : SignInCredentials){
        try {
            const user = await UserApi.signIn(credentials)
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
            <TextInputField
                name ="email"
                label ="Email"
                type="email"
                placeholder="Email"
                register = {register}
                registerOptions= {{required : "Required"}}
                error={errors.email}
            />
            <Button
                type="submit"
                disabled={isSubmitting}
            >
                SignIn
            </Button>
        </Form>
    )
}

export default SignInForm 