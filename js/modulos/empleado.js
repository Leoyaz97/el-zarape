// Definimos un arreglo JSON de empleados de forma global
let empleados = [
    {
        id: 1,
        nombre: "Leonardo Daniel Castañon Alvarado",
        contraseña: generarContraseñaAleatoria(12),
        direccion: "Blvd Galena 710",
        telefono: "479-203-1948"
    },
    {
        id: 2,
        nombre: "Stefania Martinez Pro",
        contraseña: generarContraseñaAleatoria(12),
        direccion: "Calle Falsa 123",
        telefono: "479-146-7948"
    },
    {
        id: 3,
        nombre: "Dalia Abigahi Cortes Medina",
        contraseña: generarContraseñaAleatoria(12),
        direccion: "Boulevard de los Sueños Rotos 456",
        telefono: "1112223334"
    },
    {
        id: 4,
        nombre: "Jimena Anahi Gomez Ramirez",
        contraseña: generarContraseñaAleatoria(12),
        direccion: "Calle del Olvido 789",
        telefono: "5556667778"
    },
    {
        id: 5,
        nombre: "David Alejandro Moreno Silva",
        contraseña: generarContraseñaAleatoria(12),
        direccion: "Av. Libertad 1011",
        telefono: "9998887776"
    }
];

// Inicializa el módulo de empleados
export function inicializarModulo() {
    setDetalleEmpleadoVisible(false);
    llenarTablaEmpleados();
}

// Guarda o actualiza un empleado
export function guardar() {
    let posTemp = -1;
    let empleado = new Object();

    empleado.id = 0;
    empleado.nombre = document.getElementById("txtNombreUsuario").value;
    empleado.contraseña = document.getElementById("txtContraseñaUsuario").value;
    empleado.direccion = document.getElementById("txtDireccionUsuario").value;
    empleado.telefono = document.getElementById("txtTelefonoUsuario").value;

    posTemp = buscarPosicionEmpleadoPorID(parseInt(document.getElementById("txtIdEmpleado").value));
    if (posTemp >= 0) {
        empleado.id = parseInt(document.getElementById("txtIdEmpleado").value);
        empleados[posTemp] = empleado;
    } else {
        empleado.id = generarIDEmpleado();
        empleado.contraseña = generarContraseñaAleatoria(12);
        empleados.push(empleado);
        document.getElementById("txtIdEmpleado").value = empleado.id;
    }

    llenarTablaEmpleados();
    Swal.fire('Movimiento realizado.', 'Datos de empleado guardados.', 'success');
}

// Elimina un empleado
export function eliminar() {
    let idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);
    let pos = buscarPosicionEmpleadoPorID(idEmpleado);

    if (pos < 0) {
        Swal.fire('', 'Empleado no encontrado.', 'warning');
        return;
    }

    empleados.splice(pos, 1);
    llenarTablaEmpleados();
    limpiar();
    Swal.fire('Movimiento realizado.', 'Empleado eliminado.', 'success');
}

// Limpia los campos del formulario de empleados
export function limpiar() {
    document.getElementById("txtIdEmpleado").value = '';
    document.getElementById("txtNombreUsuario").value = '';
    document.getElementById("txtContraseñaUsuario").value = '';
    document.getElementById("txtDireccionUsuario").value = '';
    document.getElementById("txtTelefonoUsuario").value = '';
}

// Muestra el detalle de un empleado en el formulario
export function mostrarDetalleEmpleado(idEmpleado) {
    let empleado = null;
    let pos = buscarPosicionEmpleadoPorID(idEmpleado);

    if (pos < 0) {
        Swal.fire('', 'Empleado no encontrado.', 'warning');
        return;
    }

    limpiar();
    empleado = empleados[pos];
    document.getElementById("txtIdEmpleado").value = empleado.id;
    document.getElementById("txtNombreUsuario").value = empleado.nombre;
    document.getElementById("txtContraseñaUsuario").value = empleado.contraseña;
    document.getElementById("txtDireccionUsuario").value = empleado.direccion;
    document.getElementById("txtTelefonoUsuario").value = empleado.telefono;

    setDetalleEmpleadoVisible(true);
}

// Función para mostrar el formulario de un nuevo empleado
export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleEmpleadoVisible(true);
    document.getElementById("txtNombreUsuario").focus();
}

// Llena la tabla de empleados con los datos del arreglo empleados
export function llenarTablaEmpleados() {
    let tbody = document.getElementById("tbodyEmpleados");
    tbody.innerHTML = '';

    for (let i = 0; i < empleados.length; i++) {
        let fila = tbody.insertRow();

        fila.innerHTML = `
            <td>${empleados[i].id}</td>
            <td>${empleados[i].nombre}</td>
            <td>${empleados[i].telefono}</td>
            <td>
                <button class="btn btn-outline-danger" onclick="em.mostrarDetalleEmpleado(${empleados[i].id});">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </td>
        `;
    }
}

// Oculta o muestra el detalle del empleado
export function setDetalleEmpleadoVisible(valor) {
    document.getElementById("divDetalleEmpleado").style.display = (valor ? 'block' : 'none');
    document.getElementById("divCatalogoEmpleado").style.display = (valor ? 'none' : 'block');
}

// Genera un ID único para un nuevo empleado
export function generarIDEmpleado() {
    let maxID = 0;
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].id > maxID) {
            maxID = empleados[i].id;
        }
    }
    return maxID + 1;
}

// Busca la posición de un empleado en el arreglo por su ID
export function buscarPosicionEmpleadoPorID(idEmpleado) {
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].id === idEmpleado) {
            return i;
        }
    }
    return -1;
}

// Busca empleados por nombre
export function buscarEmpleadoPorNombre() {
    let inputBuscar = document.getElementById("inputBuscarEmpleado").value.toLowerCase();
    let tbody = document.getElementById("tbodyEmpleados");
    tbody.innerHTML = '';

    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].nombre.toLowerCase().includes(inputBuscar)) {
            let fila = tbody.insertRow();

            fila.innerHTML = `
                <td>${empleados[i].id}</td>
                <td>${empleados[i].nombre}</td>
                <td>${empleados[i].telefono}</td>
                <td>
                    <button class="btn btn-outline-danger" onclick="em.mostrarDetalleEmpleado(${empleados[i].id});">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </td>
            `;
        }
    }
}

// Genera una contraseña aleatoria para un nuevo empleado
export function generarContraseñaAleatoria(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let contraseña = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        contraseña += charset[randomIndex];
    }
    return contraseña;
}

