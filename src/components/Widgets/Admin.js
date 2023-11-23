import React from "react";
import {Col, Container, Row} from 'reactstrap';
import './admin.css';
import DoughnutChart from './Components/Graphs/Doughnut';
import PieChart from './Components/Graphs/PieChart';
import GroupedBar from "./Components/Graphs/BarGraph"
import {STRINGS} from "../../utils/base";

// import DuesBox from './Components/DuesBox';

function AdminComponent(props) {
    let {
        applicantStats: {cityWiseApplicant, ageWiseApplicant, maritalStateWiseApplicant, qulificationWiseApplicant, yearOfExpWiseApplicant, monthlyApplicants},
        companiesStats: {cityWiseCompanies, monthlyCompanies},
        paymentsStats: {monthlyPayments},
        jobsStats: {monthlyJobs},
    } = props;
    return (
        <React.Fragment>

            {/*<Container fluid={true}>*/}
            {/*    <Row>*/}
            {/*        <Col md="12" className="head">*/}
            {/*            <h2>ADMIN DASHBOARD</h2>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container><br></br>*/}

            <Container>
                <Row className="upperPart">
                    <Col md="6" className="chart1">
                        <div className="text">
                            <h2>City Wise Employers </h2>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            paddingTop: "10px"
                        }}>
                            <DoughnutChart
                                type={STRINGS.TYPES.STATS_TYPE.CITY}
                                data={cityWiseCompanies}/>
                        </div>
                    </Col>

                    <Col md="6" style={{display: "flex", justifyContent: 'center', flexDirection: 'column'}}>
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>City Wise Applicants </h2>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <PieChart data={cityWiseApplicant}/>
                        </div>

                    </Col>

                </Row>
                <br></br>
                <br></br>

                <Row>
                    <Col md='6'>
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>Age Wise </h2>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <PieChart chartFor={"age_wise"} data={ageWiseApplicant}/>
                        </div>
                    </Col>
                    <Col md="6" className="chart1">
                        <div className="text">
                            <h2>Marital Status </h2>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            paddingTop: "10px"
                        }}>
                            <DoughnutChart type={STRINGS.TYPES.STATS_TYPE.MARITAL}
                                           data={maritalStateWiseApplicant}/>
                        </div>
                    </Col>
                </Row>

                <br></br>
                <br></br>
                <Container>
                    <Row>
                        <Col md='6'>
                            <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                                <h2>Years of Experience</h2>
                            </div>
                            <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                                <PieChart chartFor="yearWise" data={yearOfExpWiseApplicant}/>
                            </div>
                        </Col>
                        <Col md="6" className="chart1">
                            <div className="text">
                                <h2>Qualification Wise </h2>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingTop: "10px"
                            }}>
                                <DoughnutChart
                                    type={STRINGS.TYPES.STATS_TYPE.QUALIFICATION}
                                    data={qulificationWiseApplicant}
                                />
                            </div>
                        </Col>
                    </Row>

                </Container>


            </Container>
            <br/>
            <Container>
                <Row>
                    <Col md="12">
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>Month Wise Employers </h2>
                        </div>
                        <GroupedBar chartFor={1} type={STRINGS.TYPES.STATS_TYPE.MONTHLY} data={monthlyCompanies}/>
                    </Col>
                </Row>

            </Container>
            <br/>
            <Container>
                <Row>
                    <Col md="12">
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>Month Wise Applicants </h2>
                        </div>
                        <GroupedBar chartFor={2} type={STRINGS.TYPES.STATS_TYPE.MONTHLY} data={monthlyApplicants}/>
                        {/*<FinancialChart type={STRINGS.TYPES.STATS_TYPE.PAYMENT} data={monthlyPayments}/>*/}
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="12">
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>Month Wise Payment </h2>
                        </div>
                        <GroupedBar chartFor={3} type={STRINGS.TYPES.STATS_TYPE.MONTHLY} data={monthlyPayments}/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
                            <h2>Month Approved Job </h2>
                        </div>
                        <GroupedBar chartFor={4} type={STRINGS.TYPES.STATS_TYPE.MONTHLY} data={monthlyJobs}/>
                    </Col>
                </Row>

                {/*<Row>*/}
                {/*    <Col md="12">*/}
                {/*        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>*/}
                {/*            <h2>Salary Wise Employees </h2>*/}
                {/*        </div>*/}
                {/*        <GroupedBar type={STRINGS.TYPES.STATS_TYPE.SALARY}*/}
                {/*                    data={monthlyCompanies}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                <br></br>
                <br></br>
                <Row>
                    <Col md="12" style={{}}>
                        {/*< DuesBox className="width"/>*/}
                    </Col>

                </Row>

            </Container>
            <Container>

            </Container>
            <br/>


        </React.Fragment>
    )
}

export default AdminComponent;
