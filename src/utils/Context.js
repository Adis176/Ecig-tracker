import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [item, setItem] = useState('hk_motion_table');
    return (
        <Context.Provider value={{ item, setItem }}>
            {children}
        </Context.Provider>
    );
};