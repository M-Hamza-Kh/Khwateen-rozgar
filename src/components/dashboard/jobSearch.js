import React from 'react';
import JobSearchedList from "../visitorIndex/jobsItems/jobSearchedList";

const JobSearch = (props) => {
    return (
        <div className="col-xl-10 col-lg-9">
            <div className="dashboard-main-inner">
                <div className="row">
                    <div className="col-12">
                        <div className="page-breadcrumb-content">
                            <h4>Job Search</h4>
                        </div>
                    </div>
                </div>
                <div className="dashboard-overview">
                    <JobSearchedList db={props.db}/>
                </div>
            </div>
        </div>
    );
};

export default JobSearch;