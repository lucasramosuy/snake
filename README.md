# Snake

Un Snake pequeño y sin dependencias para [lucasramos.uy](https://lucasramos.uy/). Funciona con teclado (flechas o WASD), botones o gestos. Espacio pausa/reanuda. Récord local, sin cuentas ni telemetría.

## Probar

Abrí `index.html` en un navegador, o serví la carpeta con `python3 -m http.server 8080`.

## Publicar

Este PR solo entrega el código. Tras el merge, conectar `main` a un origen estático y agregar `/snake` al Worker del dominio. El prefijo más específico debe quedar antes de uno más amplio. Comprobar el juego en escritorio y móvil y que el resto de las rutas continúen intactas.
