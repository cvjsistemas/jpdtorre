import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: "http://localhost:3000" //url de ejemplo para
});


export default clienteAxios;