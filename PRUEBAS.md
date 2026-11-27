# Checklist de pruebas — 30 HU

Abra `index.html`, seleccione el grupo de la HU y realice el paso propuesto.

| HU | Comprobación | Resultado |
|---|---|---|
| HU-01 | Abrir `#hu-01`; comprobar: He visto la alerta, Ver instrucciones. | ☐ Pendiente de verificar |
| HU-11 | Abrir `#hu-11`; comprobar: Ver cómo actuar, Detalle. | ☐ Pendiente de verificar |
| HU-12 | Abrir `#hu-12`; comprobar: Ver acción inmediata. | ☐ Pendiente de verificar |
| HU-13 | Abrir `#hu-13`; comprobar: Consultar salida segura. | ☐ Pendiente de verificar |
| HU-14 | Abrir `#hu-14`; comprobar: Ver más información. | ☐ Pendiente de verificar |
| HU-15 | Abrir `#hu-15`; comprobar: Consultar nivel de urgencia. | ☐ Pendiente de verificar |
| HU-16 | Abrir `#hu-16`; comprobar: Ver detalles de clasificación. | ☐ Pendiente de verificar |
| HU-17 | Abrir `#hu-17`; comprobar: Detalles completos. | ☐ Pendiente de verificar |
| HU-18 | Abrir `#hu-18`; comprobar: Ver indicaciones. | ☐ Pendiente de verificar |
| HU-19 | Abrir `#hu-19`; comprobar: Consultar salida segura. | ☐ Pendiente de verificar |
| HU-20 | Abrir `#hu-20`; comprobar: Ver pasos de evacuación. | ☐ Pendiente de verificar |
| HU-21 | Abrir `#hu-21`; comprobar: Paso anterior / Siguiente paso. | ☐ Pendiente de verificar |
| HU-22 | Abrir `#hu-22`; comprobar: Actualizar instrucciones. | ☐ Pendiente de verificar |
| HU-23 | Abrir `#hu-23`; comprobar: Simular bloqueo / Restablecer ruta. | ☐ Pendiente de verificar |
| HU-24 | Abrir `#hu-24`; comprobar: Consultar estado. | ☐ Pendiente de verificar |
| HU-25 | Abrir `#hu-25`; comprobar: Ir al historial. | ☐ Pendiente de verificar |
| HU-28 | Abrir `#hu-28`; comprobar: Reconozco el patrón. | ☐ Pendiente de verificar |
| HU-30 | Abrir `#hu-30`; comprobar: A+ Aumentar / A− Reducir. | ☐ Pendiente de verificar |
| HU-31 | Abrir `#hu-31`; comprobar: Activar / Desactivar alto contraste. | ☐ Pendiente de verificar |
| HU-36 | Abrir `#hu-36`; comprobar: Ver detalle. | ☐ Pendiente de verificar |
| HU-37 | Abrir `#hu-37`; comprobar: Ver otros registros. | ☐ Pendiente de verificar |
| HU-38 | Abrir `#hu-38`; comprobar: Ir al historial. | ☐ Pendiente de verificar |
| HU-41 | Abrir `#hu-41`; comprobar: Guardar tipo y continuar. | ☐ Pendiente de verificar |
| HU-42 | Abrir `#hu-42`; comprobar: Guardar zona y continuar. | ☐ Pendiente de verificar |
| HU-43 | Abrir `#hu-43`; comprobar: Guardar nivel y continuar. | ☐ Pendiente de verificar |
| HU-44 | Abrir `#hu-44`; comprobar: Guardar instrucciones y continuar. | ☐ Pendiente de verificar |
| HU-45 | Abrir `#hu-45`; comprobar: Editar mensaje / Continuar. | ☐ Pendiente de verificar |
| HU-46 | Abrir `#hu-46`; comprobar: Confirmar envío simulado. | ☐ Pendiente de verificar |
| HU-47 | Abrir `#hu-47`; comprobar: Guardar cambios. | ☐ Pendiente de verificar |
| HU-48 | Abrir `#hu-48`; comprobar: Finalizar alerta. | ☐ Pendiente de verificar |

## Botones fuera de las HU

- **HapAlert / Inicio**: retorna a la portada.
- **Ayuda (?)**: abre un cuadro con instrucciones.
- **Mi cuenta (👤)**: muestra el perfil de demostración.
- **Alertas / Orientación / Configuración / Historial / Gestión / Contactos**: acceden a su sección.
- **Cerrar** (en ventanas): cierra la ventana modal.

Nota: En HU-16 todas las alertas son simulacros; en HU-28 la vibración es representación textual, no estímulo físico.
## Navegación y Mi cuenta (pruebas añadidas)
- [ ] En `#inicio` no aparecen enlaces directos con código HU-01/HU-11/etc.
- [ ] Inicio → Alertas → Alerta visual de emergencia abre la pantalla correspondiente.
- [ ] Inicio → Gestión → Tipo de emergencia abre el primer paso de creación.
- [ ] Desde cada pantalla, Volver al módulo e Ir a Inicio funcionan.
- [ ] Mi cuenta → cambiar nombre y sede → Guardar actualiza saludo y menú lateral.
- [ ] Al recargar la página y volver a Mi cuenta, los datos se conservan.
- [ ] Correo inválido y nombre vacío impiden guardar.
- [ ] Cerrar ventana no cambia datos.

## Responsive y JavaScript

- [ ] En un ancho menor o igual a 700 px aparece el botón **Menú**.
- [ ] Al abrir el menú, `aria-expanded` cambia de `false` a `true`.
- [ ] Al seleccionar una sección móvil, el menú se cierra.
- [ ] Al presionar Escape, el menú se cierra y el foco regresa al botón.
- [ ] Al volver a escritorio, el menú lateral permanece visible.

## Comprobaciones adicionales de versión 2.0 (pendientes de ejecución en navegador)
1. Inicio: verificar accesos directos y aviso resumido, elegir cada perfil y revisar persistencia tras recarga.
2. HU-28: reproducir ambos patrones y verificar representación visual y texto.
3. HU-20: verificar plano ilustrativo y aviso de ruta bloqueada.
4. HU-36: buscar un evento y filtrar por estado; comprobar ausencia de resultados cuando corresponda.
5. Contactos: agregar y eliminar un alias ficticio; comprobar persistencia local.
6. HU-41 a HU-46: comprobar progreso, validaciones y publicación local; revisar HU-47 y HU-48.
7. Revisar inicio y navegación en escritorio y móvil, teclado, contraste y texto grande.

## Pruebas adicionales 2.3 (pendientes de ejecución en dispositivo)
- Abrir HU-01 a HU-50 desde sus módulos y comprobar controles.
- Iniciar simulacro, detener vibración, reactivarla, confirmar lectura; verificar que detener no cierre el aviso.
- Probar patrones en Android compatible y en navegador sin API; comprobar alternativa visual y reducción de movimiento.
- Comprobar plano principal/alternativo y avance de posición simulada.
- Comprobar duración, señal visual, diagnóstico, sectores, consentimiento y contactos locales.
- Comprobar menú inferior, contraste, modo oscuro, entrenamiento y caché offline después de primera visita HTTPS.
- No registrar cumplimiento real de HU dependientes de hardware, permisos del SO, servidor o dispositivos externos.

## Regresión 2.4 (pendiente de ejecución en dispositivos)
- Abrir las 50 rutas HU y las cuatro rutas nuevas.
- Iniciar cada escenario, verificar tipo, instrucciones, detener vibración sin cerrar alerta, confirmar lectura.
- Cambiar ruta bloqueada, avanzar plano y confirmar llegada; verificar que la alerta no finaliza.
- Completar cinco ejercicios hápticos y comprobar retroalimentación.
- Cambiar preferencias, recargar, comprobar persistencia, teclado y movimiento reducido.
- Probar historial, sectores, contactos, vista móvil, Android compatible y caché sin conexión.
