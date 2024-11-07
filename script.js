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
    }

    function mostrarPuntosFinales() {
        seccionJuego.classList.add('hidden');
        seccionPuntos.classList.remove('hidden');
        listaPuntos.innerHTML = '';
        juego.obtenerPuntosFinales().forEach(puntos => {
            const li = document.createElement('li');
            li.textContent = puntos;
            listaPuntos.appendChild(li);
        });
    }

    function seleccionarCartaAleatoria() {
        const tiposCarta = [CartaVerdad, CartaReto, CartaYoNuncaNunca];
        const TipoCarta = tiposCarta[Math.floor(Math.random() * tiposCarta.length)];
        return new TipoCarta();
    }

    class Carta {
        constructor(tipo, descripcion) {
            this.tipo = tipo;
            this.descripcion = descripcion;
        }
    }

    class CartaVerdad extends Carta {
        constructor() {
            const descripciones = [
                "¿Cuál es tu mayor miedo?",
                "¿Cuál ha sido tu momento más vergonzoso?",
                "¿Cuál es tu mayor secreto?"
            ];
            super("Verdad", descripciones[Math.floor(Math.random() * descripciones.length)]);
        }
    }

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
});