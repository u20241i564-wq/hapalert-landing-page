# Cómo recorrer las 30 historias de usuario de HapAlert

## Ruta principal de alertas
Inicio → Alertas → Consultar alerta visual (HU-01) → Identificar emergencia (HU-11) → Consultar nivel de urgencia (HU-12) → Ver zona afectada (HU-13) → Leer mensaje principal (HU-14) → Comprender señal (HU-15) → Comprobar tipo de aviso (HU-16) → Ver origen (HU-17) → Abrir detalles (HU-18).

**Atajo útil de seguridad:** Desde HU-01, **Ver instrucciones** conduce a HU-19 sin obligar a recorrer todas las pantallas.

## Orientación
Inicio → Orientación → Acción inmediata (HU-19) → Salida segura (HU-20) → Pasos de evacuación (HU-21) → Actualizaciones (HU-22) → Ruta bloqueada (HU-23) → Estado (HU-25) → Aviso final (HU-24). Desde ahí se puede consultar historial.

## Accesibilidad
Inicio → Configuración → Significado de señales (HU-28) → Tamaño de texto (HU-30) → Alto contraste (HU-31).

## Historial
Inicio → Historial → Registros (HU-36) → botón **Ver detalle** del registro (HU-37) → Fecha y hora (HU-38). Se puede ir a fechas desde Historial.

## Gestión del simulacro
Inicio → Gestión → Tipo (HU-41) → Zona (HU-42) → Nivel (HU-43) → Instrucciones (HU-44) → Previsualización (HU-45) → Confirmación (HU-46). Luego Gestión → Actualizar (HU-47) o Finalizar (HU-48).

## Consideraciones
* El cambio entre pantallas usa enlaces con `#` y JavaScript para actualizar el área principal.
* Los botones actualizan estados, muestran mensajes o conducen a acciones contextualizadas.
* No existe backend ni avisos reales; el estado de la simulación se guarda en `localStorage`.
* En un caso real el sistema debería separar aún más lo urgente del contenido complementario.
