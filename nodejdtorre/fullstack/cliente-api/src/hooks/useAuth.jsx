import {useContext} from 'react';
import CRMContext from '../context/CRMContext';

const useAuth=()=>{
    return useContext(CRMContext);
}

export default useAuth;