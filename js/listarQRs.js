var ubicaciones = new Array();
var usuarios = new Array();
var usuariosConfirmados = new Array();
var actualIdUbicacion;
var usuario;
$(document).ready(function () {
    comprobarAdmin();
    getTodasUbicaciones();
    listarUbicaciones();
});

$('#listarPuntos').click(function () {
    getTodasUbicaciones();
    dibujarMapa(ubicaciones, true);
    $('#mapa').modal("show");
});

$('#btnGuardarUbicacion').click(function () {
    $('#mapa').modal("hide");
})

function comprobarAdmin() {
    if (sessionStorage.usuario) {
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if (usuario.rol == "1")
            window.location.href = "index.html";
    }
}

function getTodasUbicaciones() {
    url = "php/controlador/ControladorUbicacion.php";
    data = {
        'request': 'getTodasUbicaciones'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                ubicaciones = JSON.parse(result.trim());
        }
    });
}

function listarUbicaciones() {
    getTodosUsuariosConfirmados();

    ubicaciones.forEach(ubicacion => {
        let html = `<tr id="fila${ubicacion.idUbicacion}">
                        <td>${ubicacion.idUbicacion}</td>
                        <td id="nombre${ubicacion.idUbicacion}">${ubicacion.nombre}</td>
                        <td id="ejeX${ubicacion.idUbicacion}">${ubicacion.ejeX}</td>
                        <td id="ejeY${ubicacion.idUbicacion}">${ubicacion.ejeY}</td>
                        <td>
                    `;

        getTodosUsuariosQRConfirmados(ubicacion.idUbicacion);
        ubicacion.gravedad = getGravedad(ubicacion);
        html += getColorRiesgo(ubicacion);
        html += `${ubicacion.gravedad}</span>
                        </td>
                        <td>
                            <a class="success p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEditarQRModal(${ubicacion.idUbicacion})">
                                <i class="icon-mode_edit font-medium-3 mr-2"></i>
                            </a>
                            <a class="danger p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEliminarQRModal(${ubicacion.idUbicacion});">
                                <i class="icon-close font-medium-3 mr-2"></i>
                            </a>
                            <a class="dark p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarImprimirQRModal(${ubicacion.idUbicacion});">
                                <i class="icon-eye font-medium-3 mr-2"></i>
                            </a>
                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
}

function getTodosUsuariosConfirmados() {
    url = "php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getTodosUsuariosConfirmados'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                usuarios = JSON.parse(result.trim());
        }
    });
}

function getGravedad(ubicacion) {
    let casos = 0;
    let gravedad = "";
    casosCercanos = getCasosCercanos(ubicacion);//Funcion que determina cuantos enfermos hay a 110 mts de distancia del punto qr
    casosCercanosQR = getCasosLeidosQR();//Funcion que determina cuantos enfermos pasaron por el lugar durante el dia
    casos = casosCercanos + casosCercanosQR;
    //console.log(`${ubicacion.idUbicacion} ${ubicacion.nombre} | ${casosCercanos} + ${casosCercanosQR} = ${casos}`)
    if (casos <= 5)
        gravedad = "BAJO";
    else {
        if (casos <= 10)
            gravedad = "MEDIO";
        else
            gravedad = "ALTO";
    }
    return gravedad;
}

function getCasosCercanos(ubicacion) {
    casos = 0;
    usuarios.forEach(usuario => {
        distancia = distanceBetween(ubicacion, usuario);
        if (distancia < 110)
            casos++;
    });
    return casos;
}

function getCasosLeidosQR() {
    return usuariosConfirmados.length;
}

function getTodosUsuariosQRConfirmados(idUbicacion) {
    let url = "php/controlador/ControladorUbicacionUsuario.php";
    data = {
        request: 'getTodosUsuariosQRConfirmados',
        idUbicacion: idUbicacion
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                usuariosConfirmados = JSON.parse(result.trim());
            else
                usuariosConfirmados = new Array();
        }
    });
}

function getColorRiesgo(ubicacion) {
    let riesgoHtml;
    if (ubicacion.gravedad == "ALTO")
        riesgoHtml = `<span class="badge badge-danger" id="riesgo${ubicacion.idUbicacion}">`;
    if (ubicacion.gravedad == "MEDIO")
        riesgoHtml = `<span class="badge badge-warning" id="riesgo${ubicacion.idUbicacion}">`;
    if (ubicacion.gravedad == "BAJO")
        riesgoHtml = `<span class="badge badge-success" id="riesgo${ubicacion.idUbicacion}">`;
    return riesgoHtml;
}

function mostrarEditarQRModal(idUbicacion) {
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let ejeX = $('#ejeX' + idUbicacion).html();
    let ejeY = $('#ejeY' + idUbicacion).html();
    $('#nombre').val(nombre);
    $('#ejeX').val(ejeX);
    $('#ejeY').val(ejeY);
    $("#editarQR").modal("show");
}

function mostrarEliminarQRModal(idUbicacion) {
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let html = `Estas seguro que desea eliminar QR de <span class="font-weight-bold" id="deleteQR">${nombre}</span>?`;
    $('#mensajeEliminar').html(html);
    $('#eliminarQR').modal("show");
}

function mostrarImprimirQRModal(idUbicacion) {
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let riesgo = $('#riesgo' + idUbicacion).html();
    let html = `Punto QR de la Zona - <span class="font-weight-bold">${nombre}</span>`;
    $('#mensajeImpresion').html(html);

    let ejeX = $('#ejeX' + idUbicacion).html();
    let ejeY = $('#ejeY' + idUbicacion).html();
    $('#qr').html("");
    $('#qr').qrcode({
        render: 'div',
        fill: '#1620AC',
        text: `${idUbicacion}:${nombre}:${riesgo}:${ejeX}:${ejeY}`//idUbicacion:Lugar:Riesgo:latitud:longitud
    });
    mostrarqr();
    $('#imprimirQR').modal("show");
}

function mostrarqr() {
    document.getElementById('mostrar').style.setProperty('display', 'block', 'important');
}

$('#btnEliminar').click(function () {
    let url = "php/controlador/ControladorUbicacion.php";
    data = {
        request: 'eliminar',
        idUbicacion: actualIdUbicacion
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
    $('#fila' + actualIdUbicacion).fadeOut(1000);
    $('#btnCancelar2').click();
});

$('#btnUbicacion').click(function () {
    ejeX = $('#ejeX').val();
    ejeY = $('#ejeY').val();
    ubicacion = {
        idUbicacion: actualIdUbicacion,
        ejeX: ejeX,
        ejeY: ejeY
    }
    getTodasUbicaciones();
    editMap(ubicacion, ubicaciones);
});

$('#btnGuardar').click(function () {
    if (hayError())
        return;
    editar();
    $('#btnCancelar').click();
});

function hayError() {
    errorEjes = validarEjes();
    errorNombre = validarNombre();
    if (errorNombre || errorEjes)
        return true;
    return false;
}

function validarNombre() {
    let nombre = $('#nombre').val();
    if (nombre.trim() != "") {
        $('#alertaNombre').removeClass("alert alert-danger");
        $('#alertaNombreMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaNombre').addClass("alert alert-danger");
        $('#alertaNombreMensaje').fadeIn();
        $('#nombre').focus();
        return true;
    }
}

function validarEjes() {
    let ejeX = $('#ejeX').val();
    let ejeY = $('#ejeY').val();
    if (ejeX.trim() != "" && ejeY.trim() != "") {
        $('#alertaEjes').removeClass("alert alert-danger");
        $('#alertaEjesMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaEjes').addClass("alert alert-danger");
        $('#alertaEjesMensaje').fadeIn();
        return true;
    }
}

function editar() {
    let nombre = $('#nombre').val();
    let ejeX = $('#ejeX').val();
    let ejeY = $('#ejeY').val();
    let url = "php/controlador/ControladorUbicacion.php";
    data = {
        request: 'editar',
        idUbicacion: actualIdUbicacion,
        nombre: nombre,
        ejeX: ejeX,
        ejeY: ejeY
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
    editarFila(actualIdUbicacion, nombre, ejeX, ejeY);
}

function editarFila(idUbicacion, nombre, ejeX, ejeY) {
    $('#nombre' + idUbicacion).html(nombre);
    $('#ejeX' + idUbicacion).html(ejeX);
    $('#ejeY' + idUbicacion).html(ejeY);
    swal("Guardado", "Editado exitosamente !", "success");
}

$('.filterable .btn-filter').click(function () {
    var $panel = $(this).parents('.filterable');
    $filters = $panel.find('.filters input');
    $labels = $panel.find('.filters .label');
    $tbody = $panel.find('.table tbody');
    if ($filters.prop('disabled') == true) {
        $filters.removeClass("d-none");
        $filters.prop('disabled', false);
        $labels.addClass("d-none");
        $('.filterable .btn-filter').html('<i class="icon-error"></i> Cancelar');
        $('.filterable .btn-filter').addClass('btn-secondary');
        $('.filterable .filters .ultimaTabla').addClass('pt-2');
        $filters.first().focus();
    } else {
        $filters.addClass("d-none");
        $('.filterable .btn-filter').removeClass('btn-secondary');
        $('.filterable .filters .ultimaTabla').removeClass('pt-2');
        $filters.val('').prop('disabled', true);
        $labels.removeClass("d-none");
        $tbody.find('.no-result').remove();
        $('.filterable .btn-filter').html('<i class="icon-filter"></i> Filtrar');
        $('.filterable .btn-filter').addClass('btn-primary');
        $tbody.find('tr').show();
    }
});

$('.filterable .filters input').keyup(function (e) {
    /* Ignorar tecla de tabulación */
    var code = e.keyCode || e.which;
    if (code == '9') return;
    /* Datos DOM y selectores útiles */
    var $input = $(this);
    inputContent = $input.val().toLowerCase();
    $panel = $input.parents('.filterable');
    column = $panel.find('.filters th').index($input.parents('th'));
    $table = $panel.find('.table');
    $rows = $table.find('tbody tr');
    /* La función de filtro ;) */
    var $filteredRows = $rows.filter(function () {
        var value = $(this).find('td').eq(column).text().toLowerCase();
        return value.indexOf(inputContent) === -1;
    });
    /* Limpie sin resultado previo si existe */
    $table.find('tbody .no-result').remove();
    /* Mostrar todas las filas, ocultar las filtradas ! xD) */
    $rows.show();
    $filteredRows.hide();
    /* Anteponer una fila sin resultado si todas las filas están filtradas */
    if ($filteredRows.length === $rows.length) {
        $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
    }
});