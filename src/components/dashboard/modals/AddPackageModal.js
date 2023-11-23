import React, {useEffect, useState} from 'react';
import {dropDownSelection, STRINGS} from "../../../utils/base";
import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio} from "@material-ui/core";
import $ from "jquery";
import {API} from "../../../utils/services";
import {withStyles} from '@material-ui/core/styles';


const defaultState = {
    monthly: STRINGS.TYPES.PACKAGES.MONTHLY,
    yearly: STRINGS.TYPES.PACKAGES.YEARLY,
    oneTime: STRINGS.TYPES.PACKAGES.ONE_TIME,
    position: 1,
    durationVslue: 0,
    jobsAlloweded: 0,
    sponsorJobsAmount: 0,
    recommended: false,
    isActive: false,
    readOnly: false,
    title: "",
    duration: STRINGS.TYPES.PACKAGES.ONE_TIME,
    amount: 0
}

const allPositions = [
    {label: "Position 1", val: 1},
    {label: "Position 2", val: 2},
    {label: "Position 3", val: 3},
]

const AddPackageModal = (props) => {
    let {openAddPackage, data, onClose} = props;
    const [form, setForm] = useState(defaultState);

    const GreenCheckbox = withStyles({
        root: {
            color: STRINGS.TYPES.COLORS.DEFAULT,
            '&$checked': {
                color: STRINGS.TYPES.COLORS.DEFAULT,
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);


    useEffect(() => {
        if(!$.isEmptyObject(data)){
            console.log("getAllPackagesAdmin",data);
            setForm({
                ...form,
                title: data.title,
                amount: data.amount,
                jobsAlloweded: data.jobsAlloweded,
                sponsorJobsAmount: data.sponsorJobsAmount,
                duration: data.duration,
                durationVslue: data.durationVslue,
                recommended: data.recommended,
                isActive: data.isActive,
                readOnly:true,
            })
            $("#position").val(data.position);
        }
    }, [data]);

    console.log("getAllPackagesAdmin",form);


    const validationForm = ({duration, jobsAlloweded, sponsorJobsAmount, durationVslue, amount}) => {
        let valid = {error: true, message: ""}
        if (duration === "") {
            valid.error = false;
            valid.message += valid.message ? "\nDuration is required" : "Duration is required"
        }
        if (jobsAlloweded === "") {
            valid.error = false;
            valid.message += valid.message ? "\nAllowed Job is required" : "Allowed Job is required"
        }
        if (sponsorJobsAmount === "") {
            valid.error = false;
            valid.message += valid.message ? "\nSponsor Jobs Amount is required" : "Sponsor Jobs Amount is required"
        }
        // if (paymentType === 0) {
        //     valid.error = false;
        //     valid.message += valid.message ? "\nPayment type is required" : "Payment type is required"
        // }
        if (durationVslue > 12) {
            valid.error = false;
            valid.message += valid.message ? "\nDuration Value Max Length is 12" : "Duration Value Max Length is 12"
        }
        if (amount === 0) {
            valid.error = false;
            valid.message += valid.message ? "\nAmount is required" : "Amount is required"
        }

        if ($("#position").val() === "") {
            valid.error = false;
            valid.message += valid.message ? "\nSelect the position" : "Select the position"
        }


        return valid;
    }

    const handleSubmit = () => {
        const valid = validationForm(form);
        if (valid.error) {
            //console.log("addPaymentObj", $("#package").val())
            form.position = allPositions.filter((p) => p.val === parseInt($("#position").val()))[0].val
            //console.log("addPaymentObj", addPaymentObj)
            if(!$.isEmptyObject(data)){
                data.title = form.title;
                data.duration = form.duration;
                data.durationVslue = form.durationVslue;
                data.position = form.position;
                data.amount = form.amount;
                data.recommended = form.recommended;
                data.isActive = form.isActive;
                data.sponsorJobsAmount = form.sponsorJobsAmount;
                data.jobsAlloweded = form.jobsAlloweded;
                console.log("updatePackage",data)
                API.PACKAGES.updatePackage(data.id,data).then((response) => {
                    //console.log("addPaymentObj", addPaymentObj)
                    if (response.status) {
                        alert("Package Successfully Updated");
                        onClose();
                        //window.location.href = STRINGS.ROUTES.DASHBOARD.PACKAGES
                    }
                })
            }else{
                let addPaymentObj = {
                    "title": form.title,
                    "duration": form.duration,
                    "durationVslue": form.durationVslue,
                    "position": form.position,
                    "amount": form.amount,
                    "recommended": form.recommended,
                    "isActive": form.isActive,
                    "sponsorJobsAmount": form.sponsorJobsAmount,
                    "jobsAlloweded": form.jobsAlloweded,
                }
                API.PACKAGES.addPackage(addPaymentObj).then((response) => {
                    //console.log("addPaymentObj", addPaymentObj)
                    if (response.status) {
                        alert("Package Successfully Added");
                        onClose();
                        window.location.href = STRINGS.ROUTES.DASHBOARD.PACKAGES
                    }
                })
            }
        } else {
            alert(valid.message)
        }
    }

    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container ${openAddPackage ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                          onClick={() => onClose()}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <h2 className="card-title mb-0 pt-10 pb-10" style={{fontSize: "20px"}}>Payment For Abc
                                        Company</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input d-flex align-items-baseline">


                                                <div className="d-flex w-100">
                                                    <div className="d-flex w-100 ml-4 mr-4 flex-column">

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Title</label>
                                                            <input type="text" defaultValue={form.title} name="title"
                                                                   onChange={(ev) =>
                                                                       setForm({
                                                                           ...form,
                                                                           title: ev.target.value
                                                                       })
                                                                   } placeholder="Title"/>
                                                        </div>

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Amount</label>
                                                            <input type="number" value={form.amount}
                                                                   readOnly={form.readOnly} name="amount"
                                                                   onChange={(ev) =>
                                                                       setForm({
                                                                           ...form,
                                                                           amount: ev.target.value
                                                                       })
                                                                   } placeholder="Amount"/>
                                                        </div>

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Job Sponsored Amount</label>
                                                            <input type="number" value={form.sponsorJobsAmount}
                                                                   readOnly={form.readOnly} name="sponsorJobsAmount"
                                                                   onChange={(ev) =>
                                                                       setForm({
                                                                           ...form,
                                                                           sponsorJobsAmount: ev.target.value
                                                                       })
                                                                   } placeholder="Job Sponsored Amount"/>
                                                        </div>

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            {/*<label>Recommended</label>*/}
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    control={<GreenCheckbox checked={form.recommended}
                                                                                            onChange={(e) => {
                                                                                                setForm({
                                                                                                    ...form,
                                                                                                    recommended: e.target.checked
                                                                                                })
                                                                                            }
                                                                                            } name="recommended"/>}
                                                                    label="Recommended"
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex w-100 ml-4 mr-4 flex-column">

                                                        {
                                                            form.readOnly ?
                                                                <div>{form.duration}</div>
                                                                :
                                                                (<div className="d-flex width-100 flex-column">

                                                                    <label htmlFor="message" className="ml-4">Duration
                                                                        : </label>

                                                                    <div className="d-flex w-100 flex-wrap">
                                                                        <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Radio
                                                                                        color="primary"
                                                                                        checked={form.duration === STRINGS.TYPES.PACKAGES.MONTHLY}
                                                                                        onChange={(ev) => {
                                                                                            setForm({
                                                                                                ...form,
                                                                                                duration: STRINGS.TYPES.PACKAGES.MONTHLY,
                                                                                            })
                                                                                        }}
                                                                                        style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                                        // value={true}
                                                                                        name="payment"
                                                                                        inputProps={{'aria-label': 'YES'}}
                                                                                    />}
                                                                                label="Monthly"
                                                                            />
                                                                        </div>
                                                                        <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Radio
                                                                                        color="primary"
                                                                                        checked={form.duration === STRINGS.TYPES.PACKAGES.YEARLY}
                                                                                        onChange={(ev) => {
                                                                                            setForm({
                                                                                                ...form,
                                                                                                duration: STRINGS.TYPES.PACKAGES.YEARLY,
                                                                                            })
                                                                                        }}
                                                                                        style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                                        // value={true}
                                                                                        name="payment"
                                                                                        inputProps={{'aria-label': 'YES'}}

                                                                                    />}
                                                                                label="Yearly"
                                                                            />
                                                                        </div>
                                                                        <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Radio
                                                                                        color="primary"
                                                                                        checked={form.duration === STRINGS.TYPES.PACKAGES.ONE_TIME}
                                                                                        onChange={(ev) => {
                                                                                            setForm({
                                                                                                ...form,
                                                                                                duration: STRINGS.TYPES.PACKAGES.ONE_TIME,
                                                                                            })
                                                                                        }}
                                                                                        style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                                        // value={true}
                                                                                        name="payment"
                                                                                        inputProps={{'aria-label': 'YES'}}

                                                                                    />}
                                                                                label="One Time"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                        }


                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Duration Value</label>
                                                            <input type="number" value={form.durationVslue}
                                                                   readOnly={form.readOnly} name="durationVslue"
                                                                   onChange={(ev) =>
                                                                       setForm({
                                                                           ...form,
                                                                           durationVslue: ev.target.value
                                                                       })
                                                                   } placeholder="Duration Value"/>
                                                        </div>

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Jobs Allowed</label>
                                                            <input type="number" value={form.jobsAlloweded}
                                                                   readOnly={form.readOnly} name="durationVslue"
                                                                   onChange={(ev) =>
                                                                       setForm({
                                                                           ...form,
                                                                           jobsAlloweded: ev.target.value
                                                                       })
                                                                   } placeholder="Jobs Allowed"/>
                                                        </div>

                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            {/*<label>Recommended</label>*/}
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    control={<GreenCheckbox checked={form.isActive}
                                                                                            onChange={(e) => {
                                                                                                setForm({
                                                                                                    ...form,
                                                                                                    isActive: e.target.checked
                                                                                                })
                                                                                            }
                                                                                            } name="isActive"/>}
                                                                    label="Active Status"
                                                                />
                                                            </FormGroup>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input d-flex align-items-center">
                                                <label
                                                    htmlFor="message">Position : </label>
                                                <div className="d-flex width-100">
                                                    <FormControl style={{
                                                        display: "flex",
                                                        width: "10rem",
                                                        margin: "5px",
                                                        color: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                                    }}>
                                                        {/*<InputLabel id="demo-simple-select-label"*/}
                                                        {/*            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>Types</InputLabel>*/}
                                                        {/*<Select*/}
                                                        {/*    labelId="demo-simple-select-label"*/}
                                                        {/*    id="demo-simple-select"*/}
                                                        {/*    defaultValue={form.package}*/}
                                                        {/*    style={{borderBottomColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*    */}
                                                        {/*>*/}
                                                        {/*    {*/}
                                                        {/*        allPackages.map(({label, val}) =>*/}
                                                        {/*            <MenuItem value={val}>{label}</MenuItem>*/}
                                                        {/*        )*/}
                                                        {/*    }*/}
                                                        {/*</Select>*/}
                                                        {
                                                            allPositions.length > 0 && (
                                                                <select id="position" className="nice-select wide"
                                                                        name="position">
                                                                    {dropDownSelection()}
                                                                    <option value="">Select Position</option>
                                                                    {
                                                                        allPositions.map(({label, val}) => {
                                                                                return (
                                                                                    <option value={val}>{label}</option>)
                                                                            }
                                                                        )}
                                                                </select>
                                                            )
                                                        }
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <button
                                                    onClick={onClose}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Cancel
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">{!$.isEmptyObject(data) ? "Update" : "Add"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"/>
        </React.Fragment>
    );
};

export default AddPackageModal;


// <form action="#">
//     <div className="row mb-30 pt-10">
//         <div className="col-lg-12">
//             <div className="row">
//
//                 <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
//                     {/*<!-- Single Input Start -->*/}
//                     <div className="single-input mb-25">
//                         <label htmlFor="title">Packages
//                             Title <span>*</span></label>
//                         <input type="text" id="title"
//                                name="title"
//                                placeholder="Enter Title"
//                         />
//                         <input type="text" id="description"
//                                name="description"
//                                placeholder="Description"
//                         />
//                     </div>
//                     {/*<!-- Single Input End -->*/}
//                 </div>
//
//                 <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
//                     {/*<!-- Single Input Start -->*/}
//                     <div className="single-input mb-25">
//                         <label
//                             htmlFor="position">Duration <span>*</span></label>
//                         <div className="row">
//                             <input type="number" id="duration"
//                                    name="duration"
//                                    placeholder="duration"
//                             />
//                             <select className="nice-select wide" name="p-type" id="p-type">
//                                 <option value="month">Month</option>
//                                 <option value="year">Year</option>
//                             </select>
//                         </div>
//                     </div>
//                     {/*<!-- Single Input End -->*/}
//                 </div>
//
//             </div>
//
//         </div>
//
//
//     </div>
//     <div className="row">
//         <div className="col-12">
//             <div className="profile-action-btn">
//                 <button
//                     className="ht-btn theme-btn theme-btn-two"> Save
//                 </button>
//             </div>
//         </div>
//     </div>
// </form>