import { Calendar, theme } from 'antd';
import dayjs from 'dayjs';
import "./Calendar.css";
export default function CalendarSelector({setDay, setMonth, setYear, dateMarker, year}){
    const dayjs = require("dayjs");
    let pos=0;
    const dateMarker2 = [1702853418853, 1702883199595];
    const dateCellRender = (date) => {
        if (pos<dateMarker?.length){
            const redDate2 = dayjs(dateMarker[pos]);
            if (date.isSame(redDate2, 'day')) {
                pos=(pos+1)%dateMarker.length;
                return <div className='ant-picker-calendar ant-picker-cell-inner ant-picker-calendar-date ant-has-data '>{date.date()}</div>
            }
        } 
        return <div className='ant-picker-calendar ant-picker-cell-inner ant-picker-calendar-date '>{date.date()}</div>
      };
    const onChange = (value) => {
        pos=0;
        let selectedDate = value.format('DD-MM-YYYY');
        setDay(parseInt(selectedDate.substring(0, 2)));
        setMonth(parseInt(selectedDate.substring(3, 5)));
        setYear(parseInt(selectedDate.substring(6, 10)));
        // console.log(parseInt(selectedDate.substring(0, 2)), parseInt(selectedDate.substring(3, 5)), parseInt(selectedDate.substring(6, 10)));
      };
    return (
        <Calendar onChange={onChange} fullCellRender={dateCellRender}/>
    );
}