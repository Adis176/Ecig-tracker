import React, {useState, useEffect, useContext} from "react";
import Wrapper from "../layout/Wrapper";
import Maps from "../components/Maps";
import CalendarPickerr from "../components/Date";
import TimeSlider from "../components/Slider/Slider";
import CalendarSelector from "../components/Calendar/Calendar";
import Clock from "../components/Clock/Clock";
import { ThemeContext } from "../App.js";
import "../data/firebaseConfig.js";
import { getFirestore, addDoc, collection } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
import useCustomQuery from "../hooks/useCustomQuery.js";

export default function Home({ dateMarker, data}){
    const currDate = new Date();
    const [minutes, setMinutes] = useState(0);
    const [hour, setHour] = useState(currDate.getHours());
    const [day, setDay] = useState(currDate.getDate());
    const [month, setMonth] = useState(currDate.getMonth()+1);
    const [year, setYear] = useState(currDate.getFullYear());;

    const [storedValues, setStoredValues] = useState(null);
    const [updatedValues, setUpdatedValues] = useState(null);
    const [printValues, setPrintValues] = useState(null);
    const [temporaryValues, setTemporaryValues] = useState([]);

    async function fetchData(){
        // set all vars to store data.
        setStoredValues(data);
        setUpdatedValues(data);
        setPrintValues(data);
    }
    async function Exec(){
        await fetchData();
        updateData();
    }

    // so initially, at the start, we will just execute the fetching once, based up on the values passed.
    useEffect(() => {
        Exec();
    }, [data]);

    // function to do binary search to find the timestamp as needed
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


    function updateData(){
        if(storedValues === null) {
            return;
        }
        setUpdatedValues(storedValues);
        let updatedTime;

        // month is in 0 based form, update accordingly
        if(month>0) {
            updatedTime = new Date(year, month-1, day, hour, minutes);
        }
        else{
            updatedTime = new Date(year-1, 11, day, hour, minutes);
        }

        // convert to ms, end = start + 15 min
        const start = updatedTime.getTime();

        // end = 15 minutes after start.
        const end = start + 900000; 
        // find timestamp in given data
        const pos = upperBound(storedValues, start);

        let count = 0;
        for(let currPos=pos; currPos!==storedValues.length; currPos++){
            // if(count===10) break;
            if(storedValues[currPos].timestamp >= end || count===10) break;
            temporaryValues.push(storedValues[currPos]);
            count++;
        }
        setUpdatedValues(temporaryValues);
        setTemporaryValues([]);
    }   

    return (
        // <Wrapper>
            <div className="home-container">
                <div className="map-container home-parent">
                    <Maps className="w-full h-full rounded-3xl" updatedValues={updatedValues}/>
                    <TimeSlider className="w-full" setHour={setHour}/>
                </div>
                <div className="calendar-container home-parent2">
                    <div className="mt-6">
                        <CalendarSelector className="w-full" setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} dateMarker={dateMarker} />
                    </div>
                    
                    <div className="flex flex-row justify-between  mt-4">
                        <div className="mt-3">
                            <Clock style={{border: '1px solid black'}} setMinutes={setMinutes}/>
                        </div>
                        
                        <div className="flex flex-col justify-between">
                            <div className="display-time">
                                {day} - {month} - {year}
                            </div>
                            <div className="display-time">
                                {hour} Hours
                            </div>
                            <div className="display-time">
                                {minutes} Minutes
                            </div>
                            <div onClick={() => updateData()} className="execute-time cursor-pointer">
                                EXECUTE
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        {
                            storedValues?.map((item) => 
                                <ul>
                                    <li>
                                        <div>
                                            <p>
                                                {item.timestamp}
                                            </p>
                                            <p>
                                                { new Date(item.timestamp).toString()}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                    <h1 className="mt-8">
                        Updated
                    </h1>
                    <div>
                        {
                            updatedValues?.map((item) => 
                                <ul>
                                    <li>
                                        <div>
                                            <p>
                                                {item.timestamp}
                                            </p>
                                            <p>
                                                { new Date(item.timestamp).toString()}
                                            </p>
                                            <p>
                                                {item.latitude}, {item.longitude}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            )
                        }
                    </div> */}
                </div>
            </div>
        // </Wrapper>
    );
}