/* ===== Base funcional ===== */
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
 `<div class="aviso rojo"><p class="sello-simulacro">SIMULACIÓN ACADÉMICA · NO ES UNA ALERTA REAL</p><h2>${a.estado==='Activa'?'SIMULACRO ACTIVO':'SIMULACRO FINALIZADO'} · ${limpiarTexto(a.tipo)}</h2><p>${limpiarTexto(a.mensaje)}</p></div>`+
 tarjeta(a.estado==='Activa'?'Alerta activa · Lectura prioritaria':'Último aviso finalizado',`<p>Zona afectada: ${limpiarTexto(a.zona)}.</p><p>Recibida: ${fecha(a.fecha)} · Emitida por ${limpiarTexto(a.emisor)}.</p><div class="botones">${boton(a.leida?'Lectura confirmada':'He visto la alerta','confirmar-lectura')}${enlace('Ver instrucciones','hu-19','secundario')}</div><div class="barras"><div class="barra"></div><div class="barra"></div><div class="barra"></div></div>`)+
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
 if(ruta==='inicio')h=panelInicio2();else if(ruta==='contactos')h=contactos2();else if(grupoPorId(ruta))h=vistaGrupo(grupoPorId(ruta));else if(ruta.startsWith('hu-')&&nombres[ruta.slice(3)])h=vistaHU(ruta.slice(3));else h=encabezado('Pantalla no encontrada','La dirección solicitada no existe.')+enlace('Ir al Inicio','inicio');
 if(ruta.startsWith('hu-')&&nombres[ruta.slice(3)]){let id=ruta.slice(3), extra=extras2(id);if(extra){let pos=h.indexOf('<div class="pie">');if(['41','42','43','44','45','46'].includes(id)){let t=h.indexOf('<section class="tarjeta">');h=h.slice(0,t)+extra+h.slice(t);}else h=h.slice(0,pos)+extra+h.slice(pos);}}cont.innerHTML=h;let gm=ruta.startsWith('hu-')?grupoPorHu(ruta.slice(3))?.id:ruta;document.querySelectorAll('[data-menu]').forEach(x=>x.classList.toggle('activo',x.dataset.menu===gm));document.body.classList.toggle('alto-contraste',datos.contraste);document.body.classList.toggle('tamano-grande',datos.textoGrande);document.title=(ruta.startsWith('hu-')?nombres[ruta.slice(3)]+' - ':'')+'HapAlert';window.scrollTo(0,0);if(document.activeElement && document.activeElement.closest('#contenido')===null && ruta!=='inicio'){};requestAnimationFrame(()=>cont.focus({preventScroll:true}));
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
  case 'seleccionar-historial':datos.seleccionado=Number(e.target.closest('[data-id]').dataset.id);guardar();ir('hu-37');break;
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
window.addEventListener('DOMContentLoaded',mostrar);


/* ===== Interacciones y orientación ===== */
// HapAlert 2.0: extensiones locales, sin servicios externos.
const perfiles2=['Personas sordas','Personas con hipoacusia','Personal de seguridad, brigadistas o gestores de edificios','Familiares o cuidadores de personas sordas'];
function panelInicio2(){const a=actual(), activo=a.estado==='Activa';const opciones=[['01','Alertas','Consulta el aviso y su urgencia','!'],['20','Salida segura','Consulta el plano ilustrativo','↗'],['28','Guía háptica','Compara patrones visuales','≋'],['36','Historial','Consulta avisos anteriores','◷'],['30','Accesibilidad','Personaliza la lectura','Aa'],['41','Gestión de simulacros','Crea un aviso de prueba','+']];const orden=datos.rol===perfiles2[2]?[5,0,1,3,2,4]:[0,1,2,3,4,5];return encabezado('Tu espacio de alertas','Identifica, comprende y consulta las indicaciones de una emergencia simulada.','HAPALERT / INICIO')+`<section class="perfil2"><div><strong>Personaliza tu recorrido</strong><p>Elige un perfil de demostración; no cambia los permisos ni oculta funciones.</p></div>${seleccion('Perfil de uso','rol-demo',['Sin seleccionar',...perfiles2],datos.rol||'Sin seleccionar')}</section><section class="alerta2 ${activo?'':'cerrada2'}"><span class="tag2">SIMULACIÓN ACADÉMICA · ${activo?'ACTIVA':'FINALIZADA'}</span><h2>${limpiarTexto(a.tipo)} · ${limpiarTexto(a.nivel)}</h2><p><strong>${limpiarTexto(a.zona)}</strong></p><p>${limpiarTexto(a.mensaje)}</p><div class="botones">${enlace('Consultar alerta','hu-01')}${enlace('Ver instrucciones','hu-19','secundario')}</div></section><h2 class="titulo2">Acciones rápidas</h2><div class="acciones2">${orden.map(i=>{let x=opciones[i];return `<a class="accion2" href="#hu-${x[0]}"><span aria-hidden="true" class="simbolo2">${x[3]}</span><strong>${x[1]}</strong><span>${x[2]}</span></a>`}).join('')}<a class="accion2" href="#contactos"><span class="simbolo2" aria-hidden="true">◎</span><strong>Contactos de confianza</strong><span>Organiza contactos ficticios</span></a></div><details class="educacion2"><summary>Conoce HapAlert y los recursos educativos</summary>${mediosInicio()}${recursosEducativos()}</details>${tarjeta('Datos de demostración','<p>Todos los avisos, rutas y contactos son ficticios. No usar para emergencias reales.</p>'+boton('Reiniciar datos de la demostración','reiniciar','secundario'))}${pie()}`;}
function contactos2(){return encabezado('Contactos de confianza','Administra contactos ficticios guardados únicamente en este navegador.')+tarjeta('Agregar contacto',`<p>Usa nombres de ejemplo, no datos personales reales. No se enviarán mensajes.</p><form id="contacto2"><div class="campo"><label for="alias2">Alias ficticio</label><input id="alias2" required maxlength="50" placeholder="Ej. Contacto A"></div><div class="campo"><label for="relacion2">Relación</label><select id="relacion2"><option>Familiar</option><option>Cuidador</option><option>Persona de confianza</option></select></div><button class="boton" type="submit">Guardar contacto</button></form>`)+tarjeta('Contactos guardados',`${(datos.contactos||[]).map((c,i)=>`<div class="contacto2"><strong>${limpiarTexto(c.alias)}</strong><span>${limpiarTexto(c.relacion)}</span><button type="button" class="boton secundario" data-borrar2="${i}">Eliminar</button></div>`).join('')||'<p>Aún no hay contactos de demostración.</p>'}`)+pie();}
function extras2(id){if(id==='01'){let a=actual();return tarjeta('Resumen del aviso',`<p><strong>Urgencia:</strong> ${limpiarTexto(a.nivel)} · <strong>Estado:</strong> ${limpiarTexto(a.estado)}</p><div class="botones">${enlace('Tipo de emergencia','hu-11','secundario')}${enlace('Detalle completo','hu-18','secundario')}${enlace('Salida segura','hu-20','secundario')}</div>`);}if(id==='20')return tarjeta('Plano ilustrativo de referencia',`<p>${actual().rutaBloqueada?'Ruta habitual bloqueada: consulte la alternativa descrita en el aviso. El plano no representa el bloqueo.':'Plano de ejemplo, no corresponde a una ubicación real.'}</p><img class="plano2" src="assets/evacuacion.svg" alt="Plano ficticio de evacuación hacia una zona segura">`);if(id==='28')return tarjeta('Comparador visual de señales',`<p>Patrones originales de la demostración: emergencia (tres pulsos largos, pausa y repetición) y aviso habitual (un pulso breve). No son señales oficiales.</p><div class="botones"><button class="boton" data-patron2="emergencia">Reproducir emergencia</button><button class="boton secundario" data-patron2="habitual">Reproducir aviso habitual</button></div><div id="pulsos2" class="pulsos2" aria-hidden="true"></div><p id="patron-estado2" role="status">Selecciona una señal para ver la secuencia.</p>`);if(id==='36')return tarjeta('Buscar registros',`<div class="filtros2"><div class="campo"><label for="buscar2">Buscar por evento</label><input id="buscar2" type="search" placeholder="Incendio, sismo…"></div>${seleccion('Estado','estado2',['Todos','Activa','Finalizada'],'Todos')}</div><p id="conteo2" role="status"></p>`);if(['41','42','43','44','45','46'].includes(id))return `<section class="progreso2" aria-label="Progreso de creación">Paso ${Number(id)-40} de 6 <progress max="6" value="${Number(id)-40}"></progress></section>`;return '';}
function filtrar2(){const q=(document.getElementById('buscar2')?.value||'').toLowerCase(), s=document.getElementById('estado2')?.value||'Todos';let n=0;document.querySelectorAll('#contenido .tabla tbody tr').forEach(tr=>{let ok=tr.cells[0].textContent.toLowerCase().includes(q)&&(s==='Todos'||tr.cells[2].textContent===s);tr.hidden=!ok;if(ok)n++;});let c=document.getElementById('conteo2');if(c)c.textContent=n+' registros visibles';}
let temporizadores2=[];function animar2(tipo){temporizadores2.forEach(clearTimeout);temporizadores2=[];let el=document.getElementById('pulsos2'),status=document.getElementById('patron-estado2');if(!el||!status)return;let seq=tipo==='emergencia'?[600,180,600,180,600,700,600,180,600,180,600]:[200];el.innerHTML=seq.map((ms,i)=>`<span class="pulso2 ${i%2?'pausa2':''}" style="flex:${ms}"></span>`).join('');status.textContent=tipo==='emergencia'?'Emergencia: tres pulsos largos, pausa y repetición.':'Aviso habitual: un pulso breve.';if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;let t=0;Array.from(el.children).forEach((b,i)=>{temporizadores2.push(setTimeout(()=>b.classList.add('reproducido2'),t));t+=seq[i];});}
document.addEventListener('change',e=>{if(e.target.id==='rol-demo'){datos.rol=e.target.value;guardar();mostrar();}if(e.target.id==='estado2')filtrar2();});document.addEventListener('input',e=>{if(e.target.id==='buscar2')filtrar2();});document.addEventListener('submit',e=>{if(e.target.id!=='contacto2')return;e.preventDefault();let alias=tomarTexto('alias2');if(!alias)return;datos.contactos=datos.contactos||[];datos.contactos.push({alias,relacion:tomarTexto('relacion2')});guardar();mostrar();mensaje('Contacto ficticio guardado.');});document.addEventListener('click',e=>{let p=e.target.closest('[data-patron2]');if(p)animar2(p.dataset.patron2);let b=e.target.closest('[data-borrar2]');if(b){datos.contactos.splice(Number(b.dataset.borrar2),1);guardar();mostrar();mensaje('Contacto eliminado.');}});


// --- Mejoras específicas para orientación y vibración ---
if(!datos.vibracion || typeof datos.vibracion!=='object'){
  datos.vibracion={habilitada:true,intensidad:'Media'};
  guardar();
}
function patronSegunIntensidad(tipo){
  const base={Baja:0.75,Media:1,Alta:1.3}[datos.vibracion?.intensidad||'Media']||1;
  const scale=v=>Math.max(80,Math.round(v*base));
  const patrones={
    emergencia:[scale(500),scale(160),scale(500),scale(160),scale(500),scale(700),scale(500),scale(160),scale(500),scale(160),scale(500)],
    habitual:[scale(180)]
  };
  return patrones[tipo]||patrones.habitual;
}
function intentarVibrar(tipo){
  if(!datos.vibracion?.habilitada) return 'Vibración desactivada en la configuración.';
  if(!('vibrate' in navigator)) return 'El dispositivo o navegador no admite vibración; se muestra la secuencia visual.';
  const ok=navigator.vibrate(patronSegunIntensidad(tipo));
  return ok ? 'Se intentó reproducir la vibración en este dispositivo.' : 'No fue posible activar la vibración; se mantiene la vista visual.';
}
function planoZonaSegura(bloqueada=false){
  const principalColor=bloqueada?'#c3c9d4':'#129a63';
  const alternaColor=bloqueada?'#e57920':'#7aa7c7';
  const principalDash=bloqueada?'14 10':'20 10';
  const altDash=bloqueada?'20 10':'12 12';
  const principalWidth=bloqueada?12:16;
  const altWidth=bloqueada?16:11;
  const principalOpacity=bloqueada?.45:1;
  const bloqueo=bloqueada?`<g>
      <rect x="280" y="226" width="98" height="54" rx="10" fill="#fee2e2" stroke="#c93d3d" stroke-width="3"/>
      <text x="329" y="246" text-anchor="middle" font-size="14" font-family="Arial" fill="#8f2020" font-weight="700">RUTA</text>
      <text x="329" y="264" text-anchor="middle" font-size="14" font-family="Arial" fill="#8f2020" font-weight="700">BLOQUEADA</text>
      <path d="M292 236l74 34" stroke="#c93d3d" stroke-width="5"/>
      <path d="M366 236l-74 34" stroke="#c93d3d" stroke-width="5"/>
    </g>`:'';
  const resumen=bloqueada
    ? '<p><strong>Ruta principal bloqueada.</strong> Sigue la ruta alternativa señalada en naranja hasta el punto seguro.</p>'
    : '<p><strong>Ruta principal disponible.</strong> Sigue la línea verde discontinua hasta la zona segura.</p>';
  return `<div class="plano-wrap2">
    <div class="plano-card2">
      <svg class="plano-svg2" viewBox="0 0 820 520" role="img" aria-label="Plano superior ilustrativo con pasillos, salida, punto seguro y ${bloqueada?'ruta alternativa':'ruta principal'} de evacuación">
        <rect width="820" height="520" rx="24" fill="#eff7fc"/>
        <text x="40" y="45" font-size="24" font-weight="700" font-family="Arial" fill="#173b57">Plano superior de evacuación</text>
        <text x="40" y="72" font-size="14" font-family="Arial" fill="#456378">Ilustración académica · no corresponde a una infraestructura real</text>
        <rect x="50" y="95" width="600" height="360" rx="20" fill="#fff" stroke="#b8d0e2" stroke-width="5"/>
        <rect x="670" y="140" width="110" height="120" rx="18" fill="#ddf6e7" stroke="#7ac39d" stroke-width="4"/>
        <text x="725" y="186" text-anchor="middle" font-size="18" font-family="Arial" font-weight="700" fill="#1b6a47">ZONA</text>
        <text x="725" y="212" text-anchor="middle" font-size="18" font-family="Arial" font-weight="700" fill="#1b6a47">SEGURA</text>
        <text x="725" y="234" text-anchor="middle" font-size="14" font-family="Arial" fill="#1b6a47">Patio norte</text>
        <path d="M195 95v188M365 95v238M520 95v145M50 225h315M365 285h285M215 375h435" fill="none" stroke="#bfd3e2" stroke-width="10" stroke-linecap="round"/>
        <rect x="88" y="130" width="92" height="58" rx="10" fill="#e9f4fb"/><text x="134" y="164" text-anchor="middle" font-size="16" font-family="Arial" fill="#173b57" font-weight="700">Aula 1</text>
        <rect x="222" y="130" width="110" height="58" rx="10" fill="#e9f4fb"/><text x="277" y="164" text-anchor="middle" font-size="16" font-family="Arial" fill="#173b57" font-weight="700">Aula 2</text>
        <rect x="395" y="135" width="95" height="58" rx="10" fill="#e9f4fb"/><text x="442" y="169" text-anchor="middle" font-size="16" font-family="Arial" fill="#173b57" font-weight="700">Lab</text>
        <rect x="90" y="308" width="128" height="55" rx="10" fill="#fff2da" stroke="#f1bf66" stroke-width="3"/><text x="154" y="340" text-anchor="middle" font-size="16" font-family="Arial" fill="#8a5a0a" font-weight="700">Zona actual</text>
        <path d="M154 308v-46h100v-37h111" fill="none" stroke="#1677c8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="154" cy="308" r="18" fill="#1677c8"/><circle cx="154" cy="308" r="8" fill="#fff"/>
        <path d="M154 308v-46h100v-37h111v60h160v90h155" fill="none" stroke="${principalColor}" stroke-width="${principalWidth}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${principalDash}" opacity="${principalOpacity}"/>
        <path d="M154 308v67h200v-2h70v-2h114v-66h132" fill="none" stroke="${alternaColor}" stroke-width="${altWidth}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${altDash}"/>
        <path d="M655 378l24 20-24 20" stroke="${bloqueada?'#e57920':'#129a63'}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        ${bloqueo}
        <rect x="685" y="294" width="70" height="52" rx="10" fill="#ffffff" stroke="#bdd1e0" stroke-width="3"/>
        <text x="720" y="325" text-anchor="middle" font-size="15" font-family="Arial" fill="#173b57" font-weight="700">SALIDA</text>
      </svg>
      <div class="leyenda2" aria-label="Leyenda del plano">
        <span><i class="muestra2 actual"></i>Zona actual</span>
        <span><i class="muestra2 principal"></i>Ruta principal</span>
        <span><i class="muestra2 alternativa"></i>Ruta alternativa</span>
        <span><i class="muestra2 segura"></i>Zona segura</span>
      </div>
    </div>
    <div class="pasos-plano2">
      <h3>${bloqueada?'Salida alternativa recomendada':'Salida segura recomendada'}</h3>
      ${resumen}
      <ol>
        <li>Ubícate en tu zona actual y sigue la señal visual del pasillo.</li>
        <li>Avanza por el corredor hasta la salida señalizada.</li>
        <li>Dirígete al <strong>Patio norte</strong> y permanece en la zona segura.</li>
      </ol>
      <p class="nota">El plano solo sirve para explicar la lógica de orientación dentro del prototipo.</p>
    </div>
  </div>`;
}
const vistaHUOriginal=vistaHU;
vistaHU=function(id){
  const a=actual();
  if(id==='20'){
    return encabezado('Salida o zona segura','Orientación visual para evacuar mediante una representación superior del recorrido.','Orientación / 20')+
      tarjeta('Ruta recomendada',`<p><strong>Salida lateral → Patio norte</strong></p><p>Zona actual: ${limpiarTexto(a.zona)}</p><p>${a.rutaBloqueada?'La salida principal se encuentra bloqueada. Usa la ruta alternativa marcada en naranja.':'Dirígete a la zona segura siguiendo la ruta principal marcada en verde.'}</p>`+
      planoZonaSegura(a.rutaBloqueada)+
      `<div class="botones">${enlace('Ver pasos de evacuación','hu-21')}${enlace('Comprobar estado de la ruta','hu-23','secundario')}</div>`)+
      rutaContextual(id)+`<div class="botones">${enlace('Volver a Orientación','orientacion','secundario')}${enlace('Ir a Inicio','inicio','secundario')}</div>`+pie();
  }
  if(id==='23'){
    return encabezado('Ruta no disponible','Comprueba cuándo cambiar a una salida alternativa dentro del simulador.','Orientación / 23')+
      `<div class="aviso ${a.rutaBloqueada?'rojo':'naranja'}"><h2>${a.rutaBloqueada?'Ruta principal bloqueada':'Ruta principal disponible'}</h2><p>${a.rutaBloqueada?'Usa la ruta alternativa hasta el Patio norte.':'La salida lateral continúa habilitada en esta simulación.'}</p></div>`+
      tarjeta('Comparación de rutas',planoZonaSegura(a.rutaBloqueada)+`<div class="botones">${boton(a.rutaBloqueada?'Restablecer ruta principal':'Simular bloqueo de ruta','alternar-ruta')}${enlace('Volver a la salida segura','hu-20','secundario')}</div>`)+
      rutaContextual(id)+`<div class="botones">${enlace('Volver a Orientación','orientacion','secundario')}${enlace('Ir a Inicio','inicio','secundario')}</div>`+pie();
  }
  if(id==='28'){
    const hab=datos.vibracion?.habilitada;
    const intensidad=datos.vibracion?.intensidad||'Media';
    return encabezado('Significado de patrones hápticos','Compara señales, personaliza la vibración y prueba una vista previa cuando el dispositivo lo permita.','Accesibilidad / 28')+
      tarjeta('Patrones de referencia',`<div class="aviso"><h2 class="señal">━ ━ ━ &nbsp; ━ ━ ━</h2><p><strong>Emergencia:</strong> tres pulsos largos, pausa y repetición.</p></div><p><strong>Notificación habitual:</strong> ─ (un pulso breve).</p><p>Esta vista usa una animación visual y, si el dispositivo lo admite, puede intentar una vibración de prueba.</p><div class="botones">${boton('Probar patrón de emergencia','probar-emergencia')}${boton('Probar aviso habitual','probar-habitual','secundario')}</div><div id="pulsos2" class="pulsos2" aria-hidden="true"></div><p id="patron-estado2" role="status">Selecciona una señal para ver la secuencia y la configuración actual.</p>`) +
      tarjeta('Configuración de vibración',`<div class="config-vibracion2"><div class="campo"><label for="habilitar-vibracion2">Vibración de demostración</label><select id="habilitar-vibracion2"><option value="si" ${hab?'selected':''}>Activada</option><option value="no" ${!hab?'selected':''}>Desactivada</option></select></div><div class="campo"><label for="intensidad-vibracion2">Duración de pulsos</label><select id="intensidad-vibracion2"><option ${intensidad==='Baja'?'selected':''}>Baja</option><option ${intensidad==='Media'?'selected':''}>Media</option><option ${intensidad==='Alta'?'selected':''}>Alta</option></select></div></div><p class="nota">Esta configuración se guarda localmente en el navegador. No representa una vibración clínica ni una señal oficial.</p><div class="botones">${boton('Reconozco el patrón','reconocer-patron')}${enlace('Ajustar tamaño de texto','hu-30','secundario')}</div>`) +
      rutaContextual(id)+`<div class="botones">${enlace('Volver a Accesibilidad','configuracion','secundario')}${enlace('Ir a Inicio','inicio','secundario')}</div>`+pie();
  }
  return vistaHUOriginal(id);
};
const ejecutarOriginal=ejecutar;
ejecutar=function(accion,e){
  if(accion==='probar-emergencia'){
    animar2('emergencia');
    const m=intentarVibrar('emergencia');
    const s=document.getElementById('patron-estado2'); if(s) s.textContent='Emergencia: tres pulsos largos, pausa y repetición. '+m;
    return;
  }
  if(accion==='probar-habitual'){
    animar2('habitual');
    const m=intentarVibrar('habitual');
    const s=document.getElementById('patron-estado2'); if(s) s.textContent='Aviso habitual: un pulso breve. '+m;
    return;
  }
  return ejecutarOriginal(accion,e);
};
document.addEventListener('change',e=>{
  if(e.target.id==='habilitar-vibracion2'){
    datos.vibracion=datos.vibracion||{};
    datos.vibracion.habilitada=e.target.value==='si';
    guardar();
    mensaje('Configuración de vibración actualizada.');
  }
  if(e.target.id==='intensidad-vibracion2'){
    datos.vibracion=datos.vibracion||{};
    datos.vibracion.intensidad=e.target.value;
    guardar();
    mensaje('Duración de pulsos guardada.');
  }
});


// --- Interactividad adicional centrada en visión + vibración ---
function vibrarUI(tipo='suave'){
  if(!datos.vibracion?.habilitada) return false;
  if(!('vibrate' in navigator)) return false;
  const intensidad=datos.vibracion?.intensidad||'Media';
  const mult={Baja:0.75,Media:1,Alta:1.25}[intensidad]||1;
  const base={
    suave:[70],
    navegacion:[90,50,90],
    alerta:[240,110,240],
    exito:[120,60,120,60,180],
    evacuacion:[180,80,180,80,320]
  }[tipo]||[80];
  return navigator.vibrate(base.map(v=>Math.round(v*mult)));
}
function pasosEvacuacionData(){
  const bloqueada=actual().rutaBloqueada;
  return [
    {icono:'👀',titulo:'Reconoce la alerta',texto:'Observa la alerta visual, identifica el tipo de emergencia y mantén la calma.', apoyo:'Verifica color, texto e icono antes de moverte.'},
    {icono:'🧭',titulo:'Ubica la ruta',texto:bloqueada?'La ruta principal está bloqueada; sigue la alternativa marcada en naranja.':'Ubica la ruta principal marcada en verde dentro del plano de evacuación.', apoyo:'Dirige tu atención a las señales visuales del pasillo.'},
    {icono:'🚶',titulo:'Desplázate a la salida',texto:'Avanza por el corredor sin usar ascensores y sigue al personal autorizado si está presente.', apoyo:'Mantente dentro del recorrido señalado hasta la salida.'},
    {icono:'✅',titulo:'Llega a la zona segura',texto:'Reúnete en el Patio norte y permanece allí hasta recibir nuevas indicaciones.', apoyo:'Espera confirmación visual de fin de emergencia.'}
  ];
}
function panelPasosEvacuacion(){
  const pasos=pasosEvacuacionData();
  const idx=Math.max(0,Math.min(datos.paso||0,pasos.length-1));
  const paso=pasos[idx];
  const progreso=((idx+1)/pasos.length)*100;
  return `<section class="evac2">
    <div class="evac2-top">
      <div>
        <p class="eyebrow">RECORRIDO GUIADO</p>
        <h2>Paso ${idx+1} de ${pasos.length}</h2>
        <p class="descripcion">Sigue el recorrido visual y, si usas celular, apóyate en la vibración de confirmación.</p>
      </div>
      <div class="evac2-progress" aria-label="Progreso del recorrido">
        <strong>${Math.round(progreso)}%</strong>
        <div class="evac2-barra"><span style="width:${progreso}%"></span></div>
      </div>
    </div>
    <div class="evac2-grid">
      <aside class="evac2-lista" aria-label="Lista de pasos de evacuación">
        ${pasos.map((p,i)=>`<button type="button" class="evac2-item ${i===idx?'activo':''} ${i<idx?'completo':''}" data-irpaso2="${i}"><span class="evac2-num">${i+1}</span><span class="evac2-icono" aria-hidden="true">${p.icono}</span><span><strong>${p.titulo}</strong><small>${i<idx?'Completado':i===idx?'Paso actual':'Pendiente'}</small></span></button>`).join('')}
      </aside>
      <div class="evac2-detalle">
        <div class="evac2-card">
          <div class="evac2-badge">${paso.icono}</div>
          <div>
            <p class="evac2-label">PASO ACTUAL</p>
            <h3>${paso.titulo}</h3>
            <p>${paso.texto}</p>
          </div>
        </div>
        <div class="evac2-ayuda">
          <strong>Apoyo visual</strong>
          <p>${paso.apoyo}</p>
          <ul>
            <li>Prioriza siempre iconos, texto grande y colores de alerta.</li>
            <li>Si estás en celular, puedes usar la vibración de apoyo en este flujo.</li>
            <li>Consulta el plano si necesitas confirmar la dirección.</li>
          </ul>
        </div>
        <div class="evac2-actions">
          ${boton('Paso anterior','paso-anterior','secundario')}
          ${boton('Siguiente paso','paso-siguiente')}
          ${boton('Vibración de apoyo','vibracion-paso','ghost2')}
          ${enlace('Ver plano de evacuación','hu-20','secundario')}
        </div>
      </div>
    </div>
  </section>`;
}
const vistaHUV3=vistaHU;
vistaHU=function(id){
  if(id==='21'){
    return encabezado('Pasos de evacuación','Recorre cada instrucción con una guía visual por etapas.','Orientación / 21')+
      panelPasosEvacuacion()+
      rutaContextual(id)+`<div class="botones">${enlace('Volver a Orientación','orientacion','secundario')}${enlace('Ir a Inicio','inicio','secundario')}</div>`+pie();
  }
  return vistaHUV3(id);
};
const ejecutarV3=ejecutar;
ejecutar=function(accion,e){
  if(accion==='vibracion-paso'){
    const ok=vibrarUI('evacuacion');
    mensaje(ok?'Se activó una vibración de apoyo para el paso actual.':'Tu dispositivo no admite vibración o está desactivada.');
    return;
  }
  const res=ejecutarV3(accion,e);
  if(['paso-siguiente','paso-anterior'].includes(accion)) vibrarUI('navegacion');
  if(['confirmar-lectura','alternar-ruta','probar-emergencia'].includes(accion)) vibrarUI('alerta');
  if(['confirmar-envio','guardar-cambios','finalizar-alerta'].includes(accion)) vibrarUI('exito');
  if(['texto-grande','texto-normal','alternar-contraste','probar-habitual'].includes(accion)) vibrarUI('suave');
  return res;
};
document.addEventListener('click',e=>{
  const ir=e.target.closest('[data-irpaso2]');
  if(ir){
    datos.paso=Number(ir.dataset.irpaso2)||0;
    guardar();
    mostrar();
    vibrarUI('navegacion');
  }
});


/* ===== Accesibilidad y navegación ===== */
// HapAlert 2.3: local academic simulation only.
const extraNames={ '02':'Vibración diferenciada','03':'Prioridad de alerta crítica','04':'Alerta directa al dispositivo','05':'Captación de atención','06':'Canales complementarios al sonido','07':'Alerta con teléfono bloqueado','08':'Activación de pantalla','09':'Señal luminosa','10':'Alerta en smartwatch','26':'Intensidad de vibración','27':'Prueba de patrones hápticos','29':'Prueba general de alerta','32':'Configuración de señal luminosa','33':'Verificación de permisos','34':'Aviso de permisos desactivados','35':'Estado del sistema','39':'Acceso al panel de gestión','40':'Registro de emergencia validada','49':'Seguimiento de sectores','50':'Notificación a contacto de confianza'};
Object.assign(nombres,extraNames);grupos[0].hu.push(...['02','03','04','05','06','07','08','09','10']);grupos[2].hu.push(...['26','27','29','32','33','34','35']);grupos[4].hu.push('39','40','49');grupos.push({id:'familia',nombre:'Familiares y cuidadores',descripcion:'Compartir avisos de demostración',hu:['50']});
const pref=()=>datos.vibracion||(datos.vibracion={habilitada:true,intensidad:'Media'});const patterns23={'Incendio':[500,150,500,150,500,600,500,150,500,150,500],'Sismo':[850,300,850],'Evacuación':[500,150,150,150,500,150,150],'Fuga de gas':[300,150,300,150,700],'Fin de emergencia':[150,150,150],'Aviso habitual':[150]};let running23=false,timer23=null,alert23=null,train23=0;
function halt23(){running23=false;clearTimeout(timer23);try{navigator.vibrate?.(0)}catch{};document.querySelectorAll('.phone23').forEach(x=>x.classList.remove('running23'));document.querySelectorAll('[data-status23]').forEach(x=>x.textContent='Vibración detenida · el aviso sigue visible');}
function play23(type,repeat=false){halt23();running23=true;let seq=patterns23[type]||patterns23.Incendio;const mult={Baja:.7,Media:1,Alta:1.3}[pref().intensidad]||1;seq=seq.map(x=>Math.round(x*mult));let ok=false;const cycle=()=>{if(!running23)return;try{ok=pref().habilitada&&!!navigator.vibrate?.(seq)}catch{};document.querySelectorAll('.phone23').forEach(x=>x.classList.add('running23'));document.querySelectorAll('[data-status23]').forEach(x=>x.textContent=ok?'Vibración solicitada al dispositivo · simulación visual activa':'Simulación visual activa · vibración física no disponible o desactivada');if(repeat)timer23=setTimeout(cycle,seq.reduce((a,b)=>a+b,0)+1200);else timer23=setTimeout(halt23,seq.reduce((a,b)=>a+b,0)+300);};cycle();}
function phone23(type='Incendio'){return `<div class="phone23 ${running23?'running23':''}"><div class="phonebar23">HapAlert <span>●</span></div><div class="phonescreen23"><span class="tag2">SIMULACIÓN ACADÉMICA</span><div class="symbol23">${type==='Fin de emergencia'?'✓':'⚠'}</div><h3>${limpiarTexto(type)}</h3><p>Señal visual de demostración</p><div class="wave23">${(patterns23[type]||patterns23.Incendio).map((n,i)=>`<i style="flex:${n};height:${i%2?4:30}px;--delay:${i*.13}s"></i>`).join('')}</div><p data-status23 role="status">${running23?'Simulación visual activa':'Listo para probar'}</p></div></div>`}
function controls23(type){return `<div class="botones"><button class="boton" data-play23="${limpiarTexto(type)}">Reproducir señal</button><button class="boton secundario" data-stop23>Detener vibración</button></div>`}
function modal23(type){alert23=type;let a=actual();let d=document.getElementById('alert23');d.innerHTML=`<div class="modal23"><span class="tag2">SIMULACRO · NO ES UNA EMERGENCIA REAL</span><h1>⚠ ${limpiarTexto(type)}</h1><p><strong>${limpiarTexto(a.nivel)} · ${limpiarTexto(a.zona)}</strong></p><p>${limpiarTexto(a.mensaje)}</p>${phone23(type)}${controls23(type)}<div class="botones"><button class="boton" data-read23>Confirmar lectura</button><button class="boton secundario" data-route23>Consultar ruta segura</button></div><p>Detener la vibración no finaliza la alerta.</p></div>`;if(!d.open)d.showModal();play23(type,true);}
function close23(){halt23();document.getElementById('alert23').close();}
function hub23(g){return `<div class="acciones2">${g.hu.map(id=>`<a class="accion2" href="#hu-${id}"><strong>${limpiarTexto(nombres[id])}</strong><span>Consultar o probar</span></a>`).join('')}</div>`}
const oldGroup23=vistaGrupo;vistaGrupo=function(g){if(g.id==='familia')return encabezado(g.nombre,g.descripcion)+hub23(g)+pie();return oldGroup23(g)+hub23(g)};
const oldHome23=panelInicio2;panelInicio2=function(){return oldHome23()+tarjeta('Entrenamiento interactivo',`<p>Practica la recepción visual, señales y orientación en un entorno ficticio.</p><button class="boton" data-start23>Iniciar simulacro</button> ${enlace('Modo entrenamiento','entrenamiento','secundario')} ${enlace('Centro háptico','hu-27','secundario')}`)};
function diag23(){return `<p><strong>Vibración:</strong> ${'vibrate' in navigator?'API disponible; prueba física necesaria':'API no disponible'}</p><p><strong>Preferencia:</strong> ${pref().habilitada?'Activada':'Desactivada'}</p><p><strong>Notificaciones del navegador:</strong> ${typeof Notification==='undefined'?'No disponibles':Notification.permission}</p><p><strong>Conexión:</strong> ${navigator.onLine?'En línea':'Sin conexión'}</p><p>El sitio no recibe alertas de un servidor ni verifica permisos del sistema operativo.</p>`}
const oldView23=vistaHU;vistaHU=function(id){let a=actual(),body='';if(id==='01')return oldView23(id)+tarjeta('Recepción multimodal',phone23(a.tipo)+controls23(a.tipo)+'<button class="boton" data-start23>Mostrar alerta prioritaria</button>');if(id==='28')return oldView23(id)+tarjeta('Señales por evento',enlace('Abrir centro háptico','hu-27'));if(id==='20'||id==='23')return oldView23(id)+tarjeta('Recorrido interactivo',map23());if(!extraNames[id])return oldView23(id);switch(id){case '02':case '27':case '06':body=`<label for="pattern23">Tipo de señal</label><select id="pattern23">${Object.keys(patterns23).map(x=>`<option>${x}</option>`).join('')}</select><div id="preview23">${phone23()}</div><button class="boton" data-test23>Probar patrón</button> <button class="boton secundario" data-stop23>Detener vibración</button><p>Patrones académicos no validados.</p>`;break;case '03':case '04':case '05':case '29':body=phone23(a.tipo)+'<button class="boton" data-start23>Simular alerta prioritaria</button>';break;case '07':case '08':case '10':body=`<div class="device23">${id==='10'?'⌚':'▣'}<strong>${id==='10'?'Reloj simulado':id==='07'?'Pantalla bloqueada simulada':'Activación visual simulada'}</strong><div id="devicepreview23">En espera</div></div><button class="boton" data-device23>Simular recepción</button><p>No activa una pantalla bloqueada ni envía avisos a un smartwatch real.</p>`;break;case '09':case '32':body=`<label><input type="checkbox" id="light23" ${datos.light23!==false?'checked':''}> Resaltar visualmente el aviso (sin destellos)</label><div class="lightpreview23 ${datos.light23!==false?'lit23':''}">⚠ Aviso de ejemplo</div>`;break;case '26':body=`<label for="duration23">Duración de pulsos (no intensidad física)</label>${seleccion('Duración','duration23',['Baja','Media','Alta'],pref().intensidad)}${phone23()}${controls23('Incendio')}<p>El navegador no controla la potencia física del motor.</p>`;break;case '33':case '34':case '35':body=diag23()+enlace('Configurar señales','hu-26')+' <button class="boton secundario" data-refresh23>Actualizar diagnóstico</button>';break;case '39':body=`<p>Panel de demostración, sin autenticación real.</p><div class="stat23"><b>${datos.avisos.filter(x=>x.estado==='Activa').length} activas</b><b>${datos.avisos.filter(x=>x.estado==='Finalizada').length} finalizadas</b></div>${enlace('Registrar emergencia','hu-40')}${enlace('Seguimiento de sectores','hu-49','secundario')}`;break;case '40':body=`<label><input id="valid23" type="checkbox"> Confirmo validación ficticia por personal responsable</label><button class="boton" data-valid23>Continuar registro</button>`;break;case '49':body=['Aulas','Laboratorio','Pasillo','Patio'].map(x=>`<div class="campo"><label>${x}<select data-sector23="${x}">${['Pendiente','En revisión','Revisado'].map(y=>`<option ${datos.sectores23?.[x]===y?'selected':''}>${y}</option>`).join('')}</select></label></div>`).join('');break;case '50':body=`<p>Comparte únicamente avisos ficticios con autorización simulada.</p>${enlace('Administrar contactos','contactos','secundario')}<label><input id="consent23" type="checkbox"> Autorizo compartir este aviso simulado</label><button class="boton" data-share23>Simular notificación</button><p id="sharestatus23" role="status"></p>`;break;}return encabezado(extraNames[id],'Funcionalidad de demostración local')+tarjeta(extraNames[id],body)+enlace('Volver al módulo',grupoPorHu(id).id,'secundario')+pie()};
function map23(){let s=Math.min(3,Math.max(0,datos.map23||0)),alt=actual().rutaBloqueada;let pts=alt?[[80,160],[80,240],[310,240],[420,240]]:[[80,160],[210,160],[210,80],[420,80]];return `<p>Posición ilustrativa · ${alt?'Ruta alternativa':'Ruta principal'}</p><svg class="map23" viewBox="0 0 500 300" role="img" aria-label="Plano ficticio, posición ${s+1} de 4"><rect x="15" y="15" width="370" height="270" fill="#fff" stroke="#789" stroke-width="5"/><g fill="#dae7ef" stroke="#789"><rect x="25" y="25" width="140" height="85"/><rect x="245" y="25" width="130" height="35"/><rect x="245" y="125" width="130" height="75"/><rect x="25" y="195" width="35" height="80"/></g><g fill="#123" font-size="14"><text x="60" y="65">Aulas</text><text x="270" y="48">Salida A</text><text x="265" y="165">Laboratorio</text><text x="270" y="270">Salida B</text></g><rect x="397" y="35" width="95" height="235" rx="8" fill="#b9e5c6"/><text x="444" y="150" text-anchor="middle" font-size="13" fill="#164b32">Zona segura</text><polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${alt?'#b85b13':'#13834c'}" stroke-width="9" stroke-dasharray="13 7" stroke-linejoin="round"/><polyline points="${pts.slice(0,s+1).map(p=>p.join(',')).join(' ')}" fill="none" stroke="#1265a5" stroke-width="9"/><circle cx="${pts[s][0]}" cy="${pts[s][1]}" r="13" fill="#1265a5" stroke="white" stroke-width="3"/></svg><p><strong>${['Inicio del recorrido','Avanza por el pasillo','Dirígete a la salida','Llegada simulada a zona segura'][s]}</strong></p><button class="boton secundario" data-map23="-1" ${s===0?'disabled':''}>Anterior</button> <button class="boton" data-map23="1" ${s===3?'disabled':''}>Siguiente</button>`}
const oldExtras23=extras2;extras2=function(id){return ['20','28'].includes(id)?'':oldExtras23(id)};
const oldShow23=mostrar;mostrar=function(){if(location.hash==='#entrenamiento'){document.getElementById('contenido').innerHTML=encabezado('Entrenamiento','Recorrido de práctica, sin emergencia real')+tarjeta('Simulacro guiado',`<progress max="4" value="${train23}"></progress><p>Etapa ${Math.min(train23+1,4)} de 4</p>${['<button class="boton" data-start23>Recibir alerta simulada</button>',enlace('Consultar plano','hu-20'),enlace('Seguir pasos','hu-21'),'<button class="boton" data-finish23>Confirmar llegada simulada</button>'][Math.min(train23,3)]}<div class="botones"><button class="boton secundario" data-train23>Avanzar etapa de práctica</button></div>`)+pie();return;}oldShow23();document.body.classList.toggle('dark23',!!datos.dark23);document.querySelectorAll('[data-bottom23]').forEach(x=>x.classList.toggle('active23',x.hash===location.hash));};
const oldExec23=ejecutar;ejecutar=function(action,e){if(action==='probar-emergencia'||action==='probar-habitual'){play23(action==='probar-emergencia'?'Incendio':'Aviso habitual');return;}if(action==='paso-siguiente'||action==='paso-anterior'){datos.paso=Math.max(0,Math.min(3,(datos.paso||0)+(action==='paso-siguiente'?1:-1)));guardar();mostrar();return;}if(action==='confirmar-envio'){let count=datos.avisos.length;oldExec23(action,e);if(datos.avisos.length>count)modal23(actual().tipo);return;}oldExec23(action,e);if(action==='finalizar-alerta')halt23();};
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;let d=b.dataset;if('start23'in d)modal23(actual().tipo);if('stop23'in d)halt23();if('play23'in d)play23(d.play23,document.getElementById('alert23').open);if('test23'in d){let type=document.getElementById('pattern23').value;document.getElementById('preview23').innerHTML=phone23(type);play23(type);}if('read23'in d){actual().leida=true;guardar();close23();train23=Math.max(train23,1);ir('hu-01');}if('route23'in d){close23();ir('hu-20');}if('map23'in d){datos.map23=Math.max(0,Math.min(3,(datos.map23||0)+Number(d.map23)));guardar();mostrar();}if('device23'in d)document.getElementById('devicepreview23').textContent='⚠ '+actual().tipo+' · Aviso visual simulado';if('refresh23'in d)mostrar();if('valid23'in d){if(document.getElementById('valid23').checked)ir('hu-41');else mensaje('Confirma la validación simulada.');}if('share23'in d)document.getElementById('sharestatus23').textContent=!document.getElementById('consent23').checked?'Se requiere autorización.':!(datos.contactos||[]).length?'Agrega un contacto ficticio primero.':'Aviso registrado como simulación; no se envió ningún mensaje.';if('train23'in d){train23=Math.min(3,train23+1);mostrar();}if('finish23'in d){mensaje('Entrenamiento finalizado de forma simulada.');train23=0;ir('inicio');}if('dark23'in d){datos.dark23=!datos.dark23;guardar();mostrar();}});
document.addEventListener('change',e=>{let x=e.target;if(x.id==='duration23'){pref().intensidad=x.value;guardar();}if(x.id==='light23'){datos.light23=x.checked;guardar();mostrar();}if(x.dataset.sector23){datos.sectores23=datos.sectores23||{};datos.sectores23[x.dataset.sector23]=x.value;guardar();}});document.addEventListener('visibilitychange',()=>{if(document.hidden)halt23()});window.addEventListener('hashchange',()=>{if(!document.getElementById('alert23').open)halt23();mostrar()});document.getElementById('alert23').addEventListener('cancel',halt23);document.getElementById('alert23').addEventListener('close',halt23);window.addEventListener('DOMContentLoaded',mostrar);if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(()=>{});


/* ===== Simulación y dispositivos ===== */
// 2.4 — interacción local, sin servicio de emergencias.
const events24=['Incendio','Sismo','Fuga de gas','Evacuación'];
const instructions24={'Incendio':'Sigue la señalización y las indicaciones de la brigada del simulacro.','Sismo':'Durante el movimiento, protégete según el protocolo del lugar. Evacúa cuando sea seguro y lo indique la brigada.','Fuga de gas':'Aléjate del sector afectado según las indicaciones del personal autorizado.','Evacuación':'Sigue la salida señalizada hacia el punto de reunión ficticio.'};
const icons24={'Incendio':'♨','Sismo':'≋','Fuga de gas':'≋','Evacuación':'↗','Fin de emergencia':'✓','Aviso habitual':'●'};
const prefs24=()=>datos.ui24||(datos.ui24={motion:true,pict:true,simple:false,font:18});
let quiz24=0,quizFeedback24='',training24=null;
function sim24(){return `<div class="grid24">${events24.map(t=>`<article class="tile24"><span class="icon24" aria-hidden="true">${icons24[t]}</span><h3>${t}</h3><p>${instructions24[t]}</p><button class="boton" data-sim24="${t}">Iniciar simulacro</button></article>`).join('')}</div>`;}
function start24(t){halt23();datos.avisos.forEach(a=>{if(a.estado==='Activa')a.estado='Finalizada'});datos.avisos.unshift({id:Date.now(),tipo:t,zona:'Edificio B, planta baja',nivel:'Crítica',mensaje:instructions24[t],emisor:'Brigada de demostración',fecha:new Date().toISOString(),estado:'Activa',clase:'Simulacro',leida:false,rutaBloqueada:false});datos.paso=0;datos.map23=0;datos.llegada24=false;training24={type:t,read:false,arrival:false};guardar();mostrar();modal23(t);}
function settings24(){let p=prefs24();return `<div class="grid24"><div class="tile24"><h3>Preferencias</h3>${[['motion','Animación visual'],['pict','Pictogramas adicionales'],['simple','Lectura simplificada']].map(([k,l])=>`<label class="check24"><input type="checkbox" data-pref24="${k}" ${p[k]?'checked':''}> ${l}</label>`).join('')}<label class="check24"><input type="checkbox" id="vib24" ${pref().habilitada?'checked':''}> Vibración física de apoyo</label><label for="font24">Tamaño de texto: <output id="size24">${p.font}</output> px</label><input id="font24" type="range" min="16" max="28" step="2" value="${p.font}"><div class="botones">${boton('Cambiar contraste','alternar-contraste')}<button class="boton secundario" data-dark23>Modo oscuro</button></div></div><div class="tile24"><h3>Vista previa</h3><div class="preview24"><strong>⚠ Alerta de simulacro</strong><p>Consulta las instrucciones.</p></div><p>Los avisos esenciales siempre incluyen texto. Sin destellos rápidos.</p>${enlace('Probar patrones','hu-27')}</div></div>`;}
const quizTypes24=['Sismo','Incendio','Evacuación','Fin de emergencia','Fuga de gas'];
function quizPanel24(){let t=quizTypes24[quiz24%quizTypes24.length],seq=patterns23[t];return `<p>Ejercicio ${quiz24%5+1} de 5 · patrones académicos.</p><div class="wave24" aria-label="${seq.map((n,i)=>`${i%2?'pausa':'pulso'} ${n} milisegundos`).join(', ')}">${seq.map((n,i)=>`<i style="flex:${n};height:${i%2?4:35}px"></i>`).join('')}</div><button class="boton" data-quizplay24>Reproducir señal</button> <button class="boton secundario" data-stop23>Detener vibración</button><p data-status23 role="status"></p><h3>¿Qué señal representa?</h3><div class="botones">${quizTypes24.map(x=>`<button class="boton secundario" data-answer24="${x}">${x}</button>`).join('')}</div><p id="feedback24" role="status">${quizFeedback24}</p><button class="boton" data-nextquiz24>Siguiente ejercicio</button><p>Consulta la guía si aún no conoces las señales. ${enlace('Guía de señales','hu-28','secundario')}</p>`;}
function illustration24(s){const drawings=[`<rect x="75" y="24" width="90" height="132" rx="14" fill="#fff" stroke="currentColor" stroke-width="5"/><path d="M120 48l-25 44h50z" fill="#f4c35b" stroke="currentColor" stroke-width="3"/><text x="120" y="83" text-anchor="middle" font-size="24">!</text><path d="M99 112h42m-42 12h42" stroke="currentColor" stroke-width="5"/>`,`<rect x="25" y="30" width="190" height="120" rx="10" fill="#e5f3eb" stroke="currentColor" stroke-width="3"/><path d="M50 125h65V65h65" fill="none" stroke="#15764a" stroke-width="12" stroke-linejoin="round"/><path d="M165 52l20 13-20 13" fill="none" stroke="#15764a" stroke-width="8"/><circle cx="50" cy="125" r="12" fill="#176db0"/>`,`<path d="M180 25h42v125h-42" fill="#c8e9d6" stroke="currentColor" stroke-width="4"/><circle cx="80" cy="47" r="16" fill="currentColor"/><path d="M80 65l22 43 32 25m-54-68-30 34m52 9-32 37m22-67 37-8" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/><path d="M143 45h30m-12-12 12 12-12 12" stroke="#15764a" stroke-width="6" fill="none"/>`,`<rect x="20" y="20" width="200" height="140" rx="15" fill="#d9f2e3" stroke="#15764a" stroke-width="4"/><g fill="#176746"><circle cx="75" cy="65" r="15"/><circle cx="120" cy="58" r="15"/><circle cx="165" cy="65" r="15"/><path d="M52 120q0-45 23-45t23 45M97 120q0-48 23-48t23 48M142 120q0-45 23-45t23 45"/></g><path d="M105 139l10 8 20-20" fill="none" stroke="#176746" stroke-width="6"/>`];return `<svg class="illustration24" viewBox="0 0 240 180" role="img" aria-label="Ilustración del paso ${s+1}">${drawings[s]}</svg>`;}
const oldSteps24=panelPasosEvacuacion;panelPasosEvacuacion=function(){let s=Math.max(0,Math.min(3,datos.paso||0));return `<div class="stepart24">${illustration24(s)}<div><strong>${['Identifica la alerta','Ubica la ruta','Sigue la señalización','Punto de reunión'][s]}</strong><p>Etapa ${s+1} de 4 · representación ficticia</p>${s===3?'<button class="boton" data-arrive24>Confirmar llegada simulada</button>':''}<p role="status">${datos.llegada24?'Llegada simulada registrada.':''}</p></div></div>`+oldSteps24();};
const oldHome24=panelInicio2;panelInicio2=function(){return oldHome24()+tarjeta('Centro de simulación',sim24())+tarjeta('Tu experiencia',enlace('Personalizar accesibilidad','accesibilidad')+' '+enlace('Practicar señales','aprendizaje','secundario')+' '+enlace('Tutorial de bienvenida','tutorial','secundario'));};
const oldGroup24=vistaGrupo;vistaGrupo=function(g){return oldGroup24(g)+(g.id==='configuracion'?tarjeta('Personalización',settings24()):g.id==='gestion'?tarjeta('Centro de operaciones',ops24()):'');};
function ops24(){let a=datos.avisos,sects=['Aulas','Laboratorio','Pasillo','Patio'],done=sects.filter(s=>datos.sectores23?.[s]==='Revisado').length;return `<div class="grid24">${[['Alertas activas',a.filter(x=>x.estado==='Activa').length],['Lecturas registradas',a.filter(x=>x.leida).length],['Sectores revisados',done+'/4']].map(([l,n])=>`<div class="tile24"><small>${l}</small><h2>${n}</h2></div>`).join('')}</div><p>Datos locales de demostración, no usuarios conectados.</p>${sects.map(s=>`<div class="sector24"><strong>${s}</strong><span>${datos.sectores23?.[s]||'Pendiente'}</span></div>`).join('')}${enlace('Actualizar sectores','hu-49')} ${enlace('Registrar emergencia','hu-40','secundario')}`;}
const oldView24=vistaHU;vistaHU=function(id){let h=oldView24(id);if(id==='39')h+=tarjeta('Centro de operaciones',ops24());if(id==='27'||id==='28')h+=tarjeta('Aprendizaje interactivo',enlace('Practicar reconocimiento','aprendizaje'));if(id==='50')h+=tarjeta('Seguimiento familiar',`<p>Estado del aviso: <strong>${limpiarTexto(actual().estado)}</strong></p><p>Llegada: ${datos.llegada24?'Confirmada en la simulación':'Sin confirmar'}</p><p>Solo visible en este navegador; no se transmite a terceros.</p>`);if(id==='36')h+=tarjeta('Línea de tiempo',datos.avisos.map(a=>`<article class="timeline24"><strong>${limpiarTexto(a.tipo)} · ${limpiarTexto(a.estado)}</strong><p>${fecha(a.fecha)} · ${limpiarTexto(a.zona)}</p></article>`).join(''));if(id==='20'||id==='23')h+=tarjeta('Confirmación de llegada',`<p>Completa las etapas del plano antes de confirmar.</p><button class="boton" data-arrive24 ${(datos.map23||0)!==3?'disabled':''}>Confirmar llegada simulada</button><p>${datos.llegada24?'Llegada registrada.':''}</p>`);if(id==='07'||id==='08'||id==='10')h+=tarjeta('Dispositivo de demostración',`<div class="${id==='10'?'watch24':'lock24'}"><span>10:35</span>${phone23(actual().tipo)}</div>${controls23(actual().tipo)}<p>Representación visual, no conexión con el dispositivo real.</p>`);return h;};
let tutorial24=0;const tutorialSteps24=[['Recibe avisos','Texto, símbolos y vibración compatible.'],['Consulta el plano','Identifica la ruta ficticia y sigue las etapas.'],['Personaliza','Ajusta lectura, contraste y señales.']];
const oldShow24=mostrar;mostrar=function(){let r=location.hash.slice(1),c=document.getElementById('contenido');let pages={simulacion:()=>encabezado('Centro de simulación','Elige una situación ficticia.')+sim24()+tarjeta('Recursos educativos',recursosEducativos()),accesibilidad:()=>encabezado('Centro de accesibilidad','Personaliza tu experiencia.')+settings24(),aprendizaje:()=>encabezado('Aprende las señales','Reconoce patrones visuales y hápticos.')+tarjeta('Ejercicio de reconocimiento',quizPanel24()),tutorial:()=>encabezado('Bienvenida a HapAlert','Tutorial de demostración')+tarjeta(tutorialSteps24[tutorial24][0],`<p>${tutorialSteps24[tutorial24][1]}</p><progress max="3" value="${tutorial24+1}"></progress><button class="boton" data-tutorial24>${tutorial24===2?'Terminar':'Siguiente'}</button>`)};if(pages[r]){c.innerHTML=pages[r]()+pie();c.focus();window.scrollTo(0,0);}else oldShow24();let p=prefs24();document.body.classList.toggle('no-motion24',!p.motion);document.body.classList.toggle('no-pict24',!p.pict);document.body.classList.toggle('simple24',p.simple);document.documentElement.style.setProperty('--font24',p.font+'px');document.body.classList.toggle('dark23',!!datos.dark23);};
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;let d=b.dataset;if(d.sim24)start24(d.sim24);if('quizplay24'in d)play23(quizTypes24[quiz24%5]);if(d.answer24){let correct=quizTypes24[quiz24%5];quizFeedback24=d.answer24===correct?'Correcto: '+correct:'La señal propuesta corresponde a '+correct+'.';document.getElementById('feedback24').textContent=quizFeedback24;}if('nextquiz24'in d){halt23();quiz24=(quiz24+1)%5;quizFeedback24='';mostrar();}if('arrive24'in d){datos.llegada24=true;if(training24)training24.arrival=true;guardar();mostrar();mensaje('Llegada ficticia registrada. La alerta no ha finalizado.');}if('tutorial24'in d){if(tutorial24===2){tutorial24=0;ir('inicio')}else{tutorial24++;mostrar();}}});
document.addEventListener('change',e=>{let x=e.target;if(x.dataset.pref24){prefs24()[x.dataset.pref24]=x.checked;if(!prefs24().motion)halt23();guardar();mostrar();}if(x.id==='vib24'){pref().habilitada=x.checked;if(!x.checked)halt23();guardar();}if(x.id==='font24'){prefs24().font=Number(x.value);guardar();}});document.addEventListener('input',e=>{if(e.target.id==='font24'){document.documentElement.style.setProperty('--font24',e.target.value+'px');document.getElementById('size24').textContent=e.target.value;}});
window.addEventListener('DOMContentLoaded',mostrar);

