import React, {useState, useEffect, useContext} from "react";

import '../data/firebaseConfig' // Add this line prevent firebase not loading error
import CalendarSelector from "../components/Calendar/Calendar";
export default function Rough({data}){
    const currDate = new Date();
    const [str, setStr] = useState();
    const [day, setDay] = useState(currDate.getDate());
    const [month, setMonth] = useState(currDate.getMonth()+1);
    const [year, setYear] = useState(currDate.getFullYear());;
    const [hour, setHour] = useState(currDate.getHours());
    const [minutes, setMinutes] = useState(0);

    const [storedValues, setStoredValues] = useState(null);
    const [updatedValues, setUpdatedValues] = useState(null);
    const [printValues, setPrintValues] = useState(null);
    const [temporaryValues, setTemporaryValues] = useState([]);

    return (
        // <Wrapper>
            <div className="home-container">
                <div className="map-container home-parent">
                    <div className="">

                    </div>
                </div>
                <div className="calendar-container home-parent2">
                    <div className="mt-6">
                        <CalendarSelector className="w-full" setDay={setDay} month={month} setMonth={setMonth} setYear={setYear} dateMarker={null} year={year}/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        // </Wrapper>
    );
}