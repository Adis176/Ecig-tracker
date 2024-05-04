import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Wrapper(props){
    return(
        <div className="wrapper-container flex flex-col ">
            <Navbar collections={props.collections} setCollections={props.setCollections} />  
            <div className="wrapper-children z-10">
                {props.children}
            </div>
            <Footer />
        </div>
    );
}