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
    // const billPerPage = 10;
    // const [pageCount, setPageCount] = useState(null)
    // useEffect(() => {
    //     const AuthString = `Bearer ${localStorage.getItem('token')}`
    //     axios.get('https://stormy-cliffs-96809.herokuapp.com/api/billing-list', { 'headers': { 'Authorization': AuthString } })
    //         .then(res => {
    //             setBills(res.data)
    //         })
    // }, [])
    // useEffect(() => {
    //     setPageCount(Math.ceil(bills.length / billPerPage))
    // }, [bills])
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