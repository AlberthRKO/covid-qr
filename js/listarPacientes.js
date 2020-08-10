var usuarios = new Array();
var actualIdUsuario;
$(document).ready(function () {
    comprobarAdmin();
    getTodosUsuarios();
    listarUsuarios();
});

function comprobarAdmin() {
    if (sessionStorage.usuario) {
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if (usuario.rol == "1")
            window.location.href = "index.html";
    }
}

function getTodosUsuarios() {
    url = "php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getTodosUsuarios'
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

function listarUsuarios() {
    usuarios.forEach(usuario => {
        let idUsuario = usuario.idUsuario;
        let ci = usuario.ci.substr(0, usuario.ci.length - 3);
        let extension = usuario.ci.substr(usuario.ci.length - 3, usuario.ci.length);
        let spanEstado = "";
        spanEstado = getEtiquetaEstado(usuario);
        let html = `<tr id="fila${idUsuario}">
                        <td>${idUsuario}</td>
                        <td id="ci${idUsuario}">${ci}</td>
                        <td id="nombres${idUsuario}">${usuario.nombres}</td>
                        <td id="apellidos${idUsuario}">${usuario.apellidos}</td>
                        <td id="extension${idUsuario}">${extension}</td>
                        <td id="filaEstado${idUsuario}">${spanEstado}</td>
                        <td>
                            <a class="success p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEditarUsuarioModal(${idUsuario})">
                                <i class="icon-mode_edit font-medium-3 mr-2"></i>
                            </a>
                            <a class="danger p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEliminarUsuarioModal(${idUsuario})">
                                <i class="icon-close font-medium-3 mr-2"></i>
                            </a>

                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
}

function mostrarEditarUsuarioModal(idUsuario) {
    actualIdUsuario = idUsuario;
    let nombres = $('#nombres' + idUsuario).html();
    let apellidos = $('#apellidos' + idUsuario).html();
    let ci = $('#ci' + idUsuario).html();
    let extension = $('#extension' + idUsuario).html();
    let estado = $("#estado" + idUsuario).html();

    $('#nombres').val(nombres);
    $('#apellidos').val(apellidos);
    $('#ci').val(ci);
    $('#extension').val(extension);
    $("#estado").val(estado);

    $('#editar').modal("show");
}

$('#btnGuardar').click(function () {
    if (hayError())
        return;
    editar();
});

function hayError() {
    let errorCi1 = validarCi();
    let errorCi2 = validarCiExistente();
    let errorApellidos = validarApellidos();
    let errorNombres = validarNombres();
    if (errorNombres || errorApellidos || errorCi1 || errorCi2)
        return true;
    return false;
}

function validarNombres() {
    let nombres = $('#nombres').val();
    if (nombres.trim() != "") {
        $('#alertaNombres').removeClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaNombres').addClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeIn();
        $('#nombres').focus();
        return true;
    }
}

function validarApellidos() {
    let apellidos = $('#apellidos').val();
    if (apellidos.trim() != "") {
        $('#alertaApellidos').removeClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaApellidos').addClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeIn();
        $('#apellidos').focus();
        return true;
    }
}

function validarCi() {
    let ci = $('#ci').val();
    if (ci.trim() != "") {
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeOut();
        return false;
    }
    else {
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function validarCiExistente() {
    if ($('#ci').val().trim() == "")
        return false;
    let ci = $('#ci').val().trim();
    let exists = checkUsuario(ci);
    if (!exists) {
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeOut();
        return false;
    }
    else {
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function checkUsuario(ci) {
    let exists = false;
    url = "php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getByCi',
        'ci': ci
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: result => {
            if (result != "empty") {
                let usuario = JSON.parse(result);
                if (usuario.idUsuario != actualIdUsuario)
                    exists = true;
            }
        }
    });
    return exists;
}

function editar() {
    let nombres = $('#nombres').val();
    let apellidos = $('#apellidos').val();
    let ci = $('#ci').val();
    let extension = $('#extension').val();
    let estado = $('#estado').val();

    let url = "php/controlador/ControladorUsuario.php";
    data = {
        request: 'editar',
        idUsuario: actualIdUsuario,
        nombres: nombres,
        apellidos: apellidos,
        ci: ci + extension,
        estado: estado
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            console.log(result);
        }
    });
    $('#btnCancelar').click();
    let usuario = {
        idUsuario: actualIdUsuario,
        ci: ci,
        extension: extension,
        nombres: nombres,
        apellidos: apellidos,
        estado: estado
    }
    editarFila(usuario);
}

function editarFila(usuario) {
    let idUsuario = usuario.idUsuario;
    $('#nombres' + idUsuario).html(usuario.nombres);
    $('#ci' + idUsuario).html(usuario.ci);
    $('#extension' + idUsuario).html(usuario.extension);
    $('#apellidos' + idUsuario).html(usuario.apellidos);
    let etiquetaEstado = getEtiquetaEstado(usuario);
    $('#filaEstado' + idUsuario).html(etiquetaEstado);
    swal("Guardado", "Editado exitosamente !", "success");
}


function mostrarEliminarUsuarioModal(idUsuario) {
    actualIdUsuario = idUsuario;
    let nombres = $('#nombres' + idUsuario).html();
    let apellidos = $('#apellidos' + idUsuario).html();
    let html = `<p class="text-dark">Estas seguro que desea eliminar a <span class="font-weight-bold">${nombres} ${apellidos}</span>?</p>`;
    $('#mensajeEliminar').html(html);
    $('#eliminar').modal("show");
}

$('#btnEliminar').click(function () {
    let url = "php/controlador/ControladorUsuario.php";
    data = {
        request: 'eliminar',
        idUsuario: actualIdUsuario
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            console.log(result);
        }
    });
    $('#fila' + actualIdUsuario).fadeOut(1000);
    $('#btnCancelar2').click();
});


function getEtiquetaEstado(usuario) {
    let estadoHtml;

    if (usuario.estado == "NORMAL")
        estadoHtml = `<span class="badge badge-light" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if (usuario.estado == "CONFIRMADO")
        estadoHtml = `<span class="badge badge-primary" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if (usuario.estado == "RECUPERADO")
        estadoHtml = `<span class="badge badge-success" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if (usuario.estado == "FALLECIDO")
        estadoHtml = `<span class="badge badge-danger" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;

    return estadoHtml;
}

$('.filterable .btn-filter').click(function () {
    // console.log("S");
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