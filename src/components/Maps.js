import {React, useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from 'leaflet';
import PopupInfo from "./Popup/Popup.js";
import "../data/firebaseConfig.js";

export default function Maps({updatedValues}){
    const position = [33.7811, -84.3898];
    const LegalIcon = new Icon ({
      iconUrl : "./loc.svg",
      iconSize : [40, 40], // size of the icon
      iconAnchor : [20, 40], // posiiton of icon wrt a relative area/square and where it should pop up.
      // also, the marker icon changes position if not properly configured. 
      // for better results, use chat-pt for explanation
      // here, we should set the y value to full (wrt size) - signifies it at its bottom, while x to half of icon's x.
      // this suggests it will be at the center, what we want. 

    });
    // const getSteps = (counts) => {
    //   if(counts >= 900) return 4;
    //   else if(counts>=200) return 3;
    //   else if(counts >= 10) return 2;
    //   else return 1;  
    // }

    return (
      (updatedValues===null || updatedValues===undefined) ? 
      <div>

      </div> :
      <MapContainer center={position} zoom={17} minZoom={2} className="w-full h-full rounded-sm">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { updatedValues?.map((value, index) => (
            <Marker key={index} position={[value.latitude, value.longitude]} icon={LegalIcon}>
            <Popup>
              <PopupInfo counts={value.counts} pace={value.current_pace} latitude={value.latitude} longitude={value.longitude} />
            </Popup>
          </Marker>
          
        ))}
      </MapContainer>      
    );
}