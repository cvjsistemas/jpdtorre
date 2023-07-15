import {Citas} from '../js/classes/Citas.js';

describe('probar la clase de citas',()=>{
    test('agregar una cita',()=>{

        const citas = new Citas();

        const citaObj = {
            mascota: 'Hook',
            propietario: 'Juan',
            telefono: '2323321',
            fecha: '10-12-2020',
            hora:'10:30',
            sintomas: 'Solo duerme'
        };

        citaObj.id = Date.now();

        citas.agregarCita(citaObj);

        expect(citas).toMatchSnapshot();
        
    });
})