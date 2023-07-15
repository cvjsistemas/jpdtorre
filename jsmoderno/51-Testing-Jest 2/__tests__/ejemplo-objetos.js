const cliente ={
    nombre:'Juan Torre',
    balance:500
};

describe('testing al cliente',()=>{
    test('el cliente es premiun',()=>{
        expect(cliente.balance).toBeGreaterThan(400);
    });

    test('es Juan Torre',()=>{
        expect(cliente.nombre).toBe('Juan Torre');
    });

    test('no es otro cliente',()=>{
        expect(cliente.nombre).not.toBe('Pedro');
    });
})

