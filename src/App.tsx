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
import { createContext } from "react";
import Cart from "./components/main/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/main/Loading";
import SearchProductPage from "./pages/SearchProductPage";

type UserContextType = User | null

export const UserContext = createContext<UserContextType>(null)

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
		<UserContext.Provider value={loggedinUser}>

			<Container fluid className="m-0 p-0">
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
						path="products"
					>
						<Route 
							index element={<ProductWindow loggedinUser={loggedinUser}/>}
						/>
						<Route
							path=":searchQuery"
							element={<SearchProductPage />}
						/>
					</Route>
					<Route
						path="/cart"
						element={
							loggedinUser
								? <Cart user={loggedinUser} />
								: null
						}
					/>
					<Route
						path="/seller/edit_products"
						element={
							isLoading
								? <Loading />
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
						path=":productParams"
						element={<ProductPage />}
					/>

					<Route
						path="*"
						element={<NotFoundPage />}
					/>
				</Routes>
			</Container>
		</UserContext.Provider>

	);
}

export default App;