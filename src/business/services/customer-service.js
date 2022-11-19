import { callApi } from "../api"
import { Method } from "../enums"

export const CustomerService = class {

    async info() {
        return callApi('customer/info', Method.Get)
    }

    async save(request) {
        const data = JSON.stringify(request)
        return callApi('customer', Method.Put, data)
    }
}