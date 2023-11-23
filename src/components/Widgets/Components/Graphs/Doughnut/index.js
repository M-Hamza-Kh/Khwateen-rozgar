import React, {useEffect, useState} from "react";
import "./index.css"
import {Doughnut} from 'react-chartjs-2';
import {STRINGS} from "../../../../../utils/base";

const defaultState = {
    data: {
        labels: [],
        datasets: [
            {
                label: 'No of Employers',
                data: [342, 231],
                // backgroundColor: [
                //     '#dd6969',
                //     '#e6d251',
                // ],
                // borderColor: [
                //     '#dd6969',
                //     '#e6d251',
                // ],
                backgroundColor: [
                    '#c554ae',
                    '#1e7aa2',
                    '#8cb677',
                    '#58b4bb',
                    '#314e6d',
                    '#7ab3f3',
                    '#7b14e3',
                ],
                borderColor: [
                    '#c554ae',
                    '#1e7aa2',
                    '#8cb677',
                    '#58b4bb',
                    '#314e6d',
                    '#7ab3f3',
                    '#7b14e3',
                ],
                borderWidth: 3,
            },
        ],
    }

}

export default function DoughnutChart({type, data}) {
    const [init, setInit] = useState(defaultState);

    useEffect(() => {
        if (data !== undefined && type !== undefined) {
            if (type === STRINGS.TYPES.STATS_TYPE.CITY) {
                console.log("city", data.map((d) => {
                    return `${d.name}`
                }))
                if (data.length > 0) {
                    setInit({
                        ...init,
                        data: {
                            ...init.data,
                            labels: data.map((d) => {
                                return `${d.name}`
                            }),
                            datasets: [
                                {
                                    ...init.data.datasets[0],
                                    data: data.map((d) => parseInt(d.count))
                                }
                            ]
                        }
                    })
                }
            }
            if (type === STRINGS.TYPES.STATS_TYPE.MARITAL) {
                console.log("marital", data.map((d) => {
                    return `${d.name}`
                }))
                if (data.length > 0) {
                    setInit({
                        ...init,
                        data: {
                            ...init.data,
                            labels: data.map((d) => {
                                return `${d.name}`
                            }),
                            datasets: [
                                {
                                    ...init.data.datasets[0],
                                    data: data.map((d) => parseInt(d.count))
                                }
                            ]
                        }
                    })
                }
            }
            if (type === STRINGS.TYPES.STATS_TYPE.QUALIFICATION) {
                console.log("qualification", data.map((d) => {
                    return `${d.name}`
                }))
                if (data.length > 0) {
                    setInit({
                        ...init,
                        data: {
                            ...init.data,
                            labels: data.map((d) => {
                                return `${d.name}`
                            }),
                            datasets: [
                                {
                                    ...init.data.datasets[0],
                                    data: data.map((d) => parseInt(d.count))
                                }
                            ]
                        }
                    })
                }
            }
        }


    }, []);
    return (
        <div className="centerDiv2">
            <Doughnut
                className="graph"
                responsive
                data={init.data}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 12,
                                }
                            }
                        }
                    },
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}

