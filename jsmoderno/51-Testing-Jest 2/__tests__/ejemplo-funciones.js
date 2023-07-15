
function suma(a, b) {
    return a + b;
}

function restar(a,b) {
    return a - b;
}

describe('testing a las funciones suma y resta',()=>{
    test('suma de 20 y 30',()=>{
        expect(suma(20,30)).toBe(50);
    });

    test('resta de 10 y 5',()=>{
        expect(restar(10,5)).toBe(5);
    });
});