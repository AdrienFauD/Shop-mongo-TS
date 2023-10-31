import { Form } from "react-hook-form";
import { useForm } from "react-hook-form"
import TextInputField from "../form/TextInputField";
import * as UserApi from "../../models/user"

type ForgotPasswordCredentials = {
  email: string
}

export default function FormForgotPassword() {
  // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordCredentials>()


  // async function onSubmit(credentials: ForgotPasswordCredentials) {
  //   try {
  //     const user = await UserApi.signIn(credentials)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <></>
    // <Form onSubmit={handleSubmit(onSubmit)}>
    //   <TextInputField
    //     name="input_email"
    //     label="Input_Email"
    //     type="email"
    //     aria-required="true"
    //     aria-disabled="false"
    //     aria-invalid="false"
    //     register={register}
    //     registerOptions={{ required: "Required" }}
    //     erros={errors.email}
    //   />
    // </Form>
  )
}
