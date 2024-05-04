import { ReactDOM, useState, useEffect, createContext} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Rough from './pages/Rough';
import Events from './pages/Events.js';
import Loader from './layout/Loader.js';
import './App.css';
import useCustomQuery from './hooks/useCustomQuery.js';
import Wrapper from './layout/Wrapper.js';

export default function App() { 
  const [collections, setCollections] = useState("");
  let [data, setData] = useState(null);
  const [overallData, setOverallData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateMarker, setDateMarker] = useState(null);
  
  // fetch data once, as per name of collection
  data  = useCustomQuery({collections, setOverallData, setDateMarker, setLoading});

  // initially, set collectionName = 'hk_motion_table'
  useEffect(() => {
    let storedCollectionName = localStorage.getItem("collectionName")
    console.log("setting initial collection is: ", storedCollectionName);
    if(storedCollectionName === null){
      localStorage.setItem("collectionName", "hk_motion_table");
      setCollections("hk_motion_table");
    }
  }, []);

  // here, we set collection name as selected by user. That is being stored in local Storage as well.
  useEffect(() => {
    setCollections(localStorage.getItem("collectionName"));
  }, [collections]);

  return (
      <BrowserRouter>
        <Wrapper collections={collections} setCollections={setCollections}>
          <Loader load={loading} />
          <Routes>
            <Route path="/" element={<Home dateMarker={dateMarker} data={overallData}/>} />
            <Route path="/about" element={<About  data={overallData}/>} />
            <Route path="/rough" element={<Rough data={overallData} />} />
            <Route path="/events" element={<Events setCollections={setCollections} />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
  );
}
