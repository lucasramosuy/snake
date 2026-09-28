# Snake

Un Snake pequeño y sin dependencias para [lucasramos.uy](https://lucasramos.uy/). Funciona con teclado (flechas o WASD), botones o gestos. Espacio pausa/reanuda. Récord local, sin cuentas ni telemetría.

## Probar

Abrí `index.html` en un navegador, o serví la carpeta con `python3 -m http.server 8080`.

## Publicar

Está en vivo en https://lucasramos.uy/snake/: el Worker del dominio enruta `/snake` a un origen estático con el contenido de `main`. Los archivos usan rutas relativas, así que la misma carpeta sirve tanto local como en producción.
