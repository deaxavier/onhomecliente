import { Enviroment } from "./configs/enviroment";

export const callApi = async (url, method, body = null) => {
    const enviroment = new Enviroment()
    const token = localStorage.getItem(enviroment.token_key)
    try {
        return await fetch(enviroment.api_url + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token ?? ''
            },
            body
        });
    } catch (e) {
        console.log(e);
    }
}