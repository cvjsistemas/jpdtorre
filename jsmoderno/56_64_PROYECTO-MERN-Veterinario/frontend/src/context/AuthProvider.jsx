/* eslint-disable react/prop-types */
// import {  useNavigate} from 'react-router-dom';
import {useState, createContext, useEffect} from 'react'
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children})=>{

  
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    // const navigate = useNavigate();


    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token');
            // console.log(token);

            if(!token) {
                setCargando(false);
                return;
            }

            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} =await clienteAxios('/veterinarios/perfil',config);
                //console.log(data);
       
                setAuth(data);
               
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);

        }
        autenticarUsuario(); //
    },[])

    const cerrarsesion=()=>{
        localStorage.removeItem('token');
        setAuth({});
        // navigate("/");
      
    }

    const actualizarPerfil=async (datos)=>{
        //console.log(datos);
        const token = localStorage.getItem('token');
        // console.log(token);

        if(!token) {
            setCargando(false);
            return;
        }
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url=`/veterinarios/perfil/${datos._id}`;
            const {data} =await clienteAxios.put(url,datos,config);
             console.log(data);
            return {
                msg:'Actualizado correctamente'
            }
        } catch (error) {
            // console.log(error.response);
            return {
                msg:error.response.data.msg,
                error:true
            }
        }
    }

    const guardarpassword = async(datos)=>{
        const token = localStorage.getItem('token');
        // console.log(token);

        if(!token) {
            setCargando(false);
            return;
        }
        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url='/veterinarios/actualizar-password';

            const {data} = await clienteAxios.put(url,datos,config);
            console.log(data);

            return {
                msg: data.msg
            }
        } catch (error) {
           // console.log(error.response.data.msg);
           return {
            msg:error.response.data.msg,
            error:true
           }
        }

    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarsesion,
                actualizarPerfil,
                guardarpassword
              
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext;