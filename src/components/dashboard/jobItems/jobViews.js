import React, {useEffect, useState} from 'react';
import Chart from "react-google-charts";
//import {CanvasJSChart} from "canvasjs-react-charts";

// const options = {
//     exportEnabled: true,
//     animationEnabled: true,
//     title: {
//         text: "Summary Chart"
//     },
//     data: [{
//         type: "pie",
//         startAngle: 75,
//         toolTipContent: "<b>{label}</b>: {y}%",
//         showInLegend: "true",
//         legendText: "{label}",
//         indexLabelFontSize: 16,
//         indexLabel: "{label} - {y}%",
//         dataPoints: [],
//         click: (e) => {
//             console.log("options", e)
//             //handleSummary(e.dataPointIndex)
//         }
//     }]
// }

const JobViews = (props) => {
    const [opt, setOpt] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const {data} = props;
    //console.log("options", data)
    let {applyed, interviewed, rejected, schedulForInterview, selected, shortlisted, viewed} = data;
    //console.log(viewed)
    const optChart = [
        ['View', "view",],
        [`Apply - ${applyed}`, applyed],
        [`Interviewed - ${interviewed}`, interviewed],
        [`Rejected - ${rejected}`, rejected],
        [`Schedule For Interview - ${schedulForInterview}`, schedulForInterview],
        [`Selected - ${selected}`, selected],
        [`Shortlisted - ${shortlisted}`, shortlisted],
    ]
    //console.log(optChart)
    useEffect(() => {
        // opt.data[0].dataPoints = [
        //     {y: applyed, label: `Apply - ${applyed}`},
        //     {y: interviewed, label: `Interviewed - ${interviewed}`},
        //     {y: rejected, label: `Rejected - ${rejected}`},
        //     {y: schedulForInterview, label: `Schedule For Interview - ${schedulForInterview}`},
        //     {y: selected, label: `Selected - ${selected}`},
        //     {y: shortlisted, label: `Shortlisted - ${shortlisted}`},
        //     // {y: viewed, label: `Viewed - ${viewed}`}
        //     ];
        if (optChart) {
            setOpt(optChart);
            setIsUpdate(true)
        }
    }, [setOpt])

    return (
        <div id="job-views" className="tab-pane fade show active">
            <div className="row no-gutters">
                <div className="wrapper flex justify-content-center align-items-center">
                    {
                        isUpdate && (
                            // <CanvasJSChart options={opt}/>
                            <Chart
                                width={'800px'}
                                height={'800px'}
                                chartType="PieChart"
                                loader={<div className="spinner-holder">Chart is Loading...</div>}
                                data={opt}
                                options={{
                                    title: 'Summary Chart',
                                    // Just add this option
                                    pieHole: 0.1,
                                    pieSliceTextStyle: {
                                        color: 'black'
                                    },
                                }}
                                // chartEvents={[
                                //     {
                                //         eventName: "select",
                                //         callback: ({chartWrapper}) => {
                                //             let rowIndex = chartWrapper.getChart().getSelection()[0].row
                                //             this.handleSummary(rowIndex);
                                //             //console.log("Selected ", chartWrapper.getChart().getSelection()[0].row);
                                //             //console.log("Selected ", chartWrapper.getChart());
                                //         }
                                //     }
                                // ]}
                                rootProps={{'data-testid': '3'}}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default JobViews;