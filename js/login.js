/*---------------------------------------- Funcionalidades de Login ----------------------------------------*/
// Lista de usuarios y contraseñas
const usuarios = [
    { nombre: 'leo', contrasena: '1234' },
    { nombre: 'pro', contrasena: '1234' },
    { nombre: 'dal', contrasena: '1234' },
    { nombre: 'jim', contrasena: '1234' },
    { nombre: 'dav', contrasena: '1234' }
    
];

function validarUsuario() {
    var usuario = document.getElementById('txtUsuario').value;
    var contrasena = document.getElementById('txtpass').value;

    // Validar usuario y contraseña
    const usuarioValido = usuarios.find(u => u.nombre === usuario && u.contrasena === contrasena);

    if (usuarioValido) {
        Swal.fire({
            icon: "success",
            title: "Validado",
            text: "Bienvenido usuario"            
        });
        
        window.location.replace("principal.html");

    } else {
        Swal.fire({
            icon: "error",
            title: "Acceso denegado",
            text: "Usuario y/o contraseña incorrectos, vuelve a intentarlo",
});
    }
}

/*---------------------------------------- Funcionalidades de Alimenos ----------------------------------------*/
let cm = null; //Crrent Module
async function cargarmoduloAlimentos()
{
    // Definimos la URL donde esta el conetnido HTML del modulo:
    let url = 'modulos/alimento.html';

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


/*Funcionalidad para mostrar y ocultar la tabla de registro*/
document.addEventListener('DOMContentLoaded', function () {
    var collapseElement = document.getElementById('catalogoAlimentos');
    var toggleButton = document.querySelector('button[data-toggle="collapse"]');

    collapseElement.addEventListener('show.bs.collapse', function () {
        toggleButton.textContent = 'Ocultar Catálogo de Alimentos';
    });

    collapseElement.addEventListener('hide.bs.collapse', function () {
        toggleButton.textContent = 'Mostrar Catálogo de Alimentos';
    });
});