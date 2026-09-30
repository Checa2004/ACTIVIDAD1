# QUIZ CHECA

Práctica desarrollada en JavaScript, HTML5 y CSS3 para el módulo de Desarrollo Web en Entorno Cliente.

---

## Descripción del proyecto
Aplicación web que carga de forma asíncrona un banco de preguntas en formato JSON, selecciona un conjunto aleatorio para una partida estructurada en dos rondas y valida las respuestas en tiempo real mediante manipulación del DOM.

## Funcionalidades
- **Carga asíncrona:** Lectura del archivo `preguntas.json` usando `fetch` y `async/await` con control de errores (`try/catch`).
- **Aleatoriedad:** Algoritmo de barajado (Fisher-Yates) para desordenar tanto las preguntas del cuestionario como el orden de las respuestas.
- **Mecánica por rondas:**
  - **Ronda 1:** Se presentan 2 preguntas.
  - **Validación:** Comprueba si se han respondido todas y si son correctas.
  - **Ronda 2:** Si se superan sin fallos, bloquea los botones anteriores y desbloquea las 2 siguientes.
  - **Control de fin de juego:** Mensaje de victoria al completar ambas rondas o de derrota ante cualquier fallo.

## Estructura de archivos
- `index.html`: Estructura principal y contenedor del cuestionario.
- `style.css`: Estilos visuales de tarjetas, botones y selecciones.
- `app.js`: Lógica, llamadas fetch, aleatoriedad y eventos del DOM.
- `preguntas.json`: Banco de datos con preguntas y respuestas.
- `README.md`: Documentación de la práctica.

## Cómo ejecutar el proyecto
1. Clonar o descargar el repositorio:
   ```bash
   git clone [https://github.com/Checa2004/ACTIVIDAD1.git](https://github.com/Checa2004/ACTIVIDAD1.git)
