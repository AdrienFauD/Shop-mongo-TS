import { fetchData } from "./product_api";
import { User } from "../models/user"
import { Cart } from "../models/cart"


export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/tree/users", {
        method: "GET"
    })
    return response.json()
}

export interface SignInCredentials {
    username: string,
    email: string,
    password: string
}

export async function signIn(credentials: SignInCredentials): Promise<User> {
    const response = await fetchData("/api/tree/users/signin", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/tree/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout() {
    await fetchData("api/tree/users/logout", { method: "POST" })
}

export type GetUserCartCredentials = {
    userId: string
}

export async function getUserCart(credentials: string): Promise<Cart> {
    const response = await fetchData("api/tree/carts/"+credentials, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    return response.json()
}