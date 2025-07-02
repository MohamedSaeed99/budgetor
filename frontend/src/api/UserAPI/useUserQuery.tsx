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
}

export default UserAPI;
