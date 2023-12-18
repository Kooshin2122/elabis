//
import { createContext, useContext, useEffect, useState } from "react";
//
const AppContxt = createContext();
//
const AppContext = ({ children }) => {
    const [userData, setUserData] = useState(false);
    const [userLocation, setUserLocation] = useState();
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    return (
        <AppContxt.Provider value={{
            userData, setUserData,
            isUserLogin, setIsUserLogin,
            userLocation, setUserLocation,
            subCategoriesData, setSubCategoriesData,
        }}>
            {children}
        </AppContxt.Provider>
    );
};
//
export const useAppContext = () => {
    return useContext(AppContxt);
};
//
export default AppContext;
//