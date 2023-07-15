const password="123456";

describe("Valida que el password no este vacio y tenga una extension de 6 catacteres",()=>{
    test("debe tener una extension de 6 caracteres",()=>{
        expect(password).toHaveLength(6)
    });

    test('password no vacio',()=>{
        expect(password).not.toHaveLength(0);
    });
});