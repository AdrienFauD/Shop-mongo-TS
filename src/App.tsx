import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignInForm from "./components/auth/SignInForm";
import Navigation from "./components/header/Navigation";
import ProductWindow from "./components/main/ProductWindow";
import { User } from "./models/user";
import * as UserApi from "./network/users_api";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";


function App() {
	const [loggedinUser, setLoggedinUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [showLoginForm, setShowLoginForm] = useState<boolean>(false)
	const [showSignInForm, setShowSignInForm] = useState<boolean>(false)


	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLoggedInUser()
				setLoggedinUser(user)
			} catch (error) {
				console.error(error)
			}
			setIsLoading(false)
		}
		fetchLoggedInUser()
	}, [])


	return (
		<Container>
			<Navigation
				loggedinUser={loggedinUser}
				onLogOutSuccessFull={() => { setLoggedinUser(null) }}
				onLoginClicked={() => { setShowLoginForm(true); setShowSignInForm(false) }}
				onSignInClicked={() => { setShowSignInForm(true); setShowLoginForm(false) }}
			/>

			<Routes>
				<Route
					path="/"
					element={
						<ProductWindow
							loggedinUser={loggedinUser}
						/>
					}
				/>
				<Route
					path="edit_products"
					element={
						isLoading
							? null
							: loggedinUser
								? <EditProductPage loggedinUser={loggedinUser} />
								: <Navigate to={"/login"} />

					}
				/>
				<Route
					path="signin"
					element=
					{
						loggedinUser
							? <Navigate to={"/"} />
							: <SignInForm
								onLoginSuccessfull={(user) => {
									setLoggedinUser(user)
									setShowSignInForm(false)
								}}
							/>
					}
				/>
				<Route
					path="login"
					element=
					{
						loggedinUser
							? <Navigate to={"/"} />
							: <LoginForm
								onLoginSuccessfull={(user) => {
									setLoggedinUser(user)
									setShowLoginForm(false)
								}}
							/>
					}
				/>
				<Route
					path="/:productId"
					element={<ProductPage />}
				/>

			</Routes>
		</Container>

	);
}

export default App;