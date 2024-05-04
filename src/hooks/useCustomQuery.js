import { useContext, useEffect, useState} from 'react';
import dayjs from "dayjs";
import "../data/firebaseConfig.js";
import { getFirestore, collection } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore";
const db = getFirestore();

const count = 1000;

// as collections name changes, this query will be executed that many times.
// for that, we use a useEffect Hook, along with a custom parameter to keep track off - as collections itself.
const useCustomQuery = ({collections, setOverallData, setDateMarker, setLoading}) => {
    useEffect(() => {

        // async fetch of data
        const fetchData = async () => {
            let dataInStorage = localStorage.getItem(collections);

            // check if data is in local Storage or not
            if(dataInStorage!==null && dataInStorage!==undefined && typeof(dataInStorage)==="string"){
                dataInStorage = JSON.parse(dataInStorage);
                setOverallData(dataInStorage);

                let DateCollection = collections+"date";
                let dateMarkerInStorage = localStorage.getItem(DateCollection);
                dateMarkerInStorage = JSON.parse(dateMarkerInStorage);
                setDateMarker(dateMarkerInStorage);
                return dataInStorage;
            }

            // else, if data is not present in local Storage, then we need to fetch from firebase.
            // set the loading screen to appear.
            setLoading(true);

            const querySnapshot = await getDocs(collection(db, collections ? collections:'hk_motion_table'));
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
                    // Break the loop when number of required entries are acquired
                    return;
                }
            });
        
            // Check that not too many adjacent points, due to UI constraints.
            // all stored in filterArr.
            let uniqueCombinations = new Set();
            let filterArr = temporaryArr.filter((obj) => {

                // due to UI contraints, adjacent latitude, with same longitude should also not be allowed.
                // so convert each atrribute pair to string, then compare. 
                let combination = `${obj?.timestamp},${obj.latitude},${obj.longitude}`;
                let combination2 = `${obj?.timestamp},${obj.latitude+1},${obj.longitude}`;
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

            filterArr.sort((a, b) => a?.timestamp - b?.timestamp);
            tempMarker.push(filterArr[0]?.timestamp);
            for(let ind=1; ind!==filterArr.length; ind++){
                const prevDay = (dayjs(filterArr[ind-1]?.timestamp)).format('DD-MM-YYYY');
                const currDay = (dayjs(filterArr[ind]?.timestamp)).format('DD-MM-YYYY');
                if(currDay !== prevDay){
                    tempMarker.push(filterArr[ind]?.timestamp);
                }
            }

            localStorage.setItem(collections, JSON.stringify(filterArr));
            localStorage.setItem(collections+"date", JSON.stringify(tempMarker));
            setOverallData(filterArr);
            setDateMarker(tempMarker);
            setLoading(false);
            return filterArr;
        };
        fetchData();
    }, [collections]);    
};

export default useCustomQuery;
