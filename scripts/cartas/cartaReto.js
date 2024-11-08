import Carta from './carta.js';

class CartaReto extends Carta {
    constructor() {
        const descripciones = [
            "Haz 10 flexiones",
            "Canta tu canción favorita",
            "Baila durante 30 segundos"
        ];
        super("Reto", descripciones[Math.floor(Math.random() * descripciones.length)]);
    }
}

export default CartaReto;
