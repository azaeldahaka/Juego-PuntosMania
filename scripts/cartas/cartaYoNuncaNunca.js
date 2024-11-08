import Carta from './carta.js';

class CartaYoNuncaNunca extends Carta {
    constructor() {
        const descripciones = [
            "Yo nunca nunca he mentido a mis padres",
            "Yo nunca nunca he hecho trampa en un examen",
            "Yo nunca nunca he robado algo"
        ];
        super("Yo Nunca Nunca", descripciones[Math.floor(Math.random() * descripciones.length)]);
    }
}

export default CartaYoNuncaNunca;
