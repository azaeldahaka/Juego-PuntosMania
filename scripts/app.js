import Juego from './juego.js';
import CartaVerdad from './cartas/cartaVerdad.js';
import CartaReto from './cartas/cartaReto.js';
import CartaYoNuncaNunca from './cartas/cartaYoNuncaNunca.js';

document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego();
    const nombreJugadorInput = document.getElementById('nombre-jugador');
    const listaJugadores = document.getElementById('lista-jugadores');
    const agregarJugadorBtn = document.getElementById('agregar-jugador');
    const errorMsg = document.getElementById('error-msg'); // Elemento para el mensaje de error
    const numRondasInput = document.getElementById('num-rondas');
    const iniciarJuegoBtn = document.getElementById('iniciar-juego');
    const seccionJuego = document.getElementById('seccion-juego');
    const rondaActualDiv = document.getElementById('ronda-actual');
    const siguienteRondaBtn = document.getElementById('siguiente-ronda');
    const seccionPuntos = document.getElementById('seccion-puntos');
    const listaPuntos = document.getElementById('lista-puntos');

    const agregarJugador = () => {
        const nombre = nombreJugadorInput.value.trim();
        if (nombre) {
            juego.agregarJugador(nombre);
            const li = document.createElement('li');
            li.textContent = nombre;
            listaJugadores.appendChild(li);
            nombreJugadorInput.value = '';
            errorMsg.classList.add('hidden');
        } else {
            errorMsg.textContent = 'Por favor ingresa un nombre de jugador.';
            errorMsg.classList.remove('hidden');
        }
    };

    const iniciarJuego = () => {
        const numRondas = parseInt(numRondasInput.value, 10);
        if (juego.iniciarJuego(numRondas)) {
            seccionJuego.classList.remove('hidden');
            mostrarRondaActual();
        }
    };

    agregarJugadorBtn.addEventListener('click', agregarJugador);
    nombreJugadorInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarJugador();
        }
    });

    iniciarJuegoBtn.addEventListener('click', iniciarJuego);
    numRondasInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            iniciarJuego();
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

    const mostrarRondaActual = () => {
        rondaActualDiv.innerHTML = '';
        const jugador = juego.obtenerJugadorActual();
        const carta = seleccionarCartaAleatoria();
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'mb-4', 'border', 'border-gray-300');
        cartaDiv.innerHTML = `
            <p class="text-lg font-bold">${jugador.nombre}, es tu turno.</p>
            <div class="p-4 bg-gray-100 rounded mt-2">
                <p class="text-xl font-bold">${carta.tipo}</p>
                <p class="text-md">${carta.descripcion}</p>
            </div>
            <label for="resultado-${jugador.nombre}-${juego.rondaActual}" class="block mt-4 mb-2">¿Cuál fue tu resultado?</label>
            <select id="resultado-${jugador.nombre}-${juego.rondaActual}" class="w-full p-2 border border-gray-300 rounded">
                <option value="lo cumplió">Lo cumplió</option>
                <option value="no lo cumplió">No lo cumplió</option>
                <option value="a medias">A medias</option>
            </select>
        `;
        rondaActualDiv.appendChild(cartaDiv);
    };

    const mostrarPuntosFinales = () => {
        seccionJuego.classList.add('hidden');
        seccionPuntos.classList.remove('hidden');
        listaPuntos.innerHTML = '';
        juego.obtenerPuntosFinales().forEach(puntos => {
            const li = document.createElement('li');
            li.textContent = puntos;
            listaPuntos.appendChild(li);
        });
    };

    const seleccionarCartaAleatoria = () => {
        const tiposCarta = [CartaVerdad, CartaReto, CartaYoNuncaNunca];
        const TipoCarta = tiposCarta[Math.floor(Math.random() * tiposCarta.length)];
        return new TipoCarta();
    };
});


