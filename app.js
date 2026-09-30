let preguntasJuego = []; //guarda las 4 preguntas seleccionadas
let rondaActual = 1; //empezamos ronda 1
function barajar(array){
    let copia = array.slice();
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temporal = copia [i];
        copia[i] = copia[j];
        copia[j] = temporal;
        
    }
    return copia;
}


async function cargarPreguntas() {
    try{
        let respuesta = await fetch("preguntas.json");
        if(!respuesta.ok) {
            throw new Error("No se ha podido encontrar preguntas.json");
        }
        //convertimos objeto o lista

        let datos = await respuesta.json();

        //barajamos preguntas

        let preguntasDesordenadas = barajar(datos);

        //solo las 4 preguntas de la partida 

        let preguntasPartida = preguntasDesordenadas.slice(0, 4);

        //miramos las 4 preguntas y las mezclamos
        //termina bucle

        for (let i = 0; i < preguntasPartida.length; i++) {
            preguntasPartida[i].respuestas = barajar(preguntasPartida[i].respuestas);
        }

        preguntasJuego = preguntasPartida;

        console.log("Preguntas leidas con exito:", preguntasPartida);
        mostrarRonda1();

    } catch (error){
        console.error("Error al cargar los datos:", error.message);
    }
}

cargarPreguntas();

function mostrarRonda1() {

    //buscamos contenedor por Id

    let contenedor = document.getElementById("contenedor-preguntas");

    //solo 2 primeras preguntas del array

    let preguntasRonda1 = [preguntasJuego[0], preguntasJuego[1]];

    //recorremos las 2 preguntas

    for (let i = 0; i < preguntasRonda1.length; i++){
        let preguntaActual = preguntasRonda1[i];

        //creo un div (tarjeta contenedora) para la pregunta

        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-pregunta";

        //creo titulo con el texto de la pregunta(h3)

        let titulo = document.createElement("h3");
        titulo.textContent = preguntaActual.pregunta;
        tarjeta.appendChild(titulo);

        //recorro las respuestas de esa pregunta
        for(let j = 0; j < preguntaActual.respuestas.length; j++) {
            let respuestaActual = preguntaActual.respuestas[j];

            //creo un boton para cada respuesta
            
            let boton = document.createElement("button");
            boton.textContent = respuestaActual.texto;
            boton.className = "btn-opcion";

            //evento para cuando clique el boton
            boton.addEventListener("click", function() {
                let botonesTarjeta = tarjeta.querySelectorAll(".btn-opcion");
                for (let k = 0; k < botonesTarjeta.length; k++){
                    botonesTarjeta[k].classList.remove("seleccionado");
                }
                boton.classList.add("seleccionado");
                tarjeta.dataset.acertada = respuestaActual.correcta;
                
            });

            //meto boton dentro tarjeta
            tarjeta.appendChild(boton);
            //appendChild: meter un elemento HTML dentro de otro
        }

        //meto la tarjeta completa dentro del contenedor principal
        contenedor.appendChild(tarjeta);


    }

    function comprobarRonda(){
        //obtenemos todas las tarjetas de preguntas visibles
        let tarjetas = document.querySelectorAll(".tarjeta-pregunta");
        //verificamos que se hayan respondido ambas preguntas
        for (let i = 0; i < tarjetas.length; i++){
            if (!tarjetas[i].dataset.acertada){
                alert("Por favor, responde a todas las preguntas antes de comprobar.");
                return;
            }
        }

        //Revisamos si todas son correctas
        let todasCorrectas = true;
        for (let i = 0; i < tarjetas.length; i++){
            if (tarjetas[i].dataset.acertada !== "true"){
                todasCorrectas = false;
            }
        }
        // Resultado según los aciertos
        if (todasCorrectas) {
        if (rondaActual === 1) {
            alert("¡Ronda 1 superada! Pasamos a la Ronda 2.");
        bloquearPreguntasActuales();
        rondaActual = 2;
        mostrarRonda2();
    } else if (rondaActual === 2) {
        alert("¡Felicidades! Has ganado el concurso.");
        bloquearPreguntasActuales();
    }
} else {
    alert("Has fallado alguna pregunta. Fin del juego.");
    bloquearPreguntasActuales();}

    }

    document.getElementById("btn-comprobar").addEventListener("click", comprobarRonda);

    function bloquearPreguntasActuales(){
        // Buscamos todos los botones de opciones que hay en la pantalla
        let todosLosBotones = document.querySelectorAll(".btn-opcion");
        for (let i = 0; i < todosLosBotones.length; i++){
            // Desactiva el botón para que no se pueda pulsar
            todosLosBotones[i].disable = true;
        }
    }
    function mostrarRonda2() {
        let contenedor = document.getElementById("contenedor-preguntas");

        // Tomamos la 3ª y 4ª pregunta de la partida
        let preguntasRonda2 = [preguntasJuego[2], preguntasJuego[3]];

  for (let i = 0; i < preguntasRonda2.length; i++) {
        let preguntaActual = preguntasRonda2[i];

        let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-pregunta";

        let titulo = document.createElement("h3");
    titulo.textContent = preguntaActual.pregunta;
    tarjeta.appendChild(titulo);

    for (let j = 0; j < preguntaActual.respuestas.length; j++) {
        let respuestaActual = preguntaActual.respuestas[j];

         let boton = document.createElement("button");

      boton.textContent = respuestaActual.texto;
      boton.className = "btn-opcion";

      boton.addEventListener("click", function () {
        let botonesTarjeta = tarjeta.querySelectorAll(".btn-opcion");
        for (let k = 0; k < botonesTarjeta.length; k++) {
          botonesTarjeta[k].classList.remove("seleccionado");
        }
        boton.classList.add("seleccionado");
        tarjeta.dataset.acertada = respuestaActual.correcta;
      });

      tarjeta.appendChild(boton);
    }

    contenedor.appendChild(tarjeta);
  }

    // Cambiamos el texto del botón como sale en el mockup del PDF
        let btnComprobar = document.getElementById("btn-comprobar");
  btnComprobar.textContent = "Comprobar y Finalizar";
}

}