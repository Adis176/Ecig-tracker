import React, {useState, useEffect} from "react";
import CalendarSelector from "../components/Calendar/Calendar";
import "../data/firebaseConfig.js";
import { getFirestore, collection } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
import { setConsent } from "firebase/analytics";

const db = getFirestore();

const items = [
    {
        val: "hk_motion_table",
    },
    {
        val: "hk_motion_table_0",
    },
    {
        val: "hk_motion_table_1",
    },
    {
        val: "hk_motion_table_6",
    },
    {
        val: "hk_motion_table_7",
    },
    {
        val: "hk_motion_table_8",
    },
    {
        val: "hk_motion_table_9",
    },
    {
        val: "hk_motion_table_10",
    },
    {
        val: "hk_motion_table_11",
    },
    {
        val: "hk_motion_table_12",
    },
    {
        val: "hk_motion_table_13",
    },
    {
        val: "hk_motion_table_15",
    },
    {
        val: "hk_motion_table_17",
    },
    {
        val: "hk_motion_table_18",
    },
]


export default function Events({setCollections}){
    const currDate = new Date();
    const [day, setDay] = useState(currDate.getDate());
    const [month, setMonth] = useState(currDate.getMonth()+1);
    const [year, setYear] = useState(currDate.getFullYear());;

    const [viewEvents, setViewEvents] = useState(null);
    const [data, setData] = useState(null);

    
    function resetAllLocal(){
        localStorage.clear();
    }

    function upperBound(arr, targetTimestamp) {
        if(targetTimestamp == null || arr===null || arr.length===0) return -1;
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

    useEffect(() => {
        async function fetchEvents(){
            let fetchedEvents = localStorage.getItem("events");
            if(fetchedEvents!==null && fetchedEvents!==undefined && typeof(fetchedEvents)==="string"){
                fetchedEvents = JSON.parse(fetchedEvents);
                setData(fetchedEvents);
                return ;
            }

            const currEvents = await getDocs(collection(db, 'hk_calendar_table'));

            let tempEvents = [];
            let currCount = 0; 
            currEvents.forEach((doc) => {
                let temp = doc.data();
                
                // temp.longitude = temp.longitude.toFixed(4);
                // temp.latitude = temp.latitude.toFixed(4);
                let currDay = parseInt(temp.start_date?.substring(8, 11));
                let currMonth = parseInt(temp.start_date?.substring(5,7));
                let currYear = parseInt(temp.start_date?.substring(0,4));
                let currHour = parseInt(temp.start_date?.substring(11, 13));
                let currMinutes = parseInt(temp.start_date?.substring(14, 16));
                let updatedTime = new Date(currYear, currMonth-1, currDay, currHour, currMinutes);
                temp.timestamp = updatedTime.getTime();
                if(temp.timestamp!==null && temp.timestamp>0) tempEvents.push(temp);
                currCount++;
            });

            tempEvents.sort((a, b) => a.timestamp - b.timestamp);
            localStorage.setItem("events", JSON.stringify(tempEvents));
            setData(tempEvents);
        }
        fetchEvents();
    }, []);

    function updateViewEvents(){
        setViewEvents(null);
        let reqTimeStamp = new Date(year, month-1, day, 0, 0);
        reqTimeStamp = reqTimeStamp.getTime();
        let pos = upperBound(data, reqTimeStamp);
        let cnt = 0;
        let tempViewEvents = [];
        if(data===null || data.length===0) return;
        while(pos !== data.length){
            if(cnt >= 10){
                setViewEvents(tempViewEvents);
                return;
            }
            let currIterTimeStamp = data[pos].timestamp;
            let currIterDate = new Date(currIterTimeStamp);
            currIterDate = currIterDate.getDate();
            if(currIterDate !== day){
                setViewEvents(tempViewEvents);
                return;
            }
            tempViewEvents.push(data[pos]);
            cnt = cnt+1;
            pos = pos+1;
        }
        setViewEvents(tempViewEvents);
    }

    useEffect(() => {
        updateViewEvents();
    }, [day, month, year]);

    return (
        <>
            <div className="home-container">
                <div className="map-container home-parent">
                    <div className="events-container">
                        {(viewEvents===null || viewEvents===undefined || viewEvents.length===0) ? <div className="events-no-display">No events on this day</div> : viewEvents?.map((item, index) => 
                            <div className="events-tab" key={index} >
                                <div className="events-title events-row">
                                    {item.title}
                                </div>
                                <div className="events-row">
                                    {item.start_date}
                                </div>
                                <div className="events-row">
                                    {item.end_date}
                                </div>
                                <div>
                                    {item.location}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="calendar-container home-parent2">
                    <div className="mt-6">
                        <CalendarSelector className="w-full" setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} dateMarker={null} />
                    </div>
                    <div>
                        <div className="events-btn-reset" onClick={resetAllLocal}>
                            Reset
                        </div>
                    </div>
                    {/* <div className="bg-red-300">
                        {data?.map((item, index) => 
                            <div key={index}>
                                {item.title}-{item.start_date}
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    );

}