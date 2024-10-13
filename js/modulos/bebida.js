// Definimos un arreglo JSON de Categorias:
let categoriasBebida = [
    {
        id: 1,
        nombre: "Refresco"
    },
    {
        id: 2,
        nombre: "Jugo"
    },
    {
        id: 3,
        nombre: "Cerveza"
    },
    {
        id: 4,
        nombre: "Vino"
    },
    {
        id: 5,
        nombre: "Agua"
    }
];

// Definimos un arreglo JSON de bebidas de forma global
let bebidas = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Coca Cola",
            descripcion: "Bebida gaseosa sabor cola.",
            foto: "",
            precio: 20.00,
            categoria: {
                id: 1,
                nombre: "Refresco"
            }
        }
    },
    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Jugo de Naranja",
            descripcion: "Jugo natural de naranja.",
            foto: "",
            precio: 25.00,
            categoria: {
                id: 2,
                nombre: "Jugo"
            }
        }
    },
    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Cerveza Corona",
            descripcion: "Cerveza clara mexicana.",
            foto: "",
            precio: 30.00,
            categoria: {
                id: 3,
                nombre: "Cerveza"
            }
        }
    },
    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Vino Tinto",
            descripcion: "Vino tinto seco de origen español.",
            foto: "",
            precio: 50.00,
            categoria: {
                id: 4,
                nombre: "Vino"
            }
        }
    },
    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Agua Mineral",
            descripcion: "Agua con gas embotellada.",
            foto: "",
            precio: 12.00,
            categoria: {
                id: 5,
                nombre: "Agua"
            }
        }
    }
];


export function inicializarModulo() {
    setDetalleBebidaVisible(false);
    llenarComboBoxCategoriasBebidas();
    llenarTablaBebidas();
}

export function guardar() {
    let posTemp = -1;
    
    let catTemp = null;

    let b = new Object();

    b.id = 0;
    b.producto = new Object();
    b.producto.id = 0;
    b.producto.nombre = document.getElementById("txtBebida").value;
    b.producto.descripcion = document.getElementById("txtDescripcionBebida").value;
    b.producto.precio = parseFloat(document.getElementById("txtPrecioBebida").value);
    catTemp = buscarCategoriaBebidaPorID(parseInt(document.getElementById("cmbCategoriaBebida").value));
    b.producto.categoria = catTemp;

    posTemp = buscarPosicionBebidaPorID(parseInt(document.getElementById("txtBebidaId").value));
    if (posTemp >= 0) {
        
        b.id = parseInt(document.getElementById("txtBebidaId").value);
        bebidas[posTemp] = b;

    } else {
        b.id = generarIDBebida();
        bebidas.push(b);
        document.getElementById("txtBebidaId").value = b.id;
    }

    llenarTablaBebidas();
    Swal.fire('Movimiento realizado.', 'Datos de bebida guardados.', 'success');
}

export function eliminar() {
    let idBebida = parseInt(document.getElementById("txtBebidaId").value);
    let pos = buscarPosicionBebidaPorID(idBebida);

    if (pos < 0) {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    bebidas.splice(pos, 1);
    llenarTablaBebidas();
    limpiar();
    Swal.fire('Movimiento realizado.', 'Bebida eliminada.', 'success');
}

export function limpiar() {
    document.getElementById("txtBebidaId").value = '';
    document.getElementById("txtBebida").value = '';
    document.getElementById("txtDescripcionBebida").value = ''
    document.getElementById("txtPrecioBebida").value = ''
    document.getElementById("cmbCategoriaBebida").value = 1;
}

export function mostrarDetalleBebida(idBebida) {
    let bebida = null;
    let pos = buscarPosicionBebidaPorID(idBebida);

    if (pos < 0) {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    limpiar();
    bebida = bebidas[pos];
    document.getElementById("txtBebidaId").value = bebida.id;
    document.getElementById("txtBebida").value = bebida.producto.nombre;
    document.getElementById("txtDescripcionBebida").value = bebida.producto.descripcion;
    document.getElementById("txtPrecioBebida").value = bebida.producto.precio;
    document.getElementById("cmbCategoriaBebida").value = bebida.producto.categoria.id;
    setDetalleBebidaVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleBebidaVisible(true);
}

function llenarTablaBebidas() {
    let contenido = '';

    for (let i = 0; i < bebidas.length; i++) {
        contenido += '<tr>' +
            '<td>' + bebidas[i].producto.nombre + '</td>' +
            '<td>' + bebidas[i].producto.categoria.nombre + '</td>' +
            '<td>' + bebidas[i].producto.precio + '</td>' +
            '<td> <button class="btn btn-outline-danger" onclick="bm.mostrarDetalleBebida(' + bebidas[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>'
    }

    document.getElementById("tbodyBebidas").innerHTML = contenido;
}

function llenarComboBoxCategoriasBebidas() {
    let contenido = '';

    for (let i = 0; i < categoriasBebida.length; i++) {
        contenido += '<option value="' + categoriasBebida[i].id + '">' +
            categoriasBebida[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoriaBebida').innerHTML = contenido;
}

function buscarPosicionBebidaPorID(idBebida) {
    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].id === idBebida)
            return i;
    }
    return -1;
}

export function setDetalleBebidaVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoBebidas').style.display = 'none';
        document.getElementById('divDetalleBebida').style.display = '';
    } else {
        document.getElementById('divDetalleBebida').style.display = 'none';
        document.getElementById('divCatalogoBebidas').style.display = '';
    }
}

function generarIDBebida() {
    let ultimoID = 0;

    if (bebidas.length > 0) {
        ultimoID = bebidas[0].id;
        for (let i = 0; i < bebidas.length; i++) {
            if (bebidas[i].id > ultimoID)
                ultimoID = bebidas[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function buscarCategoriaBebidaPorID(idCategoria) {
    for (let i = 0; i < categoriasBebida.length; i++) {
        if (categoriasBebida[i].id == idCategoria)
            return categoriasBebida[i];
    }
    return null;
}

/* __________ __________ Funcionalidad de busueda por NOMBRE __________ _________*/
// Función para buscar bebida por nombre y mostrar solo esa en la tabla
export function buscarBebidaPorNombre() {
    let nombreBebida = document.getElementById('inputBuscarBebida').value.toLowerCase();
    let bebidasEncontradas = [];

    // Buscar bebidas que coincidan con el nombre
    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].producto.nombre.toLowerCase().includes(nombreBebida)) {
            bebidasEncontradas.push(bebidas[i]);
        }
    }

    if (bebidasEncontradas.length === 0) {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    // Generar el contenido HTML para las bebidas encontradas
    let contenido = '';
    for (let i = 0; i < bebidasEncontradas.length; i++) {
        contenido += '<tr>' +
            '<td>' + bebidasEncontradas[i].producto.nombre + '</td>' +
            '<td>' + bebidasEncontradas[i].producto.categoria.nombre + '</td>' +
            '<td>' + bebidasEncontradas[i].producto.precio + '</td>' +
            '<td> <button class="btn btn-outline-danger" onclick="bm.mostrarDetalleBebida(' + bebidas[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>'
    }

    // Insertar el contenido HTML generado dentro del cuerpo de la tabla:
    document.getElementById("tbodyBebidas").innerHTML = contenido;
}








