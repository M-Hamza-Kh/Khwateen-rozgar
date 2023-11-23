import React, {useEffect, useState} from 'react';
import {dropDownSelection, STRINGS} from "../../../utils/base";
import {Button, FormControl, FormControlLabel, Radio} from "@material-ui/core";
import $ from "jquery";
import {API} from "../../../utils/services";
import Spinner from "../../spinner";
import {parseDate, parseDateWithoutTime} from "../../../utils/base";

const defaultState = {
    note: "",
    allPackages: [],
    cash: STRINGS.TYPES.PAYMENTS.CASH,
    cheque: STRINGS.TYPES.PAYMENTS.CHEQUE,
    bankTransfer: STRINGS.TYPES.PAYMENTS.BANK_TRANSFER,
    package: 1,
    packageId: STRINGS.DEFAULTS.guid,
    refDocUrl: "",
    uploadName: "",
    paymentType: STRINGS.TYPES.PAYMENTS.CASH,
    amount: 0,
    responsePending: false,
    sponsor: false,
}

// var today = new Date(),
// date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var today = new Date();
var date  = today.setMonth(today.getMonth()+1);

// const allPackages = [
//     {label: "Package 1", val: 1},
//     {label: "Package 2", val: 2},
// ]

const AddPaymentModal = (props) => {
    let {openAddPayment, data, onClose} = props;
    const [form, setForm] = useState(defaultState)
    const [isUpload, setIsUpload] = useState(true);

    useEffect(() => {

        const getAllPackages = () => {
            API.PACKAGES.getAllPackages().then((response) => {
                let {status, error, data} = response;
                console.log("getAllPackages", response);
                if (status) {
                    setForm({
                        ...form,
                        allPackages: data.length > 0 ? data.filter((d) => d.isActive) : [],
                        responsePending: true
                    })
                } else {
                    alert(error)
                }

            })
        }
        getAllPackages();
    }, [])

    const handleUploadRefDoc = (e, form_id) => {
        let formData = $(`#${form_id}`)[0]
        if (e.target.files && e.target.files[0]) {
            const validFile = {status: true, message: 'select file'};
            if (validFile.status) {
                let reader = new FileReader();
                const file = e.target.files[0];
                // reader.onloadend = () => {
                //     setForm({
                //         refDocUrl: reader.result,
                //     });
                // };
                setIsUpload(false)
                API.UPLOAD.upload(formData).then((response) => {
                    let {status, data, error} = response;
                    if (status) {
                        //console.log("upload", data)
                        setForm({
                            ...form,
                            refDocUrl: data[0].path,
                            uploadName: data[0].name,
                        })
                        setIsUpload(true)
                    } else {
                        alert(error);
                        setIsUpload(true)
                    }
                })
                reader.readAsDataURL(file);
            } else {
                //console.log(validFile.message)
            }
        }
    };

    const validationForm = ({note, refDocUrl, amount}) => {
        let valid = {error: true, message: ""}
        if (note === "" || note === null) {
            valid.error = false;
            valid.message += valid.message ? "\nNote is required" : "Note is required"
        }
        // if (paymentType === 0) {
        //     valid.error = false;
        //     valid.message += valid.message ? "\nPayment type is required" : "Payment type is required"
        // }
        if (refDocUrl === "") {
            valid.error = false;
            valid.message += valid.message ? "\nReference Document is required" : "Reference Document is required"
        }
        if (amount === 0) {
            valid.error = false;
            valid.message += valid.message ? "\nAmount is required" : "Amount is required"
        }

        if ($("#package").val() === "") {
            valid.error = false;
            valid.message += valid.message ? "\nSelect the package" : "Select the package"
        }


        return valid;
    }

    const handleSubmit = () => {
        const valid = validationForm(form);
        if (valid.error) {
            //console.log("addPaymentObj", $("#package").val())
            form.package = form.allPackages.filter((p) => p.id === $("#package").val())[0].title;
            form.packageId = form.allPackages.filter((p) => p.id === $("#package").val())[0].id;
            let addPaymentObj = {
                "companyID": data.companyID !== undefined ? data.companyID : data.id,
                "paymentType": form.paymentType === STRINGS.TYPES.PAYMENTS.CASH ? "Cash" : form.paymentType === STRINGS.TYPES.PAYMENTS.BANK_TRANSFER ? "Bank Transfer" : form.paymentType === STRINGS.TYPES.PAYMENTS.CHEQUE ? "Cheque" : "",
                "package": form.package,
                "packageId": form.packageId,
                "IsSpsonred": form.sponsor,
                "amount": form.amount,
                "provider": "Admin",
                "status": "Successful",
                "notes": form.note,
                "reffDocURL": form.refDocUrl,
                "expiredDate": form.expiredDate
            }
            // console.log("addPaymentObj", addPaymentObj)
            API.PAYMENTS.addPayment(addPaymentObj).then((response) => {
                //console.log("addPaymentObj", addPaymentObj)
                if (response.status) {
                    alert("Payment Successfully Added");
                    onClose();
                    window.location.href = STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT
                }
            })
        } else {
            alert(valid.message)
        }
    }
    console.log("", data)
    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container ${openAddPayment ? `show` : ``}`}
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
                                    <h2 className="card-title mb-4 mt-4" style={{fontSize: "20px"}}>Payment
                                        For <strong>{data.company !== undefined && data.company}</strong> Company</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input d-flex align-items-baseline">
                                                <label
                                                    htmlFor="message">Payment Type : </label>

                                                <div className="d-flex width-100 flex-column">
                                                    <div className="d-flex w-100">
                                                        <div className="d-flex width-100 flex-column">
                                                            <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Radio
                                                                            color="primary"
                                                                            checked={form.paymentType === STRINGS.TYPES.PAYMENTS.CASH}
                                                                            onChange={(ev) => {
                                                                                setForm({
                                                                                    ...form,
                                                                                    paymentType: STRINGS.TYPES.PAYMENTS.CASH,

                                                                                })
                                                                            }}
                                                                            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                            // value={true}
                                                                            name="payment"
                                                                            inputProps={{'aria-label': 'YES'}}
                                                                        />}
                                                                    label="Cash"
                                                                />
                                                            </div>
                                                            <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Radio
                                                                            color="primary"
                                                                            checked={form.paymentType === STRINGS.TYPES.PAYMENTS.CHEQUE}
                                                                            onChange={(ev) => {
                                                                                setForm({
                                                                                    ...form,
                                                                                    paymentType: STRINGS.TYPES.PAYMENTS.CHEQUE,
                                                                                })
                                                                            }}
                                                                            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                            // value={true}
                                                                            name="payment"
                                                                            inputProps={{'aria-label': 'YES'}}

                                                                        />}
                                                                    label="Cheque"
                                                                />
                                                            </div>
                                                            <div className="d-flex ml-4 mr-4 text-nowrap">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Radio
                                                                            color="primary"
                                                                            checked={form.paymentType === STRINGS.TYPES.PAYMENTS.BANK_TRANSFER}
                                                                            onChange={(ev) => {
                                                                                setForm({
                                                                                    ...form,
                                                                                    paymentType: STRINGS.TYPES.PAYMENTS.BANK_TRANSFER,
                                                                                })
                                                                            }}
                                                                            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT} !important`}}
                                                                            // value={true}
                                                                            name="payment"
                                                                            inputProps={{'aria-label': 'YES'}}

                                                                        />}
                                                                    label="Bank Transfer"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Amount</label>
                                                            <input type="number" name="amount" onChange={(ev) =>
                                                                setForm({
                                                                    ...form,
                                                                    amount: ev.target.value
                                                                })
                                                            } placeholder="Amount"/>
                                                        </div>
                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Ref Doc</label>
                                                            <div className="d-flex">
                                                                <form id="formData1" mathod="POST">
                                                                    <input
                                                                        style={{display: "none"}}
                                                                        accept=".jpg, .jpeg, .gif, .bmp, .png"
                                                                        type="file"
                                                                        name="files"
                                                                        id="upload_ref"
                                                                        className="img_num1"
                                                                        title="Upload Picture"
                                                                        multiple
                                                                        onChange={(e) => handleUploadRefDoc(e, "formData1")}/>
                                                                </form>
                                                                {
                                                                    isUpload ?
                                                                        <label htmlFor="upload_ref">
                                                                            <Button
                                                                                variant="contained"
                                                                                component="span"
                                                                                style={{
                                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                    color: "white !important"
                                                                                }}
                                                                            >Upload</Button>
                                                                            <div
                                                                                className="d-flex">{form.uploadName}</div>
                                                                        </label> :
                                                                        <div className="spinner-holder">
                                                                            <Spinner type={"Puff"}/>
                                                                        </div>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="d-flex w-100 flex flex-column ml-4 mr-4">
                                                            <label>Expired Date</label>
                                                            <div className="d-flex">
                                                            <input type="date" name="expiredDate" onChange={(ev) =>
                                                                setForm({
                                                                    ...form,
                                                                    expiredDate: ev.target.value
                                                                })
                                                            } placeholder="Amount"/>
                                                            {/* {parseDateWithoutTime(parseDate(date))} */}
                                                            
                                                                              </div>
                                                         </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label
                                                    htmlFor="message">Notes : </label>
                                                <textarea rows="5"
                                                          onChange={(e) => setForm({
                                                              ...form,
                                                              note: e.target.value
                                                          })}
                                                          id="message"
                                                          defaultValue={form.note}
                                                          placeholder="Notes"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex w-100">
                                                <div className="d-flex align-items-center">
                                                    <label
                                                        htmlFor="message" className="text-nowrap">Package : </label>
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
                                                                form.responsePending &&
                                                                form.allPackages.length > 0 && (
                                                                    <select id="package" className="nice-select wide"
                                                                            name="package">
                                                                        {dropDownSelection()}
                                                                        <option value="">Select Package</option>
                                                                        {
                                                                            form.allPackages.map(({title, id}) => {
                                                                                    return (
                                                                                        <option value={id}>{title}</option>)
                                                                                }
                                                                            )}
                                                                    </select>
                                                                )
                                                            }
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="d-flex w-100">
                                                    <div
                                                        className="filter-name-item d-flex align-items-center">
                                                        <input type="checkbox"
                                                               defaultChecked={form.sponsor}
                                                               name="sponsor"
                                                               className="ml-2 mr-2"
                                                               onChange={(e) => {
                                                                   setForm({
                                                                       ...form,
                                                                       sponsor: e.target.checked
                                                                   })
                                                               }}
                                                               id="sponsor"
                                                        />
                                                        <label htmlFor="sponsor" className="mb-0"> Is Sponsored</label>
                                                    </div>
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
                                                    onClick={handleSubmit}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Save
                                                </button>
                                                <button
                                                    onClick={onClose}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Cancel
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

export default AddPaymentModal;