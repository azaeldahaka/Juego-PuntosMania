class Carta {
    constructor(tipo, descripciones) {
        this.tipo = tipo;
        this.descripcion = descripciones[Math.floor(Math.random() * descripciones.length)];
    }
}

export default Carta;
