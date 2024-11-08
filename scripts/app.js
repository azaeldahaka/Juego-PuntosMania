import Juego from './juego.js';
import CartaVerdad from './cartas/cartaVerdad.js';
import CartaReto from './cartas/cartaReto.js';
import CartaYoNuncaNunca from './cartas/cartaYoNuncaNunca.js';

class JuegoDOM {
    constructor() {
        this.juego = new Juego();
        this.initDOMElements();
        this.addEventListeners();
    }

    initDOMElements() {
        this.nombreJugadorInput = document.getElementById('nombre-jugador');
        this.listaJugadores = document.getElementById('lista-jugadores');
        this.agregarJugadorBtn = document.getElementById('agregar-jugador');
        this.numRondasInput = document.getElementById('num-rondas');
        this.iniciarJuegoBtn = document.getElementById('iniciar-juego');
        this.seccionJuego = document.getElementById('seccion-juego');
        this.rondaActualDiv = document.getElementById('ronda-actual');
        this.siguienteRondaBtn = document.getElementById('siguiente-ronda');
        this.seccionPuntos = document.getElementById('seccion-puntos');
        this.listaPuntos = document.getElementById('lista-puntos');
        this.terminarJuegoBtn = document.getElementById('terminar-juego');
    }

    addEventListeners() {
        this.agregarJugadorBtn.addEventListener('click', () => this.agregarJugador());
        this.nombreJugadorInput.addEventListener('keydown', (e) => this.onEnter(e, () => this.agregarJugador()));
        this.iniciarJuegoBtn.addEventListener('click', () => this.iniciarJuego());
        this.numRondasInput.addEventListener('keydown', (e) => this.onEnter(e, () => this.iniciarJuego()));
        this.siguienteRondaBtn.addEventListener('click', () => this.siguienteRonda());
        this.terminarJuegoBtn.addEventListener('click', () => this.terminarJuego());
    }

    onEnter(event, action) {
        if (event.key === 'Enter') {
            event.preventDefault();
            action();
        }
    }

    agregarJugador() {
        const nombre = this.nombreJugadorInput.value.trim();
        if (nombre) {
            this.juego.agregarJugador(nombre);
            const li = document.createElement('li');
            li.textContent = nombre;
            this.listaJugadores.appendChild(li);
            this.nombreJugadorInput.value = '';
        }
    }

    iniciarJuego() {
        const numRondas = parseInt(this.numRondasInput.value, 10);
        if (this.juego.iniciarJuego(numRondas)) {
            this.seccionJuego.classList.remove('hidden');
            this.mostrarRondaActual();
        }
    }

    siguienteRonda() {
        const resultadoSelect = document.getElementById(`resultado-${this.juego.obtenerJugadorActual().nombre}-${this.juego.rondaActual}`);
        const resultado = resultadoSelect.value;

        if (this.juego.siguienteRonda(resultado)) {
            this.mostrarPuntosFinales();
        } else {
            this.mostrarRondaActual();
        }
    }

    terminarJuego() {
        alert('Juego terminado!');
        this.mostrarPuntosFinales();
    }

    mostrarRondaActual() {
        this.rondaActualDiv.innerHTML = '';
        const jugador = this.juego.obtenerJugadorActual();
        const carta = this.seleccionarCartaAleatoria();
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'mb-4', 'border', 'border-gray-300');
        cartaDiv.innerHTML = `
            <p class="text-lg font-bold">${jugador.nombre}, es tu turno.</p>
            <div class="p-4 bg-gray-100 rounded mt-2">
                <p class="text-xl font-bold">${carta.tipo}</p>
                <p class="text-md">${carta.descripcion}</p>
            </div>
            <label for="resultado-${jugador.nombre}-${this.juego.rondaActual}" class="block mt-4 mb-2">¿Cuál fue tu resultado?</label>
            <select id="resultado-${jugador.nombre}-${this.juego.rondaActual}" class="w-full p-2 border border-gray-300 rounded">
                <option value="lo cumplió">Lo cumplió</option>
                <option value="no lo cumplió">No lo cumplió</option>
                <option value="a medias">A medias</option>
            </select>
        `;
        this.rondaActualDiv.appendChild(cartaDiv);
    }

    mostrarPuntosFinales() {
        this.seccionJuego.classList.add('hidden');
        this.seccionPuntos.classList.remove('hidden');
        this.listaPuntos.innerHTML = '';
        this.juego.obtenerPuntosFinales().forEach(puntos => {
            const li = document.createElement('li');
            li.textContent = puntos;
            this.listaPuntos.appendChild(li);
        });
    }

    seleccionarCartaAleatoria() {
        const tiposCarta = [CartaVerdad, CartaReto, CartaYoNuncaNunca];
        const TipoCarta = tiposCarta[Math.floor(Math.random() * tiposCarta.length)];
        return new TipoCarta();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JuegoDOM();
});

export default JuegoDOM;
