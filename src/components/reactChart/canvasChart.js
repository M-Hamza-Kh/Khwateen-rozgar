import React, {useState} from 'react';

const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Summary Chart"
    },
    data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [],
        click: (e) => {
            //console.log("options", e)
            //handleSummary(e.dataPointIndex)
        }
    }]
}
const canvasChart = (props) => {
    const [opt,setOpt] = useState(options);

    const handleChartOption = () => {
        const {data, options} = this.state;
       // console.log("options", data)
        let {applyed, interviewed, rejected, schedulForInterview, selected,shortlisted,viewed} = data;
        options.data[0].dataPoints = [
            {y: applyed, label: 'Apply'},
            {y: interviewed, label: 'Interviewed'},
            {y: rejected, label: 'Rejected'},
            {y: schedulForInterview, label: 'Schedule For Interview'},
            {y: selected, label: 'Selected'},
            {y: shortlisted, label: 'Shortlisted'},
            {y: viewed, label: 'Viewed'}];
        //console.log("options", options)
        if (options.data[0].dataPoints.length > 0) {
            setOpt(opt)
        }
    }
    return (
        <div id="job-views" className="tab-pane fade show active">
            <div className="row no-gutters">
                <div className="wrapper">

                </div>
            </div>
        </div>
    );
};

export default canvasChart;