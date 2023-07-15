/* eslint-disable react/prop-types */

import {useState, createContext} from 'react'
// import clienteAxios from '../config/axios';


const CRMContext = createContext();

const CRMProvider = ({children})=>{

    const [auth,setAuth] = useState({
        token:'',
        auth:false
    });

 

    return(
        <CRMContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </CRMContext.Provider>
    )



}

export{
    CRMProvider
   
}

export default CRMContext

