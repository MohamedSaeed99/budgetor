import type { User } from "../../models/User.models";
import api from "../axios.config"

export const login = async (user: User) => {
    const response = await api.post('/login', user)
    setTokens(response.data)
}

export const register = async (user: User) => {
    const response = await api.post('/register', user)
    setTokens(response.data)
}

const setTokens = (data: any) => {
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("refresh_token", data.refresh_token)
}