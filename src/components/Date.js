import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Date.css"
export default function CalendarPickerr(){
    const [value, setValue] = new useState(new Date());
  return (
    <div>
        <Calendar activeStartDate={value}  onChange={setValue}  />
        <p>{value.toLocaleString()}</p>
    </div>
   
  );
}