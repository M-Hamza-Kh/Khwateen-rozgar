import React, {Component} from 'react';
import {Button, withStyles} from "@material-ui/core";
import ConfirmExportFileModal from "./modals/ConfirmExportFile";

const styles = theme => ({
    btn: {
        backgroundColor: '#c355a0',
        color: 'white !important',
        textDecoration: 'none',
        padding: '3px 10px',
        fontSize: '14px',
        minWidth: '64px',
        boxSizing: 'border-box',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        lineHeight: '1.75',
        fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
        fontWeight: '600',
        borderRadius: '4px',
        textTransform: 'uppercase',
    },
    warning: {
        color: 'white !important',
        textDecoration: 'none',
        padding: '6px 16px',
        fontSize: '1.4rem',
        minWidth: '64px',
        boxSizing: 'border-box',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        lineHeight: '1.75',
        fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
        fontWeight: '600',
        borderRadius: '4px',
        textTransform: 'uppercase',
    }
});


class ExportToXL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openComposer: props.callForData,
            data: props.data
        }
    }

    closeDialog = (e) => {
        this.setState({openComposer: e === false ? e : false});
        this.props.onClose()
    };

    render() {
        let {classes,getResponse} = this.props;
        let {openComposer, data} = this.state;
        return (
            <React.Fragment>
                <Button onClick={
                    () => {
                        getResponse()
                    }
                } className={classes.btn} style={{textDecoration: 'none'}}>Download List</Button>
                {openComposer ? <ConfirmExportFileModal data={data} onClose={this.closeDialog}/> : ''}
            </React.Fragment>
        );
    }
}

export default (withStyles(styles, ({withTheme: true}))(ExportToXL))