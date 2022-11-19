import { callApi } from "../api"
import { Method } from "../enums"

export const PaymentService = class {
    async getlAll() {
        return await callApi('payment', Method.Get)
    }
}