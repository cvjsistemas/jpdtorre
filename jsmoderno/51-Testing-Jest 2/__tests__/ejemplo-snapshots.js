const cliente ={
    nombre:'Juan P',
    balance:500,
    tipo:'premium'
}

describe('testing al cliente',()=>{
    test('comprobar objeto',()=>{
        expect(cliente).toMatchSnapshot();
    });
})