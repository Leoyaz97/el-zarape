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
    { id: 1, nombre: "Combo Filete y Jugo", descripcion: "Incluye Filete a la Mostaza y Jugo de Naranja.", alimentos: [1], bebidas: [2], precio: 200.00 }
    // Otros combos
];

export function inicializarModulo() {
    setDetalleComboVisible(false);
    llenarComboBoxAlimentos();
    llenarComboBoxBebidas();
    llenarTablaCombos();
}

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
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${combo.nombre}</td>
            <td>${alimentos.filter(a => combo.alimentos.includes(a.id)).map(a => a.nombre).join(', ')}</td>
            <td>${bebidas.filter(b => combo.bebidas.includes(b.id)).map(b => b.nombre).join(', ')}</td>
            <td>$${combo.precio.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarCombo(${combo.id});">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCombo(${combo.id});">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

export function editarCombo(id) {
    let combo = combos.find(c => c.id === id);
    if (combo) {
        document.getElementById("txtComboId").value = combo.id;
        document.getElementById("txtComboNombre").value = combo.nombre;
        document.getElementById("txtDescripcionCombo").value = combo.descripcion || ''; // Si existe, llenarla
        document.getElementById("txtComboPrecio").value = combo.precio.toFixed(2);
        document.getElementById("cmbComboAlimentos").value = combo.alimentos.map(a => a.toString());
        document.getElementById("cmbComboBebidas").value = combo.bebidas.map(b => b.toString());
        setDetalleComboVisible(true);
    }
}

export function eliminarCombo(id) {
    let pos = buscarPosicionComboPorID(id);
    if (pos >= 0) {
        combos.splice(pos, 1);
        llenarTablaCombos();
        Swal.fire('Movimiento realizado.', 'Combo eliminado.', 'success');
    }
}

export function mostrarFormularioNuevo() {
    limpiarCombo();
    setDetalleComboVisible(true);
}

export function setDetalleComboVisible(valor) {
    if (valor) {
        //Oculto el catalogo:
        document.getElementById('divCatalogoCombo').style.display = 'none';
        //Muestro el detalle:
        document.getElementById('divDetalleCombo').style.display = '';
    }
    else {
        //Oculto el detalle:
        document.getElementById('divDetalleCombo').style.display = 'none';
        //Muestro el catalogo:
        document.getElementById('divCatalogoCombo').style.display = '';
    }
}

export function buscarComboPorNombre() {
    let nombreBuscar = document.getElementById("inputBuscarCombo").value.toLowerCase();
    let tbody = document.getElementById("tbodyCombos");
    tbody.innerHTML = '';
    combos.filter(combo => combo.nombre.toLowerCase().includes(nombreBuscar)).forEach(combo => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${combo.nombre}</td>
            <td>${alimentos.filter(a => combo.alimentos.includes(a.id)).map(a => a.nombre).join(', ')}</td>
            <td>${bebidas.filter(b => combo.bebidas.includes(b.id)).map(b => b.nombre).join(', ')}</td>
            <td>$${combo.precio.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarCombo(${combo.id});">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCombo(${combo.id});">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
