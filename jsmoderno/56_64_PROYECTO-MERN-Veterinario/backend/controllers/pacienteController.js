import Paciente from '../models/Paciente.js';


const agregarpaciente = async(req, res)=>{
    try {
        const paciente= new Paciente(req.body);
        console.log(req.session.veterinario);
        const {veterinario} =req.session;
        paciente.veterinario= veterinario._id;

        const pacientealmacenado = await paciente.save();
        res.status(200).json(pacientealmacenado);
        
    } catch (error) {
        console.log(error);
    }
}

const obtenerpacientes =async(req,res)=>{
    const {veterinario} =req.session;
    console.log(veterinario);
    const pacientes = await Paciente.find().where('veterinario').equals(veterinario._id);

    res.json(pacientes);


}


const obtenerpaciente =async(req,res)=>{
    const {id} = req.params;
    const {veterinario} =req.session;

    const paciente =await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() != veterinario._id.toString()){
        return res.json({msg:'Accion no valida'});
    }
   
    res.json(paciente);
  
}

const actualizarpaciente =async(req,res)=>{
    const {id} = req.params;
    const {veterinario} =req.session;

    const paciente =await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() != veterinario._id.toString()){
        return res.json({msg:'Accion no valida'});
    }

    //actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre ;
    paciente.propietario = req.body.propietario || paciente.propietario ;
    paciente.email = req.body.email || paciente.email ;
    paciente.fecha = req.body.fecha || paciente.fecha ;
    paciente.sintomas = req.body.sintomas || paciente.sintomas ;

    try {
        const pacienteactualizado = await paciente.save();
        res.json(pacienteactualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarpaciente =async(req,res)=>{
    const {id} = req.params;
    const {veterinario} =req.session;

    const paciente =await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() != veterinario._id.toString()){
        return res.json({msg:'Accion no valida'});
    }

    try {
        await paciente.deleteOne();
        res.json({msg:'Paciente Eliminado'});
    } catch (error) {
        console.log(error); //
    }
}

export {
    agregarpaciente,
    obtenerpacientes,
    obtenerpaciente,
    actualizarpaciente,
    eliminarpaciente
}