import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {STRINGS} from "../../../../../utils/base";


const defaultState = {
    data: {
        labels: ['January', 'Febuarary', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December"],
        allMonths: ['', 'January', 'February', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: [10, 23, 15, 4, 8, 11, 5, 6, 2, 7, 3, 5],
                label: 'Monthly Packages ',
                fill: false,
                backgroundColor: '#dd6969',
                borderColor: '#dd6969',
                borderWidth: 4
            },
        ],
    }
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const FinancialChart = ({type, data}) => {
    const [init, setInit] = useState(defaultState);

    useEffect(() => {
        if (data !== undefined && type !== undefined) {
            if (type === STRINGS.TYPES.STATS_TYPE.PAYMENT) {
                if (data.length > 0) {
                    console.log("payment", data)
                    setInit({
                        ...init,
                        data: {
                            ...init.data,
                            labels: data.map((d) => {
                                return init.data.allMonths[parseInt(d.month)]
                            }),
                            datasets: init.data.datasets
                        }
                    })
                }
            }
        }
    }, [])
    return (
        <>

            <Line data={init.data} options={options}/>
        </>
    );
}
export default FinancialChart;