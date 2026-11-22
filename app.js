document.documentElement.classList.add('js');

// HapAlert - Proyecto académico de demostración.
// JavaScript sencillo: variables, funciones, eventos y cambios en el HTML.

const grupos = [
  { id:'alertas', nombre:'Alertas', descripcion:'Recepción y comprensión de avisos', hu:['01','11','12','13','14','15','16','17','18'] },
  { id:'orientacion', nombre:'Orientación', descripcion:'Pasos e instrucciones de evacuación', hu:['19','20','21','22','23','24','25'] },
  { id:'configuracion', nombre:'Accesibilidad', descripcion:'Opciones para entender mejor las señales', hu:['28','30','31'] },
  { id:'historial', nombre:'Historial', descripcion:'Consulta de eventos registrados', hu:['36','37','38'] },
  { id:'gestion', nombre:'Gestión', descripcion:'Crear, enviar y modificar alertas de prueba', hu:['41','42','43','44','45','46','47','48'] }
];
const nombres = {
 '01':'Alerta visual de emergencia','11':'Identificación del tipo de emergencia','12':'Nivel de urgencia',
 '13':'Zona afectada','14':'Mensaje breve y directo','15':'Texto e iconografía accesible',
 '16':'Emergencia real vs. simulacro','17':'Fuente de la alerta','18':'Detalle ampliado',
 '19':'Acción inmediata','20':'Salida o zona segura','21':'Pasos de evacuación',
 '22':'Actualización de instrucciones','23':'Ruta no disponible','24':'Fin de la emergencia',
 '25':'Estado de la alerta','28':'Significado de patrones hápticos','30':'Tamaño de texto',
 '31':'Alto contraste','36':'Historial de alertas','37':'Detalle de alerta pasada',
 '38':'Fecha y hora del evento','41':'Tipo de emergencia','42':'Zona de afectación',
 '43':'Nivel de criticidad','44':'Instrucción de evacuación','45':'Previsualización de alerta',
 '46':'Confirmación de envío','47':'Actualización de emergencia activa','48':'Finalización de alerta'
};
const inicial = {
 avisos:[
  {id:1,tipo:'Incendio',zona:'Edificio B, planta baja',nivel:'Crítica',mensaje:'Evacúe el edificio B. Diríjase al patio norte por la salida lateral.',emisor:'Protección Civil',fecha:'2026-11-05T10:32:00',estado:'Activa',clase:'Simulacro',leida:false,rutaBloqueada:false},
  {id:2,tipo:'Sismo',zona:'Biblioteca',nivel:'Alta',mensaje:'Ubíquese en zona segura y siga al personal autorizado.',emisor:'Brigada',fecha:'2026-11-03T09:15:00',estado:'Finalizada',clase:'Simulacro',leida:true,rutaBloqueada:false}
 ],
 borrador:{tipo:'Incendio',zona:'Edificio B, planta baja',nivel:'Crítica',mensaje:'Evacúe el edificio B. Diríjase al patio norte por la salida lateral.',emisor:'Protección Civil',clase:'Simulacro'},
 textoGrande:false, contraste:false, paso:0, seleccionado:2, notificacionLeida:false,
 perfil:{nombre:'Visitante',apellido:'',correo:'',telefono:'',centro:'Campus Central'}
};
function cargar(){ try {let x=JSON.parse(localStorage.getItem('hapalert_demo_v2'));return x&&Array.isArray(x.avisos)&&x.borrador?{...structuredClone(inicial),...x}:structuredClone(inicial);}catch(e){return structuredClone(inicial);} }
let datos=cargar();
if(!datos.perfil || typeof datos.perfil!=='object') datos.perfil=structuredClone(inicial.perfil);
function guardar(){try{localStorage.setItem('hapalert_demo_v2',JSON.stringify(datos));}catch(e){mensaje('No se pudo guardar en este navegador.');}}
function limpiarTexto(x){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function actual(){return datos.avisos.find(x=>x.estado==='Activa')||datos.avisos[0];}
function fecha(x){return new Date(x).toLocaleString('es-PE',{dateStyle:'medium',timeStyle:'short'});}
function boton(t,accion,extra=''){return `<button type="button" class="boton ${extra}" data-action="${accion}">${t}</button>`;}
function enlace(t,href,extra=''){return `<a class="boton ${extra}" href="#${href}">${t}</a>`;}
function tarjeta(t,c){return `<section class="tarjeta"><h2>${t}</h2>${c}</section>`;}
function campo(t,id,val,tipo='text'){return `<div class="campo"><label for="${id}">${t}</label><input id="${id}" type="${tipo}" value="${limpiarTexto(val)}"></div>`;}
function seleccion(t,id,op,actualValor){return `<div class="campo"><label for="${id}">${t}</label><select id="${id}">${op.map(v=>`<option value="${limpiarTexto(v)}" ${v===actualValor?'selected':''}>${limpiarTexto(v)}</option>`).join('')}</select></div>`;}
function encabezado(t,d,c){c=(c||'HapAlert · Demostración funcional').replace(/\s*\/\s*\d{2}$/, '');return `<p class="eyebrow">${c}</p><h1>${t}</h1><p class="descripcion">${d}</p>`;}
function pie(){return `<div class="pie">Información en texto · No es necesario escuchar una señal sonora. <strong>Todos los datos son simulados.</strong></div>`;}
function grupoPorId(id){return grupos.find(g=>g.id===id);}
function grupoPorHu(id){return grupos.find(g=>g.hu.includes(id));}
// La navegación se organiza por situaciones reales, no por códigos de HU.
function bloqueRuta(titulo,descripcion,destino,etiqueta){
 return `<section class="ruta-siguiente" aria-label="Siguiente acción"><h2>${titulo}</h2><p>${descripcion}</p>${enlace(etiqueta,destino)}</section>`;
}
const caminos = {
 '01':['11','¿Qué está ocurriendo?','Identifique el tipo de emergencia antes de decidir qué hacer.','Identificar emergencia'],
 '11':['12','¿Qué tan urgente es?','Revise la gravedad del aviso para reconocer la prioridad.','Consultar nivel de urgencia'],
 '12':['13','¿Dónde ocurrió?','Conozca la zona afectada para evitar el riesgo.','Ver zona afectada'],
 '13':['14','¿Cuál es la indicación principal?','Lea el mensaje resumido del aviso.','Leer mensaje principal'],
 '14':['15','¿Qué significa esta señal?','Consulte el texto y símbolo de la alerta.','Comprender la señal'],
 '15':['16','¿Es un simulacro?','Compruebe la clasificación del aviso.','Comprobar tipo de aviso'],
 '16':['17','¿Quién envió el aviso?','Consulte la fuente de la información.','Ver origen del aviso'],
 '17':['18','¿Necesita más información?','Revise los detalles completos del evento.','Abrir detalles de emergencia'],
 '18':['19','¿Qué hago ahora?','Consulte la acción inmediata recomendada.','Ver acción inmediata'],
 '19':['20','¿A dónde debo dirigirme?','Consulte la salida o zona segura indicada.','Consultar salida segura'],
 '20':['21','Siga las instrucciones','Revise los pasos de evacuación de forma ordenada.','Ver pasos de evacuación'],
 '21':['22','Consulte los avisos recientes','Revise si las instrucciones cambiaron.','Consultar actualizaciones'],
 '22':['23','Revise la ruta disponible','Compruebe si existe algún bloqueo simulado.','Comprobar ruta'],
 '23':['25','Compruebe el estado del aviso','Verifique si el evento continúa activo o finalizó.','Consultar estado de emergencia'],
 '25':['24','¿Ya terminó la emergencia?','Consulte el aviso de finalización.','Ver aviso de cierre'],
 '24':['36','Consulte eventos anteriores','El historial permite revisar los avisos registrados.','Abrir historial'],
 '28':['30','Haga el texto más legible','Ajuste el tamaño de las instrucciones.','Ajustar tamaño del texto'],
 '30':['31','Mejore el contraste','Active colores más contrastados si lo necesita.','Configurar contraste'],
 '31':['28','Revise las señales','Conozca las diferencias entre las notificaciones.','Consultar señales'],
 '37':['38','¿Cuándo ocurrió?','Consulte fechas y horas de las alertas.','Ver fecha y hora'],
 '38':['36','Volver a los registros','Consulte otras alertas del historial.','Ver historial de alertas']
};
function rutaContextual(id){
 const item=caminos[id];
 return item?bloqueRuta(item[1],item[2],'hu-'+item[0],item[3]):'';
}
function mensaje(t){let e=document.getElementById('aviso');e.textContent=t;e.hidden=false; clearTimeout(window.relojAviso);window.relojAviso=setTimeout(()=>e.hidden=true,4000);}
function dialogo(t,c){document.getElementById('dialogo-contenido').innerHTML=`<h2>${t}</h2>${c}`;document.getElementById('dialogo').showModal();}
// Contenido educativo añadido para la portada; no reemplaza las 30 HU.
function recursosEducativos(){
 return `<section class="medios-recursos" aria-labelledby="recursos-titulo">
  <div class="media-head"><span class="media-kicker">APRENDE Y PREPÁRATE</span><h2 id="recursos-titulo">Información de fuentes confiables</h2><p>Material de referencia para conocer emergencias y comunicación accesible. Abre los enlaces en una nueva pestaña.</p></div>
  <div class="recursos-grid">
   <article class="recurso"><span class="recurso-tag">INDECI · Perú</span><h3>Videos para prepararse</h3><p>Serie educativa sobre sismos, incendios y otros peligros; incluye material en Lengua de Señas Peruana.</p><a href="https://www.gob.pe/institucion/indeci/campa%C3%B1as/113786-preparados" target="_blank" rel="noopener noreferrer">Ver videos de INDECI ↗</a></article>
   <article class="recurso"><span class="recurso-tag">ReadyHarris · EE. UU.</span><h3>Videos de evacuación accesibles</h3><p>Biblioteca de prevención con lengua de señas estadounidense y subtítulos en inglés y español.</p><a href="https://www.readyharris.org/Accessible-Videos" target="_blank" rel="noopener noreferrer">Ver biblioteca accesible ↗</a></article>
   <article class="recurso"><span class="recurso-tag">OMS · Salud</span><h3>Sordera y pérdida de audición</h3><p>Información sobre las barreras auditivas y la importancia de los dispositivos y servicios accesibles.</p><a href="https://www.who.int/es/news-room/fact-sheets/detail/deafness-and-hearing-loss" target="_blank" rel="noopener noreferrer">Leer información de la OMS ↗</a></article>
   <article class="recurso"><span class="recurso-tag">W3C · Accesibilidad</span><h3>Buenas prácticas para la web</h3><p>Recomendaciones para crear interfaces perceptibles, utilizables y comprensibles.</p><a href="https://www.w3.org/WAI/standards-guidelines/wcag/es" target="_blank" rel="noopener noreferrer">Consultar WCAG ↗</a></article>
  </div>
 </section>`;
}
function mediosInicio(){return `<section class="hero-media" aria-label="Presentación de HapAlert">
 <div><span class="media-kicker">TECNOLOGÍA ACCESIBLE</span><h2>Alertas que puedes ver y comprender</h2><p>HapAlert busca informar de manera clara ante situaciones de peligro. Una alerta visual muestra lo importante sin depender exclusivamente del sonido.</p><a class="boton" href="#alertas">Consultar alertas</a></div>
 <img src="assets/hero-alertas.svg" width="720" height="480" alt="Ilustración de un teléfono mostrando una alerta de emergencia visual" loading="eager">
 </section>
 <section class="video-seccion" aria-labelledby="video-titulo">
  <div><span class="media-kicker">VIDEO EXPLICATIVO</span><h2 id="video-titulo">Conoce HapAlert en menos de un minuto</h2><p>Una presentación visual de cómo identificar una alerta, conocer su urgencia y consultar instrucciones. El video tiene textos en pantalla y no requiere audio.</p><p class="nota">Este video es una ilustración académica, no una grabación de alertas reales.</p><details class="transcripcion"><summary>Leer transcripción del video</summary><ol><li>HapAlert: alertas accesibles para personas sordas y con hipoacusia.</li><li>Una alerta visible indica qué ocurre y dónde.</li><li>El usuario identifica el tipo de emergencia y el nivel de urgencia.</li><li>Consulta la acción inmediata y una salida recomendada.</li><li>La plataforma ofrece información legible y opciones de accesibilidad.</li><li>Demostración académica; no envía alertas reales.</li></ol></details></div>
  <div class="video-contenedor"><video controls preload="metadata" playsinline poster="assets/video-portada.jpg" width="1280" height="720" aria-label="Video explicativo visual de HapAlert"><source src="assets/hapalert-presentacion.mp4" type="video/mp4">Su navegador no permite reproducir este video.</video><p class="video-pie">Video incluido en el proyecto · Reproducción local, sin conexión a internet</p></div>
 </section>
 <section class="media-informativa" aria-labelledby="material-titulo"><h2 id="material-titulo">Reconoce el peligro y sigue la ruta segura</h2><div class="media-dos"><article class="media-tarjeta"><img src="assets/emergencias.svg" alt="Tres pictogramas de demostración: incendio, sismo y fuga de gas" width="720" height="250" loading="lazy"><h3>Identifica el tipo de emergencia</h3><p>El texto y los símbolos ayudan a distinguir la clase de aviso.</p><a href="#hu-11">Comprender el tipo de emergencia</a></article><article class="media-tarjeta"><img src="assets/evacuacion.svg" alt="Plano ilustrativo de evacuación con una ruta verde hacia la zona segura; no corresponde a un edificio real" width="720" height="460" loading="lazy"><h3>Ubica una salida de demostración</h3><p>Consulta las indicaciones antes de actuar. El plano es solo ilustrativo.</p><a href="#hu-20">Ver salidas recomendadas</a></article></div></section>`;}
function vistaInicio(){return encabezado('Bienvenido'+(datos.perfil.nombre&&datos.perfil.nombre!=='Visitante'?', '+limpiarTexto(datos.perfil.nombre):'')+' a HapAlert','Sistema académico de alertas accesibles. Seleccione el módulo que necesita para comenzar.')+
 mediosInicio()+`<div class="aviso"><h2>¿Qué desea hacer?</h2><p>Puede revisar una alerta, consultar instrucciones, cambiar las opciones de accesibilidad o administrar una emergencia de prueba. Seleccione primero una sección del sistema.</p></div>`+
 `<div class="grupos">${grupos.map(g=>tarjeta(g.nombre,`<p>${g.descripcion}</p>${enlace('Abrir '+g.nombre,g.id)}`)).join('')}</div>`+
 recursosEducativos()+
 tarjeta('Acerca de este simulador','<p>Los avisos son únicamente demostrativos. Para recorrer las pantallas siga <strong>Inicio → Sección → Funcionalidad</strong>. Las opciones personales se editan desde <strong>Mi cuenta</strong>, en la parte superior.</p>'+boton('Reiniciar datos de la demostración','reiniciar','secundario'))+pie();}
function vistaGrupo(g){
 let a=actual();
 const pantallas={
  alertas:['Alerta recibida','Consulte el aviso, identifique el tipo y la gravedad, y siga las instrucciones.','hu-01','Consultar alerta visual'],
  orientacion:['Qué hacer durante la emergencia','Consulte primero la acción inmediata y luego las salidas y pasos de evacuación.','hu-19','Consultar instrucciones'],
  configuracion:['Ajustes para una mejor lectura','Revise el significado de las señales y continúe hacia tamaño de texto y contraste.','hu-28','Ver señales accesibles'],
  historial:['Consultar avisos anteriores','Revise los registros y seleccione uno para consultar su información.','hu-36','Abrir historial de alertas'],
  gestion:['Preparar una alerta de prueba','Seleccione el tipo de emergencia, luego la zona, la urgencia y las instrucciones.','hu-41','Crear simulacro']
 };
 let q=pantallas[g.id];
 let extra=g.id==='alertas'?`<div class="aviso ${a.estado==='Activa'?'rojo':'naranja'}"><h2>${a.estado==='Activa'?'Aviso de simulacro en curso':'Último aviso de simulacro'}</h2><p><strong>${limpiarTexto(a.tipo)}</strong> en ${limpiarTexto(a.zona)}. ${limpiarTexto(a.nivel)}.</p><p>${limpiarTexto(a.mensaje)}</p></div>`:'';
 if(g.id==='gestion') extra+=tarjeta('Seguimiento del simulacro',`<p>Después de crear un aviso, puede actualizar las instrucciones o finalizarlo.</p><div class="botones">${enlace('Actualizar aviso activo','hu-47','secundario')}${enlace('Finalizar aviso activo','hu-48','secundario')}</div>`);
 if(g.id==='historial') extra+=tarjeta('Fechas de los registros',`<p>También puede consultar cuándo se registró cada evento.</p>${enlace('Consultar fechas y horas','hu-38','secundario')}`);
 return encabezado(g.nombre,g.descripcion,'Inicio / '+g.nombre)+extra+
 tarjeta(q[0],`<p>${q[1]}</p>${enlace(q[3],q[2])}`)+
 `<p class="nota">Siga los pasos de cada pantalla. Los botones le orientan según la información que necesita, sin mostrar códigos de historias de usuario.</p>`+
 `<div class="botones">${enlace('Volver a Inicio','inicio','secundario')}</div>`+pie();
}
function resumenAviso(a){return `<strong>${limpiarTexto(a.tipo)}</strong> · <span class="etiqueta ${a.nivel==='Crítica'?'critica':''}">${limpiarTexto(a.nivel)}</span><p>${limpiarTexto(a.mensaje)}</p><p>Zona: ${limpiarTexto(a.zona)} · Estado: ${limpiarTexto(a.estado)}</p>`;}
function vistaHU(id){let a=actual(), d=datos.borrador, html='', nuevo=datos.avisos[0], g=grupoPorHu(id);
 switch(id){
 case '01':
 html=encabezado('Alerta visual de emergencia','Aviso visible recibido en su espacio web.','Alertas / Aviso recibido')+
 `<div class="aviso rojo"><p class="sello-simulacro">SIMULACIÓN ACADÉMICA · NO ES UNA ALERTA REAL</p><h2>¡EMERGENCIA! ${limpiarTexto(a.tipo)} detectado</h2><p>${limpiarTexto(a.mensaje)}</p></div>`+
 tarjeta('Alerta activa · Lectura prioritaria',`<p>Zona afectada: ${limpiarTexto(a.zona)}.</p><p>Recibida: ${fecha(a.fecha)} · Emitida por ${limpiarTexto(a.emisor)}.</p><div class="botones">${boton(a.leida?'Lectura confirmada':'He visto la alerta','confirmar-lectura')}${enlace('Ver instrucciones','hu-19','secundario')}</div><div class="barras"><div class="barra"></div><div class="barra"></div><div class="barra"></div></div>`)+
 `<p class="nota">${a.leida?'Lectura confirmada. Consulte el tipo de emergencia y el nivel de urgencia.':'El aviso permanece visible hasta que confirme su lectura.'}</p>`;break;
 case '11': html=encabezado('Identificación del tipo de emergencia','Identifique qué ocurre antes de consultar las indicaciones.','Alertas / Tipo de emergencia')+`<div class="aviso rojo"><p class="sello-simulacro">SIMULACRO</p><h2>△ ${limpiarTexto(a.tipo.toUpperCase())}</h2><p>Se ha detectado un evento: ${limpiarTexto(a.tipo)} en ${limpiarTexto(a.zona)}.</p></div>`+tarjeta('Tipo de emergencia confirmado',`<p><strong>${limpiarTexto(a.tipo)}</strong> · ${a.tipo==='Incendio'?'Riesgo por fuego y humo':'Evento que requiere atención'}</p><p>Zona: ${limpiarTexto(a.zona)}.</p><p>${limpiarTexto(a.mensaje)}</p><div class="botones">${enlace('Ver cómo actuar','hu-19')}${enlace('Detalle de la emergencia','hu-18','secundario')}</div>`);break;
 case '12': html=encabezado('Nivel de urgencia','La urgencia se comunica con palabras, no solo con una señal visual.','Alertas / Nivel de urgencia')+`<div class="aviso rojo"><p class="sello-simulacro">SIMULACRO</p><h2>${limpiarTexto(a.nivel.toUpperCase())} · ${a.nivel==='Crítica'?'Actúe de inmediato':'Siga las indicaciones'}</h2><p>${limpiarTexto(a.mensaje)}</p></div>`+tarjeta('Escala de urgencia',`<p><span class="etiqueta critica">Crítica — Evacúe ahora</span> Riesgo inmediato para la seguridad.</p><p><span class="etiqueta">Alta — Prepárese para actuar</span> Siga las instrucciones de la autoridad.</p><p><span class="etiqueta">Informativa — Manténgase informado</span> No requiere una acción inmediata.</p>${enlace('Ver acción inmediata','hu-19')}`);break;
 case '13': html=encabezado('Zona afectada','Localice el lugar al que corresponde la alerta.','Alertas / 13')+tarjeta('Ubicación del evento',`<p><strong>Zona afectada:</strong> ${limpiarTexto(a.zona)}</p><p><strong>Tipo:</strong> ${limpiarTexto(a.tipo)}</p><p>Ubicación de demostración; no se está consultando un mapa real.</p>${enlace('Consultar salida segura','hu-20')}`);break;
 case '14': html=encabezado('Mensaje breve y directo','Una instrucción principal fácil de reconocer.','Alertas / 14')+`<div class="aviso rojo"><h2>AVISO IMPORTANTE</h2><p>${limpiarTexto(a.mensaje)}</p></div>`+enlace('Ver más información','hu-18');break;
 case '15': html=encabezado('Texto e iconografía accesible','El mensaje combina una señal visual con texto legible.','Alertas / 15')+tarjeta('△ '+limpiarTexto(a.tipo),`<p><strong>Emergencia:</strong> ${limpiarTexto(a.tipo)}.</p><p><strong>Significado:</strong> ${limpiarTexto(a.mensaje)}</p>${enlace('Consultar nivel de urgencia','hu-12')}`);break;
 case '16': html=encabezado('Emergencia real vs. simulacro','El sistema diferencia los avisos de demostración.','Alertas / 16')+`<div class="aviso naranja"><h2>SIMULACRO · NO ES UNA EMERGENCIA REAL</h2><p>Evento académico ${limpiarTexto(a.tipo)} · ${limpiarTexto(a.zona)}</p></div>`+tarjeta('Clasificación de avisos',`<p><strong>Estado mostrado:</strong> ${limpiarTexto(a.clase)}</p><p>Esta aplicación solo publica simulacros dentro del navegador.</p>${enlace('Consultar fuente','hu-17')}`);break;
 case '17': html=encabezado('Fuente de la alerta','Identifique al responsable indicado en el aviso.','Alertas / 17')+tarjeta('Datos del emisor',`<p><strong>Emisor:</strong> ${limpiarTexto(a.emisor)}</p><p><strong>Fecha:</strong> ${fecha(a.fecha)}</p><p><strong>Clase:</strong> ${limpiarTexto(a.clase)}</p>${enlace('Detalles completos','hu-18')}`);break;
 case '18': html=encabezado('Detalle ampliado','Consulte todos los campos de la alerta seleccionada.','Alertas / 18')+tarjeta('Información completa',`${resumenAviso(a)}<p><strong>Fuente:</strong> ${limpiarTexto(a.emisor)}</p><p><strong>Fecha y hora:</strong> ${fecha(a.fecha)}</p><p><strong>Tipo de aviso:</strong> ${limpiarTexto(a.clase)}</p><div class="botones">${enlace('Ver indicaciones','hu-19')}${enlace('Volver a alertas','alertas','secundario')}</div>`);break;
 case '19': html=encabezado('Acción inmediata','Actúe siguiendo el aviso de demostración.','Orientación / 19')+`<div class="aviso rojo"><h2>Acción recomendada</h2><p>${limpiarTexto(a.mensaje)}</p></div>`+enlace('Consultar salida segura','hu-20');break;
 case '20': html=encabezado('Salida o zona segura','Orientación para la evacuación simulada.','Orientación / 20')+tarjeta('Ruta recomendada',`<p><strong>Salida lateral → Patio norte</strong></p><p>Zona actual: ${limpiarTexto(a.zona)}</p><p>${a.rutaBloqueada?'La ruta habitual está bloqueada. Utilice la salida alternativa señalizada.':'Diríjase a la zona segura según la señalización.'}</p>${enlace('Ver pasos de evacuación','hu-21')}`);break;
 case '21': {let pasos=['Mantenga la calma y observe las señales visuales.','Evite usar ascensores y aléjese de la zona de riesgo.','Diríjase a la salida indicada y siga al personal autorizado.','Reúnase en el punto seguro y espere nuevas indicaciones.'];html=encabezado('Pasos de evacuación','Recorra cada instrucción con los controles.','Orientación / 21')+tarjeta(`Paso ${datos.paso+1} de 4`,`<p>${pasos[datos.paso]}</p><div class="botones">${boton('Paso anterior','paso-anterior','secundario')}${boton('Siguiente paso','paso-siguiente')}</div>`);break;}
 case '22': html=encabezado('Actualización de instrucciones','Consulta el mensaje vigente del evento.','Orientación / 22')+tarjeta('Instrucción actual',`<p>${limpiarTexto(a.mensaje)}</p><p class="nota">Los cambios realizados en HU-47 se reflejan aquí.</p><div class="botones">${boton('Actualizar instrucciones','actualizar-vista')}${enlace('Ir a gestión','hu-47','secundario')}</div>`);break;
 case '23': html=encabezado('Ruta no disponible','Revise si existe un bloqueo en la ruta simulada.','Orientación / 23')+`<div class="aviso ${a.rutaBloqueada?'rojo':''}"><h2>${a.rutaBloqueada?'Ruta habitual bloqueada':'Ruta habitual disponible'}</h2><p>${a.rutaBloqueada?'Use la ruta alternativa hacia el patio norte.':'La salida lateral se encuentra disponible en esta simulación.'}</p></div>`+tarjeta('Opciones de demostración',`<p>Pruebe los cambios de disponibilidad de la ruta.</p><div class="botones">${boton(a.rutaBloqueada?'Restablecer ruta':'Simular bloqueo','alternar-ruta')}${enlace('Consultar salida','hu-20','secundario')}</div>`);break;
 case '24': html=encabezado('Fin de la emergencia','Consulte el aviso de cierre.','Orientación / 24')+`<div class="aviso ${a.estado==='Finalizada'?'verde':'naranja'}"><h2>${a.estado==='Finalizada'?'Emergencia finalizada':'Emergencia todavía activa'}</h2><p>${a.estado==='Finalizada'?'La alerta seleccionada concluyó.':'Solo Gestión puede cerrar la alerta de demostración.'}</p></div>`+enlace('Consultar estado','hu-25');break;
 case '25': html=encabezado('Estado de la alerta','Identifique las alertas activas y finalizadas.','Orientación / 25')+tarjeta('Alertas registradas',`<table class="tabla"><thead><tr><th>Evento</th><th>Estado</th></tr></thead><tbody>${datos.avisos.map(x=>`<tr><td>${limpiarTexto(x.tipo)} - ${limpiarTexto(x.zona)}</td><td>${limpiarTexto(x.estado)}</td></tr>`).join('')}</tbody></table>${enlace('Ir al historial','hu-36')}`);break;
 case '28': html=encabezado('Significado de patrones hápticos','Aprenda a reconocer las señales propuestas.','Accesibilidad / 28')+tarjeta('Comparación de señales',`<div class="aviso"><h2 class="señal">━ ━ ━ &nbsp; ━ ━ ━</h2><p><strong>Emergencia:</strong> tres pulsos largos, pausa y repetición.</p></div><p><strong>Notificación habitual:</strong> ─ (un pulso breve).</p><p>Representación textual. Esta pantalla no genera vibración física.</p><div class="botones">${boton('Reconozco el patrón','reconocer-patron')}${enlace('Ver alerta','hu-01','secundario')}</div>`);break;
 case '30': html=encabezado('Tamaño de texto','Adapte el tamaño del contenido para mejorar su lectura.','Accesibilidad / 30')+tarjeta('Opciones de lectura',`<p>Estado: ${datos.textoGrande?'Texto grande':'Texto normal'}</p><div class="botones">${boton('A+ Aumentar','texto-grande')}${boton('A− Reducir','texto-normal','secundario')}</div>`);break;
 case '31': html=encabezado('Alto contraste','Active una apariencia de mayor contraste.','Accesibilidad / 31')+tarjeta('Contraste visual',`<p>Estado: ${datos.contraste?'Alto contraste activado':'Modo normal'}</p>${boton(datos.contraste?'Desactivar alto contraste':'Activar alto contraste','alternar-contraste')}`);break;
 case '36': html=encabezado('Historial de alertas','Revise los avisos creados en esta demostración.','Historial / 36')+tarjeta('Registros disponibles',`<table class="tabla"><thead><tr><th>Tipo</th><th>Fecha</th><th>Estado</th><th>Acción</th></tr></thead><tbody>${datos.avisos.map(x=>`<tr><td>${limpiarTexto(x.tipo)}</td><td>${fecha(x.fecha)}</td><td>${limpiarTexto(x.estado)}</td><td><button class="boton secundario" data-action="seleccionar-historial" data-id="${x.id}">Ver detalle</button></td></tr>`).join('')}</tbody></table>`);break;
 case '37': {let x=datos.avisos.find(v=>v.id===datos.seleccionado)||nuevo;html=encabezado('Detalle de alerta pasada','Seleccione un registro para ver su información.','Historial / 37')+tarjeta('Detalle del evento',`<p><strong>Evento:</strong> ${limpiarTexto(x.tipo)}</p><p><strong>Zona:</strong> ${limpiarTexto(x.zona)}</p><p><strong>Fecha:</strong> ${fecha(x.fecha)}</p><p><strong>Estado:</strong> ${limpiarTexto(x.estado)}</p><p>${limpiarTexto(x.mensaje)}</p>${enlace('Ver otros registros','hu-36')}`);break;}
 case '38': html=encabezado('Fecha y hora del evento','Consulta cuándo ocurrió cada evento simulado.','Historial / 38')+tarjeta('Registro temporal',`<table class="tabla"><thead><tr><th>Evento</th><th>Fecha y hora</th></tr></thead><tbody>${datos.avisos.map(x=>`<tr><td>${limpiarTexto(x.tipo)}</td><td>${fecha(x.fecha)}</td></tr>`).join('')}</tbody></table>${enlace('Ir al historial','hu-36')}`);break;
 case '41': html=encabezado('Tipo de emergencia','El personal del simulador selecciona el evento.','Gestión / 41')+tarjeta('Paso 1 · Tipo de emergencia',`${seleccion('Tipo','tipo',['Incendio','Sismo','Fuga de gas','Evacuación'],d.tipo)}${boton('Guardar tipo y continuar','guardar-tipo')}`);break;
 case '42': html=encabezado('Zona de afectación','Identifique el área del simulacro.','Gestión / 42')+tarjeta('Paso 2 · Zona afectada',`${campo('Zona afectada','zona',d.zona)}${boton('Guardar zona y continuar','guardar-zona')}`);break;
 case '43': html=encabezado('Nivel de criticidad','Seleccione la gravedad del aviso de prueba.','Gestión / 43')+tarjeta('Paso 3 · Urgencia',`${seleccion('Nivel','nivel',['Crítica','Alta','Informativa'],d.nivel)}${boton('Guardar nivel y continuar','guardar-nivel')}`);break;
 case '44': html=encabezado('Instrucción de evacuación','Escriba el mensaje principal de la alerta.','Gestión / 44')+tarjeta('Paso 4 · Instrucciones',`<div class="campo"><label for="mensaje-borrador">Mensaje de evacuación</label><textarea id="mensaje-borrador" maxlength="300">${limpiarTexto(d.mensaje)}</textarea></div>${boton('Guardar instrucciones y continuar','guardar-mensaje')}`);break;
 case '45': html=encabezado('Previsualización de alerta','Revise todos los datos antes de enviarlos.','Gestión / 45')+`<div class="aviso rojo"><h2>${limpiarTexto(d.nivel.toUpperCase())} · ${limpiarTexto(d.tipo)}</h2><p>${limpiarTexto(d.mensaje)}</p></div>`+tarjeta('Resumen del borrador',`<p>Zona: ${limpiarTexto(d.zona)}</p><p>Emisor: ${limpiarTexto(d.emisor)}</p><p>Clase: Simulacro</p><div class="botones">${enlace('Editar mensaje','hu-44','secundario')}${enlace('Continuar con confirmación','hu-46')}</div>`);break;
 case '46': html=encabezado('Confirmación de envío','Confirme la publicación del simulacro dentro del navegador.','Gestión / 46')+tarjeta('Confirmar alerta simulada',`<p><strong>${limpiarTexto(d.tipo)}</strong> · ${limpiarTexto(d.zona)}</p><p>${limpiarTexto(d.mensaje)}</p><p class="nota">No se enviará a teléfonos ni servicios reales.</p><div class="botones">${boton('Confirmar envío simulado','confirmar-envio')}${enlace('Volver a previsualización','hu-45','secundario')}</div>`);break;
 case '47': html=encabezado('Actualización de emergencia activa','Modifique instrucciones de una alerta activa.','Gestión / 47')+tarjeta('Editar alerta activa',a.estado==='Activa'?`<div class="campo"><label for="nuevo-mensaje">Nuevo mensaje</label><textarea id="nuevo-mensaje" maxlength="300">${limpiarTexto(a.mensaje)}</textarea></div>${boton('Guardar cambios','guardar-cambios')}`:`<p>No hay alertas activas. Cree una nueva desde Gestión.</p>${enlace('Crear una alerta','hu-41')}`);break;
 case '48': html=encabezado('Finalización de alerta','Cierre la emergencia simulada.','Gestión / 48')+tarjeta('Finalizar evento',a.estado==='Activa'?`<p><strong>${limpiarTexto(a.tipo)}</strong> · ${limpiarTexto(a.zona)}</p><p>Estado actual: Activa</p>${boton('Finalizar alerta','finalizar-alerta','peligro')}`:`<p>No hay una alerta activa para finalizar.</p>${enlace('Ir a gestión','gestion')}`);break;
 default:html=encabezado('Pantalla no encontrada','Regrese al inicio.');
 }
 return html+rutaContextual(id)+`<div class="botones">${enlace('Volver a '+g.nombre,g.id,'secundario')}${enlace('Ir a Inicio','inicio','secundario')}</div>`+pie();}
function abrirCuenta(){
 const p=datos.perfil;
 dialogo('Mi cuenta · Datos del perfil',`<p>Puede editar la información usada en esta demostración. Se guardará únicamente en este navegador; no crea una cuenta real.</p>
 <form id="formulario-cuenta">
  <div class="campos-cuenta">
   <div class="campo"><label for="cuenta-nombre">Nombre *</label><input id="cuenta-nombre" name="nombre" maxlength="50" required value="${limpiarTexto(p.nombre)}"></div>
   <div class="campo"><label for="cuenta-apellido">Apellido</label><input id="cuenta-apellido" name="apellido" maxlength="60" value="${limpiarTexto(p.apellido)}"></div>
   <div class="campo"><label for="cuenta-correo">Correo electrónico</label><input id="cuenta-correo" name="correo" type="email" maxlength="100" value="${limpiarTexto(p.correo)}"></div>
   <div class="campo"><label for="cuenta-telefono">Teléfono</label><input id="cuenta-telefono" name="telefono" type="tel" maxlength="20" value="${limpiarTexto(p.telefono)}"></div>
   <div class="campo"><label for="cuenta-centro">Centro o sede</label><input id="cuenta-centro" name="centro" maxlength="80" value="${limpiarTexto(p.centro)}"></div>
  </div>
  <p class="nota">* Campo obligatorio. No coloque contraseñas ni información sensible: es un prototipo local.</p>
  <button class="boton" type="submit">Guardar mis datos</button>
 </form>`);
}
function guardarCuenta(){
 const f=document.getElementById('formulario-cuenta');
 if(!f || !f.reportValidity()) return;
 const p={nombre:f.elements.nombre.value.trim(),apellido:f.elements.apellido.value.trim(),correo:f.elements.correo.value.trim(),telefono:f.elements.telefono.value.trim(),centro:f.elements.centro.value.trim()};
 if(!p.nombre){mensaje('Debe ingresar su nombre.');return;}
 datos.perfil=p; guardar();document.getElementById('dialogo').close();actualizarPerfil();mostrar();mensaje('Se guardaron tus datos en este navegador.');
}
function actualizarPerfil(){
 const p=datos.perfil;
 const estado=document.querySelector('.estado-lateral span');
 if(estado)estado.textContent=(p.centro||'Campus Central')+' (demostración)';
 const btn=document.querySelector('[data-action="cuenta"]');
 if(btn)btn.title='Editar datos de '+(p.nombre||'Visitante');
}
function menuMovilAbierto(){return document.getElementById('boton-menu')?.getAttribute('aria-expanded')==='true';}
function cambiarMenuMovil(abierto){
 const boton=document.getElementById('boton-menu');
 const menu=document.getElementById('menu-principal');
 if(!boton||!menu)return;
 boton.setAttribute('aria-expanded',String(abierto));
 menu.classList.toggle('abierto',abierto);
}
function alternarMenuMovil(){cambiarMenuMovil(!menuMovilAbierto());}
function vistaContactos(){return encabezado('Contactos de confianza','Apartado informativo del mockup; no forma parte de las 30 HU seleccionadas.')+tarjeta('Información',`<p>El módulo de contactos no está conectado a números ni enviará notificaciones reales.</p>${enlace('Volver a Inicio','inicio')}`)+pie();}
function mostrar(){let ruta=decodeURIComponent((location.hash||'#inicio').slice(1));let cont=document.getElementById('contenido');let h='';
 if(ruta==='inicio')h=vistaInicio();else if(ruta==='contactos')h=vistaContactos();else if(grupoPorId(ruta))h=vistaGrupo(grupoPorId(ruta));else if(ruta.startsWith('hu-')&&nombres[ruta.slice(3)])h=vistaHU(ruta.slice(3));else h=encabezado('Pantalla no encontrada','La dirección solicitada no existe.')+enlace('Ir al Inicio','inicio');
 cont.innerHTML=h;let gm=ruta.startsWith('hu-')?grupoPorHu(ruta.slice(3))?.id:ruta;document.querySelectorAll('[data-menu]').forEach(x=>x.classList.toggle('activo',x.dataset.menu===gm));document.body.classList.toggle('alto-contraste',datos.contraste);document.body.classList.toggle('tamano-grande',datos.textoGrande);document.title=(ruta.startsWith('hu-')?nombres[ruta.slice(3)]+' - ':'')+'HapAlert';window.scrollTo(0,0);if(document.activeElement && document.activeElement.closest('#contenido')===null && ruta!=='inicio'){};requestAnimationFrame(()=>cont.focus({preventScroll:true}));
}
function ir(ruta){if(location.hash==='#'+ruta)mostrar();else location.hash=ruta;}
function tomarTexto(id){return document.getElementById(id)?.value.trim()||'';}
function ejecutar(accion,e){let a=actual(),d=datos.borrador;
 switch(accion){
  case 'ayuda': dialogo('Ayuda de HapAlert','<p>Para consultar un aviso, siga Inicio → Alertas → Consultar alerta visual → Identificar emergencia → Consultar nivel de urgencia. También puede ir directamente a las instrucciones si necesita actuar.</p><p>En Inicio encontrarás un video introductorio con transcripción y recursos externos oficiales sobre prevención y accesibilidad. <a href="#inicio" onclick="document.getElementById(\'dialogo\').close()">Abrir Inicio y sus recursos</a>.</p><p>Mi cuenta permite editar datos locales. Las alertas y los envíos son simulaciones académicas.</p>');break;
  case 'cuenta':abrirCuenta();break;
  case 'confirmar-lectura':a.leida=true;guardar();mensaje('Lectura confirmada. Ahora puede identificar la emergencia.');ir('hu-11');break;
  case 'reconocer-patron':mensaje('Has reconocido el patrón. No se ha enviado una vibración.');break;
  case 'texto-grande':datos.textoGrande=true;guardar();mostrar();mensaje('Tamaño de texto aumentado.');break;
  case 'texto-normal':datos.textoGrande=false;guardar();mostrar();mensaje('Tamaño de texto normal.');break;
  case 'alternar-contraste':datos.contraste=!datos.contraste;guardar();mostrar();mensaje('Contraste actualizado.');break;
  case 'paso-siguiente':datos.paso=(datos.paso+1)%4;guardar();mostrar();break;
  case 'paso-anterior':datos.paso=(datos.paso+3)%4;guardar();mostrar();break;
  case 'alternar-ruta':a.rutaBloqueada=!a.rutaBloqueada;guardar();mostrar();mensaje('Estado de la ruta actualizado.');break;
  case 'actualizar-vista':mostrar();mensaje('Se muestran las instrucciones más recientes.');break;
  case 'seleccionar-historial':datos.seleccionado=Number(e.target.dataset.id);guardar();ir('hu-37');break;
  case 'guardar-tipo':d.tipo=tomarTexto('tipo');guardar();ir('hu-42');break;
  case 'guardar-zona':{let v=tomarTexto('zona');if(!v){mensaje('Escriba una zona.');break;}d.zona=v;guardar();ir('hu-43');break;}
  case 'guardar-nivel':d.nivel=tomarTexto('nivel');guardar();ir('hu-44');break;
  case 'guardar-mensaje':{let v=tomarTexto('mensaje-borrador');if(v.length<8){mensaje('Escriba una instrucción de al menos 8 caracteres.');break;}d.mensaje=v;guardar();ir('hu-45');break;}
  case 'confirmar-envio':{if(!d.tipo||!d.zona||!d.nivel||!d.mensaje){mensaje('Complete el borrador.');break;}let n={...d,id:Date.now(),fecha:new Date().toISOString(),estado:'Activa',leida:false,rutaBloqueada:false,clase:'Simulacro'};datos.avisos.unshift(n);datos.seleccionado=n.id;guardar();mensaje('Se publicó un simulacro local.');ir('hu-01');break;}
  case 'guardar-cambios':{let v=tomarTexto('nuevo-mensaje');if(v.length<8){mensaje('La instrucción es demasiado corta.');break;}if(a.estado!=='Activa'){mensaje('No hay alerta activa.');break;}a.mensaje=v;guardar();mostrar();mensaje('Instrucción actualizada en las demás pantallas.');break;}
  case 'finalizar-alerta':if(a.estado!=='Activa'){mensaje('No hay alerta activa.');break;}a.estado='Finalizada';guardar();mensaje('Alerta simulada finalizada.');ir('hu-24');break;
  case 'reiniciar':if(confirm('¿Reiniciar todos los datos simulados?')){datos=structuredClone(inicial);guardar();ir('inicio');mensaje('Demostración reiniciada.');}break;
 }
}
document.addEventListener('submit',function(evento){if(evento.target.id==='formulario-cuenta'){evento.preventDefault();guardarCuenta();}});
document.addEventListener('click',function(evento){
 if(evento.target.closest('#boton-menu')){alternarMenuMovil();return;}
 let enlace=evento.target.closest('#menu-principal a');
 if(enlace&&window.matchMedia('(max-width:700px)').matches)cambiarMenuMovil(false);
 let el=evento.target.closest('button[data-action]');if(el)ejecutar(el.dataset.action,evento);
});
document.addEventListener('keydown',function(evento){
 if(evento.key==='Escape'&&menuMovilAbierto()){
  cambiarMenuMovil(false);
  document.getElementById('boton-menu')?.focus();
 }
});
window.addEventListener('resize',function(){if(!window.matchMedia('(max-width:700px)').matches)cambiarMenuMovil(false);});
window.addEventListener('hashchange',mostrar);
actualizarPerfil();
mostrar();
