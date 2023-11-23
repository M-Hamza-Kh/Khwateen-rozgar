import React, {useEffect, useState} from 'react';
import Select from "react-select";

const SelectCities = (props) => {
    const {id, value, onChange, options,title} = props;
    const [allOptions,setAllOptions] = useState([]);
    const handleChange = (val) => {
    // console.log("select",val);
        onChange(val.label)
    }

    useEffect(()=>{
        if(options){
            const sorted = options.map((d,index)=> {return {value:index,label:d}})
            // console.log("select",sorted);
            setAllOptions(sorted);
        }
    },[options]);

    // console.log("select",options);
    //console.log("updateData",value);

    return (
        <Select
            id={id}
            className="basic-single"
            value={allOptions.filter((c)=> c.label === value)}
            classNamePrefix="select"
            onChange={handleChange}
            name="color"
            placeholder={title !== "" ? title : "City"}
            options={allOptions}
        />
    );
};

export default SelectCities;