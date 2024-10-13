// Definimos un arreglo JSON de sucursales de forma global con nuevos campos
let sucursales = [
    {
        id: 1,
        nombre: "Sucursal UTL (Universidad Tecnologia de Leon)",
        direccion: "Av. Principal #123",
        telefono: "555-1234",
        latitud: "12.345678",
        longitud: "-98.765432",
        foto: "url_de_foto.jpg",
        url: "http://www.example.com",
        horarios: "Lun-Vie: 9am-6pm"
    },
    {
        id: 2,
        nombre: "Sucursal TEC (Tecnológico de Monterrey)",
        direccion: "Calle Ejemplo #456",
        telefono: "555-5678",
        latitud: "13.456789",
        longitud: "-97.654321",
        foto: "url_de_foto2.jpg",
        url: "http://www.tecnologico.com",
        horarios: "Lun-Vie: 8am-5pm,"
    },
    {
        id: 3,
        nombre: "Sucursal UAM (Universidad Autónoma de México)",
        direccion: "Av. Universidad #789",
        telefono: "555-8765",
        latitud: "14.567890",
        longitud: "-96.543210",
        foto: "url_de_foto3.jpg",
        url: "http://www.uam.com",
        horarios: "Lun-Vie: 10am-7pm"
    }
    
    
    // Agrega más sucursales aquí con los nuevos campos
];

// Inicializa el módulo de sucursales
export function inicializarModulo() {
    setDetalleSucursalVisible(false);
    llenarTablaSucursales();
}

// Guarda o actualiza una sucursal
export function guardar() {
    let posTemp = -1;
    let sucursal = {
        id: 0,
        nombre: document.getElementById("txtNombreSucursal").value,
        direccion: document.getElementById("txtDireccionSucursal").value,
        telefono: document.getElementById("txtTelefonoSucursal").value,
        latitud: document.getElementById("txtGPSLatitud").value,
        longitud: document.getElementById("txtGPSLongitud").value,
        foto: document.getElementById("txtFotoSucursal").value,
        url: document.getElementById("txtURL").value,
        horarios: document.getElementById("txtHorarios").value
    };

    posTemp = buscarPosicionSucursalPorID(parseInt(document.getElementById("txtIdSucursal").value));
    if (posTemp >= 0) {
        sucursal.id = parseInt(document.getElementById("txtIdSucursal").value);
        sucursales[posTemp] = sucursal;
    } else {
        sucursal.id = generarIDSucursal();
        sucursales.push(sucursal);
        document.getElementById("txtIdSucursal").value = sucursal.id;
    }

    llenarTablaSucursales();
    Swal.fire('Movimiento realizado.', 'Datos de sucursal guardados.', 'success');
}

// Elimina una sucursal
export function eliminar() {
    let idSucursal = parseInt(document.getElementById("txtIdSucursal").value);
    let pos = buscarPosicionSucursalPorID(idSucursal);

    if (pos < 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }

    sucursales.splice(pos, 1);
    llenarTablaSucursales();
    limpiar();
    Swal.fire('Movimiento realizado.', 'Sucursal eliminada.', 'success');
}

// Limpia los campos del formulario de sucursales
export function limpiar() {
    document.getElementById("txtIdSucursal").value = '';
    document.getElementById("txtNombreSucursal").value = '';
    document.getElementById("txtDireccionSucursal").value = '';
    document.getElementById("txtTelefonoSucursal").value = '';
    document.getElementById("txtGPSLatitud").value = '';
    document.getElementById("txtGPSLongitud").value = '';
    document.getElementById("txtFotoSucursal").value = '';
    document.getElementById("txtURL").value = '';
    document.getElementById("txtHorarios").value = '';
}

// Muestra el detalle de una sucursal en el formulario
export function mostrarDetalleSucursal(idSucursal) {
    let sucursal = null;
    let pos = buscarPosicionSucursalPorID(idSucursal);

    if (pos < 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }

    limpiar();
    sucursal = sucursales[pos];
    document.getElementById("txtIdSucursal").value = sucursal.id;
    document.getElementById("txtNombreSucursal").value = sucursal.nombre;
    document.getElementById("txtDireccionSucursal").value = sucursal.direccion;
    document.getElementById("txtTelefonoSucursal").value = sucursal.telefono;
    document.getElementById("txtGPSLatitud").value = sucursal.latitud;
    document.getElementById("txtGPSLongitud").value = sucursal.longitud;
    document.getElementById("txtFotoSucursal").value = sucursal.foto;
    document.getElementById("txtURL").value = sucursal.url;
    document.getElementById("txtHorarios").value = sucursal.horarios;
    setDetalleSucursalVisible(true);
}

// Muestra el formulario para agregar una nueva sucursal
export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleSucursalVisible(true);
}

// Llena la tabla de sucursales con los datos disponibles
export function llenarTablaSucursales() {
    let contenido = '';

    for (let i = 0; i < sucursales.length; i++) {
        contenido += '<tr>' +
            '<td>' + sucursales[i].nombre + '</td>' +
            '<td>' + sucursales[i].direccion + '</td>' +
            '<td>' + sucursales[i].telefono + '</td>' +
            '<td> <button class="btn btn-outline-danger" onclick="sm.mostrarDetalleSucursal(' + sucursales[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>';
    }

    document.getElementById("tbodySucursales").innerHTML = contenido;
}

// Busca la posición de una sucursal por ID
function buscarPosicionSucursalPorID(idSucursal) {
    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].id === idSucursal)
            return i;
    }
    return -1;
}

// Genera un nuevo ID de sucursal
function generarIDSucursal() {
    let ultimoID = 0;

    if (sucursales.length > 0) {
        ultimoID = sucursales[0].id;
        for (let i = 0; i < sucursales.length; i++) {
            if (sucursales[i].id > ultimoID)
                ultimoID = sucursales[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

// Controla la visibilidad del detalle de sucursal
export function setDetalleSucursalVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoSucursales').style.display = 'none';
        document.getElementById('divDetalleSucursal').style.display = '';
    } else {
        document.getElementById('divDetalleSucursal').style.display = 'none';
        document.getElementById('divCatalogoSucursales').style.display = '';
    }
}

// Función para buscar sucursal por nombre y mostrar solo esa en la tabla
export function buscarSucursalPorNombre() {
    let nombreSucursal = document.getElementById('inputBuscarSucursal').value.toLowerCase();
    let sucursalesEncontradas = [];

    for (let i = 0; i < sucursales.length; i++) {
        let nombres = sucursales[i].nombre.toLowerCase().split(' ');

        for (let j = 0; j < nombres.length; j++) {
            if (nombres[j].includes(nombreSucursal)) {
                sucursalesEncontradas.push(sucursales[i]);
                break;
            }
        }
    }

    if (sucursalesEncontradas.length === 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }

    let contenido = '';
    for (let i = 0; i < sucursalesEncontradas.length; i++) {
        contenido += '<tr>' +
            '<td>' + sucursalesEncontradas[i].nombre + '</td>' +
            '<td>' + sucursalesEncontradas[i].direccion + '</td>' +
            '<td>' + sucursalesEncontradas[i].telefono + '</td>' +
            '<td> <button class="btn btn-outline-danger" onclick="sm.mostrarDetalleSucursal(' + sucursalesEncontradas[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>';
    }

    document.getElementById("tbodySucursales").innerHTML = contenido;
}
