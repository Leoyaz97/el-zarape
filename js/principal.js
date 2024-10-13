/*---------- ---------- ---------- ---------- MODULO ALIMENTOS ---------- ---------- ---------- ----------*/
let cm = null; //Crrent Module
async function cargarmoduloAlimentos()
{
    // Definimos la URL donde esta el conetnido HTML del modulo:
    let url = 'modulos/alimentos/accion_alimento.html';

    // Hacemos la peticion del documento del modulo:
    let resp = await fetch(url);

    // Convertimos la respuesta del servidor en text HTML:
    let contenido = await resp.text();

    // Insertamos el codigo HTML dentro del contenedor principal:
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    import('./modulos/alimento.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}

/*---------- ---------- ---------- ---------- MODULO BEBIDAS ---------- ---------- ---------- ----------*/
async function cargarmoduloBebidas(){
    // Definimos la URL donde esta el conetnido HTML del modulo:
    let url = 'modulos/Bebidas/accion_bebida.html';

    // Hacemos la peticion del documento del modulo:
    let resp = await fetch(url);

    // Convertimos la respuesta del servidor en text HTML:
    let contenido = await resp.text();

    // Insertamos el codigo HTML dentro del contenedor principal:
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    import('./modulos/bebida.js').then(obj => {
        bm = obj;
        bm.inicializarModulo();
    });
}


/*---------- ---------- ---------- ---------- MODULO Combos ---------- ---------- ---------- ----------*/
async function cargarmoduloCombos() {
    // Definimos la URL donde esta el contenido HTML del modulo:
    let url = 'modulos/Combos/accion_combo.html';
    // Hacemos la petición del documento del modulo:
    let resp = await fetch(url);
    // Convertimos la respuesta del servidor en texto HTML:
    let contenido = await resp.text();
    // Insertamos el código HTML dentro del contenedor principal:
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    import('./modulos/combo.js').then(obj => {
        cc = obj;
        cc.inicializarModulo();
    });
}



/*---------- ---------- ---------- ---------- MODULO Empleado ---------- ---------- ---------- ----------*/
async function cargarmoduloEmpleado(){
    let url = 'modulos/Empleados/accion_empleado.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    import('./modulos/empleado.js').then(obj => {
        em = obj;
        em.inicializarModulo();
    });
}


/*---------- ---------- ---------- ---------- MODULO SUCURSALES ---------- ---------- ---------- ----------*/
async function cargarmoduloSucursales()
{
    // Definimos la URL donde esta el conetnido HTML del modulo:
    let url = 'modulos/Sucursales/accion_sucursal.html';

    // Hacemos la peticion del documento del modulo:
    let resp = await fetch(url);

    // Convertimos la respuesta del servidor en text HTML:
    let contenido = await resp.text();

    // Insertamos el codigo HTML dentro del contenedor principal:
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    import('./modulos/sucursal.js').then(obj => {
        sm = obj;
        sm.inicializarModulo();
    });
}