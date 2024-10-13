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
