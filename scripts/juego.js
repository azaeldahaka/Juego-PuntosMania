import Jugador from './jugador.js';

class Juego {
    constructor() {
        this.jugadores = [];
        this.rondaActual = 0;
        this.jugadorActualIndex = 0;
    }

    agregarJugador(nombre) {
        this.jugadores.push(new Jugador(nombre));
    }

    iniciarJuego(numRondas) {
        if (numRondas > 0 && this.jugadores.length > 0) {
            this.rondaActual = 1;
            this.jugadorActualIndex = 0;
            return true;
        }
        return false;
    }

    siguienteRonda(resultado) {
        const puntosGanados = { 'lo cumplió': 10, 'a medias': 5, 'no lo cumplió': 0 };
        this.jugadores[this.jugadorActualIndex].puntos += puntosGanados[resultado] || 0;

        this.jugadorActualIndex = (this.jugadorActualIndex + 1) % this.jugadores.length;
        if (this.jugadorActualIndex === 0) {
            this.rondaActual++;
        }

        return this.rondaActual > parseInt(document.getElementById('num-rondas').value, 10);
    }

    obtenerJugadorActual() {
        return this.jugadores[this.jugadorActualIndex];
    }

    obtenerPuntosFinales() {
        return this.jugadores.map(jugador => `${jugador.nombre}: ${jugador.puntos} puntos`);
    }
}

export default Juego;
