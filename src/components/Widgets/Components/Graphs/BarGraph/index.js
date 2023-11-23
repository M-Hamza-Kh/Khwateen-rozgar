import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {STRINGS} from "../../../../../utils/base";

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

let defaultState = {
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December"],
        allMonths: ['', 'January', 'February', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December"],
        monthly: [
            {
                label: 'Number Of Companies',
                data: [12, 19, 13, 9, 2, 8, 6, 10, 5, 12, 14, 9],
                // backgroundColor: 'rgb(255, 99, 132)',
                backgroundColor: '#c554ae',
            },
            {
                label: 'Number Of Candidiates',
                data: [2, 3, 20, 5, 12, 4, 7, 11, 8, 17, 11, 7],
                backgroundColor: '#1e7aa2',
            },
            {
                label: 'Number of Jobs',
                data: [4, 9, 14, 7, 6, 9, 4, 3, 16, 10, 5, 17],
                backgroundColor: '#7ab3f3',
            },

        ],
        salary: [{
            label: 'Number Of Jobs',
            data: [12, 19, 13, 9, 2, 8, 12, 10],
            backgroundColor: 'rgb(255, 99, 132)',
        }],
        datasets: [
            {
                label: 'Number Of Companies',
                data: [12, 19, 13, 9, 2, 8, 6, 10, 5, 12, 14, 9],
                backgroundColor: '#c554ae',
            },
            {
                label: 'Number Of Candidiates',
                data: [2, 3, 20, 5, 12, 4, 7, 11, 8, 17, 11, 7],
                backgroundColor: '#1e7aa2',
            },
            {
                label: 'Number of Jobs',
                data: [4, 9, 14, 7, 6, 9, 4, 3, 16, 10, 5, 17],
                backgroundColor: '#7ab3f3',
            },

        ],
    }
}

const GroupedBar = ({type, data, chartFor}) => {
    const [init, setInit] = useState(defaultState);

    useEffect(() => {
        if (data !== undefined && type !== undefined) {
            // if (type === STRINGS.TYPES.STATS_TYPE.SALARY) {
            //     if (data.length > 0) {
            //         // console.log("salary",data)
            //         setInit({
            //             ...init,
            //             data: {
            //                 ...init.data,
            //                 labels: ['0 to 10k', '10k to 20k', '20k to 30k', '30k to 40k', '40k to 50k', '50k to 60k', '60k to 70k', '70k to 80k'],
            //                 datasets: init.data.salary
            //             }
            //         })
            //     }
            // }
            if (type === STRINGS.TYPES.STATS_TYPE.MONTHLY) {
                if (data.length > 0) {
                    console.log("monthly", data);
                    setInit({
                        ...init,
                        data: {
                            ...init.data,
                            labels: data.map((d) => {
                                return init.data.allMonths[parseInt(d.month)]
                            }),
                            datasets: [
                                {
                                    ...init.data.datasets[0],
                                    label: chartFor === 1 ? "Number of Employers" : chartFor === 2 ? "Number of Applicants" : chartFor === 3 ? "Monthly Payments" : "Monthly Approved jobs",
                                    backgroundColor: chartFor === 1 ? '#c554ae' : chartFor === 2 ? '#1e7aa2' : chartFor === 3 ? '#7ab3f3' : 'rgb(255, 99, 132)',
                                    data: data.map((d) => parseInt(d.count)),

                                }
                            ]
                        }
                    })
                }
            }
        }
    }, [])

    return <>
        <Bar data={init.data} options={options}/>
    </>
}

export default GroupedBar;