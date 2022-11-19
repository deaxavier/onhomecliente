import { callApi } from "../api";
import { Method } from "../enums";

export const ClockEventsService = class {

    async getEvents(from, to) {
        const request = {from, to};
        const data = JSON.stringify(request)
        return await callApi('clock/events', Method.Post, data);
    }
}