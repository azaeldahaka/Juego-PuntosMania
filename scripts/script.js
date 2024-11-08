class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
    }
}

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
        if (resultado === 'lo cumplió') {
            this.jugadores[this.jugadorActualIndex].puntos += 10;
        } else if (resultado === 'a medias') {
            this.jugadores[this.jugadorActualIndex].puntos += 5;
        }

        this.jugadorActualIndex++;
        if (this.jugadorActualIndex >= this.jugadores.length) {
            this.jugadorActualIndex = 0;
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

document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego();
    const formJugadores = document.getElementById('form-jugadores');
    const nombreJugadorInput = document.getElementById('nombre-jugador');
    const listaJugadores = document.getElementById('lista-jugadores');
    const agregarJugadorBtn = document.getElementById('agregar-jugador');
    const formConfiguracion = document.getElementById('form-configuracion');
    const numRondasInput = document.getElementById('num-rondas');
    const iniciarJuegoBtn = document.getElementById('iniciar-juego');
    const seccionJuego = document.getElementById('seccion-juego');
    const rondaActualDiv = document.getElementById('ronda-actual');
    const siguienteRondaBtn = document.getElementById('siguiente-ronda');
    const seccionPuntos = document.getElementById('seccion-puntos');
    const listaPuntos = document.getElementById('lista-puntos');

    agregarJugadorBtn.addEventListener('click', () => {
        const nombre = nombreJugadorInput.value.trim();
        if (nombre) {
            juego.agregarJugador(nombre);
            const li = document.createElement('li');
            li.textContent = nombre;
            listaJugadores.appendChild(li);
            nombreJugadorInput.value = '';
        }
    });

    iniciarJuegoBtn.addEventListener('click', () => {
        const numRondas = parseInt(numRondasInput.value, 10);
        if (juego.iniciarJuego(numRondas)) {
            seccionJuego.classList.remove('hidden');
            mostrarRondaActual();
        }
    });

    siguienteRondaBtn.addEventListener('click', () => {
        const resultadoSelect = document.getElementById(`resultado-${juego.obtenerJugadorActual().nombre}-${juego.rondaActual}`);
        const resultado = resultadoSelect.value;

        if (juego.siguienteRonda(resultado)) {
            mostrarPuntosFinales();
        } else {
            mostrarRondaActual();
        }
    });

    function mostrarRondaActual() {
        rondaActualDiv.innerHTML = '';
        const jugador = juego.obtenerJugadorActual