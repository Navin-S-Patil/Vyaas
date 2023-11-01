import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import list from "../../../utils/stockNames"

// const axios = require('axios');
// const list = require('../../../utils/stockData')

const initialState = getInitialStock();



async function getInitialStock(){
    var myMap = new Map();

        list.map((item)=>{
            try {
                const response = await axios.get("https://xzxsyc-5000.csb.app/api/stock/", {
                                    headers: {
                                        "Content-Type": "application/json",
                                        key: 'RAIT',
                                        symbol : item,
                                    }
                                });
                myMap.set(item,response.data);
        
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            
        })
            return myMap;
    
}


