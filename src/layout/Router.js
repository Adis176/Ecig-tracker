
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import ContextProvider from '../components/ContextProvider';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Rough from '../pages/Rough';
import Loader from './Loader';
export default function Router(){
    const [overallData, setOverallData] = useState(null);
      
      const {loading, data, error, dateMarker} = useFetch("hk_motion_table", 10);
    return(
        <ContextProvider.Provider value={overallData}>
        <BrowserRouter>
            <Loader load={loading} />
            <Routes>
                <Route path="/" element={<Home dateMarker={dateMarker} />} />
                <Route path="/about" element={<About  />} />
                <Route path="/rough" element={<Rough/>} />
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </BrowserRouter>
        </ContextProvider.Provider>
    );
}