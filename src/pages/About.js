import React, {useState, useEffect, useContext} from "react";
import CalendarSelector from "../components/Calendar/Calendar";
import useCustomQuery from "../hooks/useCustomQuery.js";
export default function About( data){
    data = data.data;
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [valid, setValid] = useState( 1);
    const [viewData, setViewData] = useState(null);

    useEffect(() => {   
        let selectedTimeStamp = (new Date(parseInt(year), parseInt(month-1), parseInt(day), 0, 0)).getTime();
        let currTimeStamp = Date.now();
        if(selectedTimeStamp<currTimeStamp && !isNaN(Date.parse(`${month}-${day}-${year}`))){
            bringData();
            setValid(1);
        }
        else{
            setValid(-1);
        }
    }, [day, month, year, data]);

    function upperBound(arr, targetTimestamp) {
        if(targetTimestamp == null ) return -1;
        let left = 0;
        let right = arr.length;
        while (left < right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid].timestamp <= targetTimestamp) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return left;
    }
    function bringData(){
        if(data === null) return; 
        let mon = month-1;
        let calcTimestamp = (new Date(parseInt(year), mon, parseInt(day), 0, 0)).getTime();
        let tempArr = [];
        let pos = upperBound(data, calcTimestamp);
        if(pos === data.length) return;
        let count=0;
        for(let i=pos; i!==data.length; i++){
            if(count === 20) break;
            if(data[i]) {
                let tempDay = formatDate(data[i].timestamp);
                if(tempArr.length===0 || (tempArr.length>0 && tempArr[tempArr.length-1] !== tempDay)) tempArr.push(tempDay);
            }
            count++;
        }
        setViewData(tempArr);
    }
    function formatDate(timestamp) {
        // Create a new Date object with the provided timestamp
        const date = new Date(timestamp);
    
        // Get the day, month, year, hours, and minutes from the Date object
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Return the formatted date string
        return `${day}-${month}-${year} / ${hours}:${minutes}`;
    }
    
    return (
        // <Wrapper>
            <div className="w-[90%]  flex flex-row justify-center items-center">
                <div className="w-[35%] flex flex-row justify-evenly items-center mb-8 h-[200px]" >
                    <CalendarSelector className="w-full h-full" setDay={setDay} month={month} setMonth={setMonth} setYear={setYear} dateMarker={null} year={year}/>
                </div>
                {valid===1 ? <div className="flex flex-col  w-[40%]">
                    <ul id='about-display-search-data' className='flex flex-col sm:flex-row justify-center items-center flex-wrap'>
                        {viewData?.map((item, index) => (
                            <li key={index} className="about-time-display flex">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <></>}
            </div>
            
            
        // </Wrapper>
    );
}