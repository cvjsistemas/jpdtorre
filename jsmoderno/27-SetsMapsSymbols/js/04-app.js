const producto = {
    idproducto : 10
}

const weakmap = new WeakMap();
weakmap.set(producto,'Monitor');

console.log(weakmap.get(producto));