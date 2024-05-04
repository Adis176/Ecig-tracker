import React, {useState, useEffect, useRef, useContext} from "react";
import dayjs from "dayjs";
import "../data/firebaseConfig.js";
import { getFirestore, collection } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
import { Context } from "../utils/Context.js";
export default function useFetch( count, setOverallData, setOverallLoading, setOverallDateMarker){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState([]);
    const [dateMarker, setDateMarker] = useState([]);
    const cache = useRef({});
    const db = getFirestore();
    let collectionName = localStorage.getItem("collection");
    const {item, setItem} = useContext(Context);
    const fetchDataFromFirestore = async (collectionName, count) => {
        try{
            if(cache.current[collectionName]){
                const data = cache.current[collectionName];
                setData(data);
                return;
            }
            setLoading(true);
            setOverallLoading(true);
            const querySnapshot = await getDocs(collection(db, collectionName));
            const temporaryArr = [], tempMarker = [];
            let currCount = 0;
            querySnapshot.forEach((doc) => {
                if (currCount < count) {
                    let temp = doc.data();
                    temp.longitude = temp.longitude.toFixed(4);
                    temp.latitude = temp.latitude.toFixed(4);
                    temporaryArr.push(temp);
                    currCount++;
                } else {
                    // Break the loop when 1000 entries are acquired
                    return;
                }
            });

            let uniqueCombinations = new Set();
            let filterArr = temporaryArr.filter((obj) => {
                // due to UI contraints, adjacent latitude, with same longitude should also not be allowed.
                // so convert each atrribute pair to string, then compare. 
                let combination = `${obj.timestamp},${obj.latitude},${obj.longitude}`;
                let combination2 = `${obj.timestamp},${obj.latitude+1},${obj.longitude}`;
                if (uniqueCombinations.has(combination)) {
                    // Duplicate combination found, exclude this object
                    return false;
                } else {
                    // Unique combination, add to Set and include this object
                    uniqueCombinations.add(combination);
                    uniqueCombinations.add(combination2);
                    return true;
                }
            });
            filterArr.sort((a, b) => a.timestamp - b.timestamp);
            tempMarker.push(filterArr[0].timestamp);
            for(let ind=1; ind!==filterArr.length; ind++){
                const prevDay = (dayjs(filterArr[ind-1].timestamp)).format('DD-MM-YYYY');
                const currDay = (dayjs(filterArr[ind].timestamp)).format('DD-MM-YYYY');
                if(currDay !== prevDay){
                    tempMarker.push(filterArr[ind].timestamp);
                }
            }
            setData(filterArr);
            setOverallData(filterArr);
            cache.current[collectionName] = filterArr;
            setDateMarker(tempMarker);
            setOverallDateMarker(tempMarker);
            setLoading(false);
            setOverallLoading(false);
        }
        catch (error){
            alert(error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataFromFirestore(collectionName, count);
    }, []);
    return {error};
}