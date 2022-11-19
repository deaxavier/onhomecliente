import React from "react"
import Highcharts from 'highcharts'
import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { formatDate, formatNumber }  from "../../../business/helpers/formaters"
import { PaymentService } from "../../../business/services/payment-service"
import './index.css'
const PaymentPage = () => {
    const [payments, setPayments] = useState([{}])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            await getAllPayments();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const labelText = status => {
        let result = 'label '
        switch(status) {
            case 'Pago':
                result += 'success'
                break
            case 'Em Aberto':
                result += 'warning'
                break
            default:
                result += 'danger'
        }
        return result;
    }

    const getAllPayments = async () => {
        setLoading(true)
        const service = new PaymentService()
        const response = await service.getlAll()
        if (response.ok) {
            const data = await response.text()
            loadPaymentChart(JSON.parse(data))
            setPayments(JSON.parse(data))
        }
        setLoading(false)
    }

    const loadPaymentChart = payments => {
        const data = []
        // eslint-disable-next-line
        payments.map(payment => {
            data.push({
                name: formatDate(payment.dueDate, 'D/MM/yyyy'),
                y: payment.cost
            })
        })
        Highcharts.chart('payments_chart', {
            chart: {
                type: 'column'
            },
            title: {
                align: 'left',
                text: 'Faturas'
            },
            subtitle: {
                align: 'left',
                text: 'Veja o historico da sua conta'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Valores'
                }

            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: 'R$ {point.y:.2f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>R$ {point.y:.2f}</b><br/>'
            },
            series: [
                {
                    name: "Faturas",
                    colorByPoint: true,
                    data
                }
            ]
        })
    };

    return (
        <div className="payment">
            <h2>Pagamentos</h2>
            {loading ?? <LinearProgress color="primary" />} 
            <div id="payments_chart" className="payments_chart">
            </div>
            <table className="table">
                <thead>
                    <td>Valor</td>
                    <td>Vencimento</td>
                    <td>Data Pagamento</td>
                    <td>Status</td>
                </thead>
                <tbody>
                    {payments.map((payment, i) => {
                        return (
                            <tr key={i}>

                                <td>R$ {formatNumber(payment.cost)}</td>
                                <td>{formatDate(payment.dueDate, 'D/MM/yyyy')}</td>
                                <td>{formatDate(payment.paymentAt, 'D/MM/yyyy')}</td>
                                <td><span className={labelText(payment.status)}>
                                    {payment.status}</span></td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default PaymentPage