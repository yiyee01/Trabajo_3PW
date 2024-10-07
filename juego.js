const celdas = document.querySelectorAll('.celda');
const estado = document.getElementById('estado');
const reinicio = document.getElementById('reinicio');
const comenzar_juego = document.getElementById('comenzar_juego');
const jugadorx = document.getElementById('nombreX');
const jugadoro = document.getElementById('nombreO'); 
const nuevo_juego = document.getElementById('nuevo_juego');

//variables del juego
let jugador_actual ='x';
let juego_activo = false;
let estado_juego = [];
let nombre_jugadorx='';
let nombre_jugadoro='';

//mensajes de estado
const mensaje_victoria = (jugador) => `${jugador} ha ganado!`
const mensaje_empate = () => `Empate!`
const turno_jugador_actual = () => `Turno de ${jugador_actual === 'x' ? nombre_jugadorx : nombre_jugadoro}`;

//inicializa el estado del juego
const inicializar_juego = () => {
    estado_juego = ["", "", "", "", "", "", "", "", ""];
    juego_activo = true;
    jugador_actual = 'x';
    estado.innerHTML = turno_jugador_actual();
    document.getElementById('tabla').style.display = 'grid';
    celdas.forEach(celda => celda.innerHTML = '');
    reinicio.style.display = "none";
    nuevo_juego.style.display = "none";
};

//comienzo del juego
const comienzo_juego = () => {
    nombre_jugadorx = jugadorx.value.trim();
    nombre_jugadoro = jugadoro.value.trim();

    if (nombre_jugadoro && nombre_jugadorx){
        document.getElementById('nombres').style.display='none';
        inicializar_juego();
    } else {
        alert('Por favor, ingrese el nombre de los 2 jugadores.');
    }
};

//verificacion de ganadores
const condiciones_para_ganar = [
    [0, 1, 2], //fila 1
    [3, 4, 5], //fila 2
    [6, 7, 8], //fila 3
    [0, 3, 6], //columna 1
    [1, 4, 7], //columna 2
    [2, 5, 8], //columna 3
    [0, 4, 8], //diagonal
    [2, 4, 6], //diagonal
];

//manejo del click
const manejar_click = (event) =>{
    const celda_clickeada= event.target;
    const index_celda_clickeada = parseInt(celda_clickeada.getAttribute('data-index'));

    if (estado_juego[index_celda_clickeada] !== '' || !juego_activo){
        return;
    }

    estado_juego[index_celda_clickeada]=jugador_actual;
    celda_clickeada.innerHTML=jugador_actual;

    verificar_resultado();
};

//verificar resultado del juego
const verificar_resultado = () =>{
    let ronda_ganada=false;

    for (let i=0; i < condiciones_para_ganar.length; i++){
        const [a, b, c] = condiciones_para_ganar[i];
        if (estado_juego[a]==='' || estado_juego[b]==='' || estado_juego[c]===''){
            continue;
        }
        if (estado_juego[a]===estado_juego[b] && estado_juego[a]===estado_juego[c]){
            ronda_ganada = true;
            break;
        }
    }

    if (ronda_ganada){
        estado.innerHTML = mensaje_victoria(jugador_actual==='x' ? nombre_jugadorx : nombre_jugadoro);
        juego_activo=false;
        reinicio.style.display='block';
        nuevo_juego.style.display = "block";
        return;
    }

    //comprobar empate
    if (!estado_juego.includes('')){
        estado.innerHTML=mensaje_empate();
        juego_activo=false;
        reinicio.style.display='block';
        return;
    }

    //cambio de jugador
    jugador_actual= jugador_actual==='x'? 'o':'x';
    estado.innerHTML=turno_jugador_actual();
};

//reinicio del juego
const reiniciar_juego = () =>{
    inicializar_juego();
    celdas.forEach(celda => celda.innerHTML = ''); 
};

const comenzar_nuevo_juego = () =>{
    document.getElementById('nombres').style.display = 'block';
    reinicio.style.display = 'none';
    nuevo_juego.style.display = 'none';
    estado.innerHTML = '';
    celdas.forEach(celda => celda.innerHTML = '');
    document.getElementById('tabla').style.display = "none";
};

//asignar eventos
nuevo_juego.addEventListener('click', comenzar_nuevo_juego);
celdas.forEach(celda => celda.addEventListener('click', manejar_click));
reinicio.addEventListener('click', reiniciar_juego);
comenzar_juego.addEventListener('click', comienzo_juego);