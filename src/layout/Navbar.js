"use client"
// import Link from "next/link";
import React, {useEffect, useState, useContext} from "react";
import Collection from "../components/Collection/Collection";
import { ThemeContext } from "../App";
export default function Navbar(props){
    const [navbar, updateNavbar] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 20) {
            updateNavbar(true);
        } 
        else {
            updateNavbar(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
    })

    return(
        <div className={navbar ? "navbar-container navbar-scroll" : "navbar-container navbar-scroll"}>
            <div className=" justify-center navbar-content flex sm:justify-between m-auto" >
                <div className="hidden sm:block navbar-logo">
                    e-Cig
                </div>
                <div className="navbar-main ">
                    <nav>
                        <ul className="flex">
                            <li>
                                <a href='/' className="px-4">Home</a>
                            </li>
                            <li>
                                <a href='/about' className="px-4">Data</a>
                            </li>
                            <li>
                                <a href='/events' className="px-4">Events</a>
                            </li>
                            <li>
                                <div>
                                    <Collection collections={props.collections} setCollections={props.setCollections} />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}