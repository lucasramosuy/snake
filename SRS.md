# SRS · snake

## Objetivo

Un Snake pequeño y sin dependencias para lucasramos.uy/snake/, sin cuentas ni telemetría.

## Requisitos

1. Juego Snake completo: teclado (flechas o WASD), botones en pantalla y gestos táctiles. Espacio pausa/reanuda.
2. Récord local en el navegador (localStorage), sin cuentas.
3. Sitio estático de un solo HTML + CSS + JS, servible desde cualquier origen estático con rutas relativas.
4. Diseño cuidado en móvil con 390 px como ancho de prueba, gestos fluidos y controles no nativos; textos en español.

## Fuera de alcance inicial

Tabla de puntajes en línea, cuentas, niveles u obstáculos, temas visuales y sonido.

## Aceptación

Abrir `index.html` o servir la carpeta con `python3 -m http.server 8080`; jugar con teclado, botones y gestos, pausar y reanudar; verificar que el récord persiste al recargar; revisar 390 px y escritorio en la URL publicada.
