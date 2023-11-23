import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {parseDate, parseDateWithoutTime} from "../../../utils/base";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function DetailsTable(props) {
    const classes = useStyles();
    const {data,companyData} = props;
    const setExperience = (exp) => {
        let val = exp
        switch (exp) {
            case -1 :
                val = "Fresh";
                break;
            case 0 :
                val = "Less then one year";
                break;
            default :
                return exp
        }
        return val
    }
    const tableData = [
        {label: "Total Number of Employees", value: `${companyData !== null ? companyData.numberofEmployees : "hidden"}`},
        {label: "Number of (Female) Employees", value: `${companyData !== null ? companyData.numberofEmployeesFemale : "hidden"}`},
        {label: "Number of Vacancies", value: `${data.numberOfVacancy}`},
        {label: "Qualification", value: `${data.qualification}`},
        {label: "Preferred Age Group", value: `${data.preferredAgeGroup}`},
        {label: "Job Timings", value: `${data.jobTimings}`},
        {label: "Working Days", value: `${data.workingDays}`},
        {label: "Last Date To Apply", value: `${parseDateWithoutTime(parseDate(new Date(data.lastDatePosting)))}`},
        {label: "Experience", value: `${setExperience(data.experienceInYears)}`}
    ]

    //var foo = 45;
    //var bar = JSON.stringify(foo);
    
    return (
        <TableContainer component={Paper} style={{boxShadow: "none"}}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                {/*<TableHead>*/}
                {/*    <TableRow>*/}
                {/*        <TableCell>Label</TableCell>*/}
                {/*        <TableCell align="right">Value</TableCell>*/}
                {/*    </TableRow>*/}
                {/*</TableHead>*/}
                <TableBody>
                    {
                        tableData.map((row, index) =>
                            <TableRow key={index} className="gradiant-css" style={{backgroundColor: "#f7f7f7"}}>
                                <TableCell className="text-white pb-15 pt-15" component="th"
                                           scope="row">{row.label}</TableCell>
                                <TableCell className="text-white pb-15 pt-15" align="right">{row.value}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}