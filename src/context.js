import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";


const AllContext = createContext();

export const useThisContext = () => {
    return useContext(AllContext);
}

export const ContextProvider = ({ children }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [userEmail, setUserUserEmail] = useState('');
    // const [bills, setBills] = useState([]);
    const [currentBills, setCurrentBills] = useState([]);
    const [searchedBills, setSearchedBills] = useState([])
    const billPerPage = 10;
    const [pageCount, setPageCount] = useState(0);
    const [billCount, setBillCount] = useState(0)

    const value = {
        currentBills,
        setCurrentBills,
        billCount,
        setBillCount,
        pageCount,
        setPageCount,
        searchedBills,
        setSearchedBills,
        billPerPage,
        userEmail,
        setUserUserEmail,
        openPopup, setOpenPopup
    }
    return (
        <AllContext.Provider value={value}>
            {children}
        </AllContext.Provider>
    )
}