import React, { useState, useEffect } from 'react';

import { validate } from '../../util/validators';
import './DropDown.css';



const Dropdown = props => {
    const {initialValue, id, onInput } = props;
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(props.initialValid || true);

    const changeHandler = event => {
        console.log(event.target.value);
        setValue(event.target.value);
        setIsValid(validate(event.target.value, props.validators));
      };

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

  return (
    <div className={`form-control ${!isValid &&
        'form-control--invalid'}`}>
        <label >{props.label}</label>
        <select name="place types" 
                id="place_types"  
                onChange={changeHandler}
                data-testid="select">
            {props.place_types.map(t =>
             <option value={t} key={t} data-testid="select-option">
                 {t}</option>
                )}
           
        </select>
        {!isValid && <p className='error-text'>{props.errorText}</p>}
    </div>
  );
};

export default Dropdown;
