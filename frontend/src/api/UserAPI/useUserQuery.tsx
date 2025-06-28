import { useMutation } from "@tanstack/react-query";
import { login, register } from "./UserAPI";
import type { User } from "../../models/User.models";

const UserAPI = {
    Login: {
        useMutation: () =>
            useMutation({
                mutationFn: (user: User) => login(user),
            })
    },
    Register: {
        useMutation: () =>
            useMutation({
                mutationFn: (user: User) => register(user),
            })
    },
    // RefreshToken: {
    //     useMutation: () =>
    //         useMutation({
    //             mutationFn: (token: string) => refreshToken(token),
    //         })
    // },
    // Logout: {
    //     useMutation: () =>
    //         useMutation({
    //             mutationFn: () => logout(),
    //         })
    // }
}

export default UserAPI;
