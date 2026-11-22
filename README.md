# HapAlert — Demostración funcional de 30 historias de usuario

## Cómo ejecutar
1. Abrir la carpeta en Visual Studio Code.
2. Abrir `index.html` en Chrome, Edge o Firefox, o usar Live Server.
3. En Inicio, elegir un módulo (Alertas, Orientación, Configuración, Historial o Gestión), o entrar por el menú lateral.
4. Elegir una función por su nombre dentro del módulo. Las 30 tienen una pantalla interna (`#hu-XX`) pero sus códigos no aparecen como botones de la portada.
5. La demostración guarda las acciones en `localStorage` del navegador. No requiere servidor ni conexión.

## Lo que puede probar
- **HU-01**: marcar como leída la alerta y consultar instrucciones.
- **HU-11–18**: consultar tipo, gravedad, zona, mensaje, icono, simulacro, emisor y detalle.
- **HU-19–25**: navegar por pasos de evacuación, actualizar mensaje, simular bloqueo, ver fin y estados.
- **HU-28, 30, 31**: reconocer patrón textual, cambiar tamaño del texto y activar contraste.
- **HU-36–38**: abrir historial, seleccionar registros y comprobar fecha y hora.
- **HU-41–48**: llenar los pasos de creación, previsualizar, confirmar envío SIMULADO, modificar y finalizar.
- **Ayuda**: explica las rutas. **Mi cuenta**: permite cambiar nombre, apellido, correo, teléfono y centro; guarda cambios localmente en el navegador.
- **Menú lateral**: abre todos los grupos y vuelve a Inicio. En pantallas móviles se controla con el botón **Menú**, actualiza `aria-expanded` y puede cerrarse con la tecla Escape.

## Escenario de prueba completo
1. Entre a `Gestión > HU-41` y seleccione un tipo de emergencia.
2. Complete HU-42, HU-43 y HU-44 con zona, urgencia e instrucción.
3. Revise HU-45 y confirme desde HU-46.
4. La nueva alerta aparecerá en HU-01. Pulse **He visto la alerta**.
5. Consulte HU-11 a HU-25, después pruebe HU-47 (edite mensaje) y HU-23 (bloquee ruta).
6. Finalice la alerta desde HU-48 y compruebe su estado en HU-24, HU-25 e Historial HU-36–38.
7. Pruebe HU-30 y HU-31 en Configuración.

## Alcance y advertencias
- **Todas las 30 HU cuentan con una vista accesible desde Inicio.** Los controles de la demostración están conectados; algunas HU son consultas visuales y otras modifican datos.
- Los datos y los avisos son **simulados**. No envía SMS, alertas reales ni vibra físicamente.
- El panel de gestión **no tiene autenticación real**.
- Se trata de un prototipo funcional del capítulo 5.1 y 5.3, no una certificación de que cumpla todos los criterios de aceptación de las HU originales.
- Estructura visual inspirada en los mockups Figma: cabecera clara, lateral azul oscuro, tarjetas y mensajes; el diseño pixel a pixel se podrá ajustar después.

## Archivos
- `index.html`: estructura principal única (landing page).
- `style.css`: estructura visual base.
- `diseno.css`: apariencia, adaptación responsive y estados visuales de accesibilidad.
- `app.js`: navegación, DOM, eventos, formularios, validaciones, menú móvil, estados y almacenamiento local.
- `PRUEBAS.md`: checklist de las 30 HU.

## Ruta de navegación
**Inicio → Módulo → Función → Pantalla.** El usuario no ve una lista de botones HU-01, HU-11, etc. en la portada. Selecciona primero Alertas, Orientación, Configuración, Historial o Gestión. Dentro del módulo ve opciones con nombres descriptivos.

## Mi cuenta
1. Pulsar **Mi cuenta** (esquina superior derecha).
2. Editar nombre (obligatorio), apellido, correo (validado), teléfono y centro.
3. Pulsar **Guardar mis datos**. Se muestra una confirmación y se actualiza el saludo en Inicio.
4. Abrir **Mi cuenta** nuevamente para comprobar que los cambios siguen allí.
5. Los datos persisten en `localStorage` del mismo navegador; no hay autenticación ni sincronización remota.


## Recorrido guiado (versión de navegación contextual)
La portada no incluye accesos por código HU. Entra en **Inicio → Alertas → Consultar alerta visual**. En el aviso puedes pulsar **He visto la alerta** para registrar la lectura y continuar a **Identificación del tipo de emergencia**, o pulsar **Ver instrucciones** si necesitas una indicación inmediata. Luego, **Consultar nivel de urgencia** permite pasar a ubicación, mensaje, detalles y orientación. Las 30 HU siguen identificadas internamente, pero el usuario navega por acciones y necesidades.

Esta versión incluye aviso evidente de **SIMULACRO**; no debe utilizarse para emergencias reales. Se mejoró la navegación por teclado y el foco después de cada cambio de pantalla.

## Nueva apariencia visual (versión mejorada)
El diseño renovado se encuentra en `diseno.css`, que se carga después de `style.css`. Se actualizaron las 30 vistas sin cambiar la programación de `app.js` ni los enlaces existentes. Para editar los colores y tarjetas, comience en `diseno.css`.

Los avisos son únicamente simulaciones académicas; no enviar información sensible ni usarlo como servicio real de emergencias.


## Multimedia añadida

Inicio incluye imágenes locales, video MP4 explicativo accesible con controles y transcripción, y recursos externos educativos. Consulte `RECURSOS_MULTIMEDIA.md`. La reproducción del MP4 es local; los enlaces oficiales requieren internet.

## JavaScript implementado

El proyecto usa JavaScript en `app.js`; no requiere Java. La programación implementa las 30 rutas internas, navegación mediante hash, gestión de eventos, validación de formularios, persistencia con `localStorage`, actualización de alertas, cambio de tamaño de texto, alto contraste, mensajes `aria-live` y menú móvil accesible. El botón móvil controla `#menu-principal` con `aria-controls` y `aria-expanded`, se cierra al seleccionar una sección y responde a Escape.
