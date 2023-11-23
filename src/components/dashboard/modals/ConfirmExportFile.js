import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtention = '.xlsx';
const defaultState = {
    fileName:"ExportFile"
}
const ConfirmExportFileModal = (props) => {
    const {onClose,data} = props;
    const [init,setInit] = useState(defaultState);
    const handleUpdate = (confirm) => {
        if (confirm === 1) {
            exportXL(data)
            onClose()
        } else {
            onClose();
        }
    }

    const exportXL = (exportData) =>{
        //console.log(exportData);
        //console.log(this.state.fileName);
        const fileName = init.fileName;
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets : {'data':ws},SheetNames:['data']};
        const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'});
        const data = new Blob([excelBuffer],{type:fileType});
        FileSaver.saveAs(data, fileName + fileExtention);
        props.onClose()
    };


    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document" style={{justifyContent: "center"}}>
                    <div className="modal-content" style={{width: "inherit"}}>
                        <button type="button" onClick={() => {
                            onClose()
                        }} className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                    >&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <div className="card-title mb-5 mt-5" style={{fontSize: "12px"}}>
                                        &nbsp;
                                        {/*Application*/}
                                        {/*for {props.title}*/}
                                    </div>
                                </header>
                                <div className="card-body">
                                    <div className="row mt-20">
                                        <div className="col-12">
                                            <div className="d-flex width-100 flex-column">
                                                <div className="d-flex">
                                                    Please write the name for the file.
                                                </div>
                                                <div className="row">
                                                    <TextField
                                                        className="mb-2 mt-2"
                                                        label="File Name"
                                                        name="fileName"
                                                        variant="outlined"
                                                        onChange={(e)=> setInit({
                                                            ...init,
                                                        fileName:e.target.value
                                                        })}
                                                        required
                                                        fullWidth
                                                    />
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
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => handleUpdate(1)}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Confirm
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => handleUpdate(2)}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Cancel
                                                </Button>
                                                {/*<button*/}
                                                {/*    onClick={() => handleUpdate(false)}*/}
                                                {/*    className="ht-btn theme-btn theme-btn-two mb-xs-20">No*/}
                                                {/*</button>*/}
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

export default ConfirmExportFileModal;