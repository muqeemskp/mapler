import React, {createContext, useContext, useState} from "react";

const CityContext = createContext();

export function CityProvider({children}){
    const [city, setCity] = useState('');
    const [position, setPosition] = useState(null);
    const[loading, setLoading] = useState(false);

    return(
        <CityContext.Provider value={{city, setCity, position, setPosition}}>
            {children}
        </CityContext.Provider>
    )
}

export const useCity = () => useContext(CityContext);