import { callApi } from "../api";
import { Method } from "../enums";

export const UserService = class {

    async login(email, password) {
        const request = {
            email,
            password
        };
        const data = JSON.stringify(request)
        return await callApi('login', Method.Post, data)
    }

    async info() {
        return callApi('user/info', Method.Get)
    }
}
