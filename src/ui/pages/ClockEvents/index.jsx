import React, { useEffect, useState } from "react"
import { ClockEventsService } from "../../../business/services/clockevents-service"
import { formatDate, formatNumber }  from "../../../business/helpers/formaters"

import './index.css'


const ClockEventsPage = () => {
    const [events, setEvents] = useState([{}])

    useEffect(() => {
        (async () => {
            await getEvents("month");
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getEvents = async () => {
        const service = new ClockEventsService()
        const date = new Date()
        const from = new Date(date.getFullYear(), date.getMonth(), 1)
        const to = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours())

        const response = await service.getEvents(from, to)
        if (response.ok) {
            const data = await response.text()
            setEvents(JSON.parse(data))
        }
    }

    return (
        <div className="clockevents">
            <h1>Registros do Mês</h1>

            <table className="table">
                <thead>
                    <th>Data Hora</th>
                    <th>Consumo (kWh)</th>
                    <th>Custo do Consumo</th>
                </thead>
                <tbody>
                    {events.map((event, key) => {
                        return (
                            <tr key={key}>
                                <td>{formatDate(event.date, 'DD/MM/YYYY HH:mm')}</td>
                                <td>{event.kwh}</td>
                                <td>R$ {formatNumber(event.partial_cost)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ClockEventsPage