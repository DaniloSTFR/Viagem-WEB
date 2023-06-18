import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-br',ptBR);

const DateInput = (props:any) => {

    return (
     <DatePicker
        
        locale="pt-br" 
        dateFormat="dd/MM/yyyy"  
        selected={props.startdate} 
        onChange={props.onChange} 
        value={props.value} 
        className={props.className}
        />
    );  
  }

  export default DateInput;