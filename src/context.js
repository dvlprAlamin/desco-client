import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";


const AllContext = createContext();

export const useThisContext = () => {
    return useContext(AllContext);
}

export const ContextProvider = ({ children }) => {
    const [bills, setBills] = useState([]);
    const [currentBills, setCurrentBills] = useState([])
    const billPerPage = 10;
    const [pageCount, setPageCount] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/api/billing-list')
            .then(res => {
                setBills(res.data)
            })
    }, [])
    useEffect(() => {
        setPageCount(Math.ceil(bills.length / billPerPage))
    }, [bills])
    const value = {
        currentBills, setCurrentBills,
        bills, setBills,
        pageCount, setPageCount,
        billPerPage
    }
    return (
        <AllContext.Provider value={value}>
            {children}
        </AllContext.Provider>
    )
}