import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import "./index.css"

const defaultState = {
    data: {
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                // backgroundColor: [
                //     '#dd6969',
                //     '#e6d251',
                //     '#8cb677',
                //     '#58b4bb',
                //     '#314e6d',
                // ],
                // borderColor: [
                //     '#dd6969',
                //     '#e6d251',
                //     '#8cb677',
                //     '#58b4bb',
                //     '#314e6d',
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
                borderWidth: 1,
            },
        ],
    }
};

const PieChart = ({data, chartFor}) => {


    const [init, setInit] = useState(defaultState);

    useEffect(() => {
        if (data !== undefined && data.length > 0) {

            if (chartFor === "age_wise") {
                let lessThen10 = [];
                let lessThen20 = [];
                let lessThen40 = [];
                let lessThen60 = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name >= 0 && data[i].name <= 10) {
                        lessThen10.push(data[i])
                    }
                    if (data[i].name >= 11 && data[i].name <= 20) {
                        lessThen20.push(data[i])
                    }
                    if (data[i].name >= 21 && data[i].name <= 40) {

                        lessThen40.push(data[i])
                    }
                    if (data[i].name >= 41 && data[i].name <= 60) {

                        lessThen60.push(data[i])
                    }
                }
                // let _0_10 = lessThen10.map((d) => parseInt(d.count)).reduce((a, b) => (a + b));
                // let _11_20 = lessThen20.map((d) => parseInt(d.count)).reduce((a, b) => (a + b));
                // let _21_40 = lessThen40.map((d) => parseInt(d.count)).reduce((a, b) => (a + b));
                // let _41_60 = lessThen60.map((d) => parseInt(d.count)).reduce((a, b) => (a + b));
                let _0_10 = 0;
                let _11_20 = 2546;
                let _21_40 = 9458;
                let _41_60 = 6453;
                // console.log("PieChart >>>>", lessThen10.map((d) => parseInt(d.count)).reduce((a, b) => (a + b)))
                // console.log("PieChart >>>>", lessThen20.map((d) => parseInt(d.count)).reduce((a, b) => (a + b)))
                // console.log("PieChart >>>>", lessThen40.map((d) => parseInt(d.count)).reduce((a, b) => (a + b)))
                // console.log("PieChart >>>>", lessThen60.map((d) => parseInt(d.count)).reduce((a, b) => (a + b)))
                setInit({
                    ...init,
                    data: {
                        ...init.data,
                        labels: ["0 - 10", "11 - 20", "21 - 40", "40 - 60"],
                        datasets: [
                            {
                                ...init.data.datasets[0],
                                label: "0 - 10",
                                data: [_0_10, _11_20, _21_40, _41_60]
                            },
                        ]
                    }
                })
            } else {
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
    }, []);
    // console.log("PieChart__", init.data)

    return (
        <React.Fragment>
            <Pie
                data={init.data}
                height={280}
                width={100}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 12,
                                }
                            }
                        }
                    }
                }
                }
            />
        </React.Fragment>)
}

export default PieChart;