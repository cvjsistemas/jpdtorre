/* eslint-disable react/prop-types */
import {createContext,useState,useEffect} from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

const PacientesProvider = ({children})=>{

    const [pacientes, setPacientes]= useState([]);
    const [paciente,setPaciente]= useState({});
    const {auth} = useAuth();

    useEffect(()=>{
        const obtenerPacientes = async ()=>{
            try {
                const token =localStorage.getItem('token');
                if(!token) return;

                const config={
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/paciente',config);
                //console.log(data);
                setPacientes(data);



            } catch (error) {
                console.log(error);
            }

        }
        obtenerPacientes();
    },[auth])


    const guardarPaciente =async (paciente)=>{
        //console.log(paciente);
        const token= localStorage.getItem('token');
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/paciente/${paciente.id}`,paciente,config);
               
                const pacientesActualizado = pacientes.map((pacientestate)=>{
                    pacientestate._id===data._id ? data : pacientestate;
                })
                
                setPacientes(pacientesActualizado);
                //console.log(pacientes);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
               
                const {data} = await clienteAxios.post('/paciente',paciente,config);
                // console.log(data);
                // eslint-disable-next-line no-unused-vars
                const { createdAt, updatedAt, __v,...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado,...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        return;


      
    }

    const setEdicion =(paciente)=>{
        // console.log(`editando ${id} `);
        setPaciente(paciente);
    }

    const eliminarPaciente = async(id)=>{
      

        // console.log(id);
        const confirmar = confirm('¿Confirmas que deseas eliminar?');

        if(confirmar){
            try {
                const token= localStorage.getItem('token');
                const config={
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Bearer ${token}`
                        }

                    }

                const {data} = await clienteAxios.delete(`/paciente/${id}`,config);
                console.log(data);
                const pacientesactualizado = pacientes.filter(pacientestate => pacientestate._id !==id);
                setPacientes(pacientesactualizado);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                setPacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}

export{
    PacientesProvider
}


export default PacientesContext;