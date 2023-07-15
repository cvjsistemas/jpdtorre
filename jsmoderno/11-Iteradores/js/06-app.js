const pendientes = ['tarea','comer','proyecto','estudiar js'];

pendientes.forEach((pendiente,index)=>{
    console.log(`${index} : ${pendiente}`);
});

pendientes.map((pendiente,index)=>{
    console.log(`${index} : ${pendiente}`);
});