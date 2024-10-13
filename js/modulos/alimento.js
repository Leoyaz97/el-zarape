//Definimos un arreglo JSON de Categorias:
let categorias = [
    {
        id: 1,
        nombre: "Platillo"
    },
    {
        id: 2,
        nombre: "Torta"
    },
    {
        id: 3,
        nombre: "Ensalada"
    },
    {
        id: 4,
        nombre: "Postre"
    },
    {
        id: 5,
        nombre: "Fruta"
    }
];

//Definimos un areglo JSON de alimentos de forma global
let alimentos = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Filete a la Mostaza",
            descripcion: "Suave filete de res bañado en una salsa cremosa de mostaza y acompañado de papas gratinadas.",
            foto: "",
            precio: 180.00,
            categoria: {
                id: 1,
                nombre: "Platillo"
            }
        }
    },

    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Sandwich de Pavo y Aguacate",
            descripcion: "Pan integral con pavo asado, aguacate, lechuga, tomate y mayonesa ligera.",
            foto: "",
            precio: 85.00,
            categoria: {
                id: 2,
                nombre: "Sandwich"
            }
        }
    },

    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Ensalada Cesar con Pollo",
            descripcion: "Lechuga romana crujiente, queso parmesano rallado y tiras de pollo a la parrilla, todo aderezado con una cremosa salsa Cesar.",
            foto: "",
            precio: 100.00,
            categoria: {
                id: 3,
                nombre: "Ensalada"
            }
        }
    },

    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Tarta de Frutos Rojos",
            descripcion: "Delicada tarta de masa quebrada rellena de crema pastelera y cubierta con una mezcla de frutos rojos frescos.",
            foto: "",
            precio: 70.00,
            categoria: {
                id: 4,
                nombre: "Postre"
            }
        }
    },

    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Brochetas de Frutas",
            descripcion: "Brochetas de frutas frescas como piña, fresas, uvas y melón.",
            foto: "",
            precio: 50.00,
            categoria: {
                id: 5,
                nombre: "Fruta"
            }
        }
    }
];

export function inicializarModulo() {
    setDetalleAlimentoVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}

export function guardar() {
    //Declaro una variable temporal para guardar la posicion del alimento:
    let posTemp = -1;

    //Declaro una variable temporal para la categoria:
    let catTemp = null;

    //Generamos un nuevo objeto de alimento:
    let a = new Object();

    //Lleno los atributos del objeto alimento:
    a.id = 0;
    a.producto = new Object();
    a.producto.id = 0;
    a.producto.nombre = document.getElementById("txtAlimento").value;
    a.producto.descripcion = document.getElementById("txtDescripcionAlimento").value;
    a.producto.precio = parseFloat(document.getElementById("txtPrecioAlimento").value);
    catTemp = buscarCategoriaPorID(parseInt(document.getElementById("cmbCategoria").value));
    a.producto.categoria = catTemp;

    //Una vez que tenemos el objeto de alimento con sus datos llenos,
    //revisamos si se va a insertar o actualizar:
    posTemp = buscarPosicionAlimentoPorID(parseInt(document.getElementById("txtId").value));
    if (posTemp >= 0) //Si esta condicion se cumple, el alimento ya existe
    {
        a.id = parseInt(document.getElementById("txtId").value);

        //Reemplazamos el objeto en la posicion del alimento anterior:
        alimentos[posTemp] = a;
    }
    else {
        //Como el alimento no existe, lo agregamos al final del arreglo:
        a.id = generarIDAlimento();
        alimentos.push(a);
        document.getElementById("txtId").value = a.id;
    }

    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Datos de producto guardados.', 'success');
}

export function eliminar() {
    let idAlimento = parseInt(document.getElementById("txtId").value);
    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }

    alimentos.splice(pos, 1);
    llenarTabla();
    limpiar();
    Swal.fire('Movimiento realizado.', 'Alimento eliminado.', 'uccess');
}

export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtAlimento").value = '';
    document.getElementById("txtDescripcionAlimento").value = ''
    document.getElementById("txtPrecioAlimento").value = ''
    document.getElementById("cmbCategoria").value = 1;
}

export function consultar() {

}

export function mostrarDetalleAlimento(idAlimento) {
    let alimento = null;
    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }

    limpiar();
    alimento = alimentos[pos];
    document.getElementById("txtId").value = alimento.id;
    document.getElementById("txtAlimento").value = alimento.producto.nombre;
    document.getElementById("txtDescripcionAlimento").value = alimento.producto.descripcion;
    document.getElementById("txtPrecioAlimento").value = alimento.producto.precio;
    document.getElementById("cmbCategoria").value = alimento.producto.categoria.id;
    setDetalleAlimentoVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleAlimentoVisible(true);
}

/**
* Llena el cuerpo (tbody) de una tabla HTML
* utilizando los valores del arreglo JSON
* de alimentos.
*/
function llenarTabla() {
    //Aqui guardaremos el contenido de la tabla:
    let contenido = '';

    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++) {
        //Vamos generando el contenido de forma dinamica:
        //contenido = contenido + '<tr>' + '</tr>'
        contenido += '<tr>' +
            '<td>' + alimentos[i].producto.nombre + '</td>' +
            '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
            '<td>' + alimentos[i].producto.precio + '</td>' +
            '<td> <button class="btn btn-outline-danger" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>'
    }

    //Insertamos el contenido HTML generado dentro del cuerpo de la tabla:
    document.getElementById("tbodyAlimentos").innerHTML = contenido;
}


function llenarComboBoxCategorias() {
    let contenido = '';

    //Recorremos el arreglo de categorias:
    for (let i = 0; i < categorias.length; i++) {
        contenido += '<option value="' + categorias[i].id + '">' +
            categorias[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoria').innerHTML = contenido;
}

/*
* Busca la posicion de un alimento con base en su ID.
* 
* Si el ID no se encuentra, la funcion devuelve -1.
*/
function buscarPosicionAlimentoPorID(idAlimento) {
    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].id === idAlimento)
            return i;
    }

    return -1;
}

/*
* Esta funcion muestra y oculta el detalle
* de un alimento.
*/
export function setDetalleAlimentoVisible(valor) {
    // Si valor es true:
    if (valor) {
        //Oculto el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = 'none';

        //Muestro el detalle:
        document.getElementById('divDetalleAlimento').style.display = '';
    }
    else {
        //Oculto el detalle:
        document.getElementById('divDetalleAlimento').style.display = 'none';

        //Muestro el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = '';
    }
}

function generarIDAlimento() {
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0) {
        ultimoID = alimentos[0].id;
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].id > ultimoID)
                ultimoID = alimentos[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

/*
function generarIDProducto() {
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0) {
        ultimoID = alimentos[0].producto.id;
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].producto.id > ultimoID)
                ultimoID = alimentos[i].producto.id;
        }
    }
    ultimoID++;
    return ultimoID;
} */

function buscarCategoriaPorID(idCategoria) {
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == idCategoria)
            return categorias[i];
    }
    return null;
}

/* __________ __________ Funcionalidad de busueda por  __________ _________*/

// Función para buscar alimento por nombre y mostrar solo aquellos que coincidan en la tabla
export function buscarAlimentoPorNombre() {
    let nombreAlimento = document.getElementById('inputBuscarAlimento').value.toLowerCase();
    let contenido = '';

    // Recorrer el arreglo de alimentos y agregar aquellos que coincidan con el nombre buscado
    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].producto.nombre.toLowerCase().includes(nombreAlimento)) {
            contenido += '<tr>' +
                '<td>' + alimentos[i].producto.nombre + '</td>' +
                '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
                '<td>' + alimentos[i].producto.precio + '</td>' +
                '<td> <button class="btn btn-outline-danger" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ');"><i class="fas fa-edit"></i> Editar</button> </td>'
                /*'<td><a href="#" class="text-info" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ');"><i class="fas fa-eye"></i></a>' + '</td>' +
                '</tr>';*/

        }
    }

    // Si no se encontró ningún alimento, mostrar un mensaje
    if (contenido === '') {
        Swal.fire('', 'No se encontraron alimentos con ese nombre.', 'warning');
    } else {
        // Insertar el contenido HTML generado dentro del cuerpo de la tabla:
        document.getElementById("tbodyAlimentos").innerHTML = contenido;
    }
}
