# Luces, cámara, Colombia

Sitio estático para presentar el Centro de Interés de cine colombiano. Abre `index.html` en un navegador o publícalo en cualquier alojamiento de sitios estáticos.

## Personalización

- **Películas:** edita las fichas del arreglo `films` al inicio de `script.js`. `poster` puede ser una ruta a una imagen local o una URL; para archivos locales, guárdalos junto al sitio y usa una ruta como `images/poster.jpg`. Los enlaces `blob:` de WhatsApp son temporales y no funcionan al publicar el sitio: descarga la imagen y guárdala en el proyecto para usarla como póster local.
- **Profesor:** reemplaza los textos entre corchetes de la sección “Nuestro líder”. Sustituye el espacio del retrato por una fotografía autorizada.
- **Galería:** reemplaza los espacios indicados en `index.html` por fotografías reales y autorizadas. Cada botón de imagen puede contener un `<img src="images/actividad.jpg" alt="Descripción de la foto">`; el visor se activa automáticamente.
- **Institución:** si se desea, añade el nombre de la institución en el pie de página.

## Envío del formulario a Gmail

El formulario usa [FormSubmit](https://formsubmit.co/) para enviar respuestas sin exponer claves ni contraseñas en el navegador. La dirección destinataria configurada es `lv143944@gmail.com`.

1. Publica el sitio y envía una respuesta de prueba. FormSubmit enviará un mensaje de activación a `lv143944@gmail.com`; abre el correo y confirma la activación del formulario.
2. Envía otra prueba y comprueba que la respuesta llegue a Gmail. El sitio muestra el mensaje de éxito solo si el servicio confirma el envío.

El envío requiere conexión a internet y la activación inicial del servicio. No se incluyen credenciales privadas en los archivos del sitio.
