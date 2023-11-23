import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"


const AutoComplete = (props) => {
    const {data, label,_id} = props;
    return (
        <div>
            <Autocomplete
                id={_id}
                options={data}
                getOptionLabel={(option) => option}
                style={{width: "100%"}}
                renderInput={(params) =>
                    <TextField
                        {...params} label={label}
                        variant="standard"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                }
            />
        </div>
    );
};

export default AutoComplete;