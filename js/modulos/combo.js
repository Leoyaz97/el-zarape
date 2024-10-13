let alimentos = [
    { id: 1, nombre: "Filete a la Mostaza", descripcion: "Suave filete de res bañado en una salsa cremosa de mostaza y acompañado de papas gratinadas.", foto: "", precio: 180.00, categoria: "Platillo" },
    { id: 2, nombre: "Ensalada Cesar con Pollo", descripcion: "Lechuga romana crujiente, queso parmesano rallado y tiras de pollo a la parrilla, todo aderezado con una cremosa salsa Cesar.", foto: "", precio: 100.00, categoria: "Ensalada" }
    // Otros alimentos
];

let bebidas = [
    { id: 1, nombre: "Coca Cola", descripcion: "Bebida gaseosa de cola.", precio: 25.00, foto: "", categoria: "Gaseosa" },
    { id: 2, nombre: "Jugo de Naranja", descripcion: "Jugo natural de naranja.", precio: 30.00, foto: "", categoria: "Jugo" }
    // Otras bebidas
];

let combos = [
    { id: 1, nombre: "Combo Filete y Jugo", descripcion: "Incluye Filete a la Mostaza y Jugo de Naranja.", alimentos: [1], bebidas: [2], precio: 200.00 },
    { id: 2, nombre: "Combo Ensalada Cesar y Coca Cola", descripcion: "Ensalada Cesar con Pollo acompañada de una Coca Cola.", alimentos: [2], bebidas: [1], precio: 120.00 },
    { id: 3, nombre: "Combo Hamburguesa y Refresco", descripcion: "Hamburguesa clásica con papas fritas y un refresco de tu elección.", alimentos: [3], bebidas: [1], precio: 150.00 },
    { id: 4, nombre: "Combo Tacos y Agua de Jamaica", descripcion: "Tres tacos de pastor acompañados de una refrescante Agua de Jamaica.", alimentos: [4], bebidas: [3], precio: 130.00 }
];

// Nota: Asegúrate de que los IDs de los alimentos y bebidas coincidan con los que tengas en tus arrays de `alimentos` y `bebidas`.


export function inicializarModulo() {
    setDetalleComboVisible(false);
    llenarComboBoxAlimentos();
    llenarComboBoxBebidas();
    llenarTablaCombos();
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarModulo();
});

export function guardarCombo() {
    let posTemp = -1;
    let combo = {};

    combo.id = 0;
    combo.nombre = document.getElementById("txtComboNombre").value;
    combo.descripcion = document.getElementById("txtDescripcionCombo").value || ''; // Agregando descripcion si existe
    combo.alimentos = Array.from(document.getElementById("cmbComboAlimentos").selectedOptions).map(option => parseInt(option.value));
    combo.bebidas = Array.from(document.getElementById("cmbComboBebidas").selectedOptions).map(option => parseInt(option.value));
    combo.precio = parseFloat(document.getElementById("txtComboPrecio").value);

    posTemp = buscarPosicionComboPorID(parseInt(document.getElementById("txtComboId").value));
    if (posTemp >= 0) {
        combo.id = parseInt(document.getElementById("txtComboId").value);
        combos[posTemp] = combo;
    } else {
        combo.id = generarIDCombo();
        combos.push(combo);
        document.getElementById("txtComboId").value = combo.id;
    }

    llenarTablaCombos();
    Swal.fire('Movimiento realizado.', 'Datos del combo guardados.', 'success');
}

export function limpiarCombo() {
    document.getElementById("txtComboId").value = '';
    document.getElementById("txtComboNombre").value = '';
    document.getElementById("txtDescripcionCombo").value = ''; // Limpiar descripcion
    document.getElementById("txtComboPrecio").value = '';
    document.getElementById("cmbComboAlimentos").value = '';
    document.getElementById("cmbComboBebidas").value = '';
}

export function buscarPosicionComboPorID(id) {
    return combos.findIndex(combo => combo.id === id);
}

export function generarIDCombo() {
    return combos.length > 0 ? Math.max(...combos.map(c => c.id)) + 1 : 1;
}

export function llenarComboBoxAlimentos() {
    let comboBox = document.getElementById("cmbComboAlimentos");
    comboBox.innerHTML = '';
    alimentos.forEach(alimento => {
        let option = document.createElement("option");
        option.value = alimento.id;
        option.textContent = alimento.nombre;
        comboBox.appendChild(option);
    });
}

export function llenarComboBoxBebidas() {
    let comboBox = document.getElementById("cmbComboBebidas");
    comboBox.innerHTML = '';
    bebidas.forEach(bebida => {
        let option = document.createElement("option");
        option.value = bebida.id;
        option.textContent = bebida.nombre;
        comboBox.appendChild(option);
    });
}

export function llenarTablaCombos() {
    let tbody = document.getElementById("tbodyCombos");
    tbody.innerHTML = '';
    combos.forEach(combo => {
        let fila = document.createElement("tr");
        let columnaNombre = document.createElement("td");
        let columnaAlimentos = document.createElement("td");
        let columnaBebidas = document.createElement("td");
        let columnaPrecio = document.createElement("td");

        columnaNombre.textContent = combo.nombre;
        columnaAlimentos.textContent = combo.alimentos.map(id => alimentos.find(a => a.id === id).nombre).join(", ");
        columnaBebidas.textContent = combo.bebidas.map(id => bebidas.find(b => b.id === id).nombre).join(", ");
        columnaPrecio.textContent = `$${combo.precio.toFixed(2)}`;

        fila.appendChild(columnaNombre);
        fila.appendChild(columnaAlimentos);
        fila.appendChild(columnaBebidas);
        fila.appendChild(columnaPrecio);

        let columnaBotones = document.createElement("td");
        let botonEditar = document.createElement("button");
        botonEditar.className = "btn btn-outline-warning";
        botonEditar.innerHTML = '<i class="fas fa-edit"></i>';
        botonEditar.onclick = () => editarCombo(combo.id);

        let botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-outline-danger ms-2";
        botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
        botonEliminar.onclick = () => eliminarCombo(combo.id);

        columnaBotones.appendChild(botonEditar);
        columnaBotones.appendChild(botonEliminar);
        fila.appendChild(columnaBotones);

        tbody.appendChild(fila);
    });
}

export function editarCombo(id) {
    let combo = combos.find(c => c.id === id);
    if (combo) {
        document.getElementById("txtComboId").value = combo.id;
        document.getElementById("txtComboNombre").value = combo.nombre;
        document.getElementById("txtComboPrecio").value = combo.precio;
        
        let cmbAlimentos = document.getElementById("cmbComboAlimentos");
        let cmbBebidas = document.getElementById("cmbComboBebidas");
        
        cmbAlimentos.value = combo.alimentos.join(',');
        cmbBebidas.value = combo.bebidas.join(',');
        setDetalleComboVisible(true);
    }
}

export function eliminarCombo(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let pos = buscarPosicionComboPorID(id);
            if (pos >= 0) {
                combos.splice(pos, 1);
                llenarTablaCombos();
                Swal.fire('Eliminado!', 'El combo ha sido eliminado.', 'success');
            }
        }
    });
}

export function setDetalleComboVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoCombo').style.display = 'none';
        document.getElementById('divDetalleCombo').style.display = '';
    } else {
        document.getElementById('divDetalleCombo').style.display = 'none';
        document.getElementById('divCatalogoCombo').style.display = '';
    }
}

export function buscarComboPorNombre() {
    let nombreBuscado = document.getElementById("inputBuscarCombo").value.trim().toLowerCase();
    let tbody = document.getElementById("tbodyCombos");
    tbody.innerHTML = '';

    let combosFiltrados = combos.filter(combo => combo.nombre.toLowerCase().includes(nombreBuscado));

    combosFiltrados.forEach(combo => {
        let fila = document.createElement("tr");
        let columnaNombre = document.createElement("td");
        let columnaAlimentos = document.createElement("td");
        let columnaBebidas = document.createElement("td");
        let columnaPrecio = document.createElement("td");

        columnaNombre.textContent = combo.nombre;
        columnaAlimentos.textContent = combo.alimentos.map(id => alimentos.find(a => a.id === id).nombre).join(", ");
        columnaBebidas.textContent = combo.bebidas.map(id => bebidas.find(b => b.id === id).nombre).join(", ");
        columnaPrecio.textContent = `$${combo.precio.toFixed(2)}`;

        fila.appendChild(columnaNombre);
        fila.appendChild(columnaAlimentos);
        fila.appendChild(columnaBebidas);
        fila.appendChild(columnaPrecio);

        let columnaBotones = document.createElement("td");
        let botonEditar = document.createElement("button");
        botonEditar.className = "btn btn-outline-warning";
        botonEditar.innerHTML = '<i class="fas fa-edit"></i>';
        botonEditar.onclick = () => editarCombo(combo.id);

        let botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-outline-danger ms-2";
        botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
        botonEliminar.onclick = () => eliminarCombo(combo.id);

        columnaBotones.appendChild(botonEditar);
        columnaBotones.appendChild(botonEliminar);
        fila.appendChild(columnaBotones);

        tbody.appendChild(fila);
    });
}

export function mostrarFormularioNuevo() {
    limpiarCombo();
    setDetalleComboVisible(true);
}
