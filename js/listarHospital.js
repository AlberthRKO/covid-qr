var hospitales = new Array();
var actualIdHospital;
var estados = new Array();

$(document).ready(function () {
    comprobarAdmin();
    getTodosHospitales();
    listarHospitales();
});

$('#btnUbicacion').click(function(){
    ejeX = $('#ejeX').val();
    ejeY = $('#ejeY').val();
    ubicacion = {
        idHospital: actualIdHospital,
        ejeX: ejeX,
        ejeY: ejeY
    }
    setTodosHospitales();
    editMapHospitales(ubicacion, hospitales);
});

$('#btnGuardar').click(function(e){
    e.preventDefault();
    if(hayError())
        return;
    editar();
    $('#btnCancelar').click();
});

$('#listarPuntosHospitales').click(function(){
    setTodosHospitales();
    dibujarMapaHospital(hospitales, true);
    $('#btnGuardarUbicacion').fadeOut();
    $('#modalMapaTitulo').html("LISTADO DE HOSPITALES EN EL MAPA");
    $('#mapa').modal("show");
});

function hayError(){
    let errorUbicacion = validarUbicacion();
    let errorNombre = validarNombre();
    if(errorNombre || errorUbicacion)
        return true;
    return false;
}

function validarNombre(){
    let nombre = $('#nombre').val();
    if(nombre.trim() != ""){
        $('#alertaNombre').removeClass("alert alert-danger");
        $('#alertaNombreMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaNombre').addClass("alert alert-danger");
        $('#alertaNombreMensaje').fadeIn();
        $('#nombre').focus();
        return true;
    }
}

function validarUbicacion(){
    let latitud = $('#ejeX').val().trim();
    let longitud = $('#ejeY').val().trim();
    if(latitud != "" && longitud != ""){
        $('#alertaUbicacion').removeClass("alert alert-danger");
        $('#alertaUbicacionMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaUbicacion').addClass("alert alert-danger");
        $('#alertaUbicacionMensaje').fadeIn();
        $('#btnUbicacion').focus();
        return true;
    }
}

function editar(){
    let nombre = $('#nombre').val().trim();
    let ejeX = $('#ejeX').val().trim();
    let ejeY = $('#ejeY').val().trim();
    url="php/controlador/ControladorHospital.php";
    data = {
        request: 'editar',
        idHospital: actualIdHospital,
        nombre: nombre,
        ejeX: ejeX,
        ejeY: ejeY,
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
    hospital = {
        idHospital: actualIdHospital,
        nombre: nombre,
        ejeX: ejeX,
        ejeY: ejeY
    }
    editarFila(hospital);
}

function setTodosHospitales(){
    url = "php/controlador/ControladorHospital.php";
    data = {
        'request': 'getTodosHospitales'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                hospitales = JSON.parse(result.trim());
        }
    });
}

function comprobarAdmin() {
    if (sessionStorage.usuario) {
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if (usuario.rol == "1")
            window.location.href = "index.html";
    }
}

function getTodosHospitales() {
    url = "php/controlador/ControladorHospital.php";
    data = {
        'request': 'getTodosHospitales'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                hospitales = JSON.parse(result.trim());
        }
    });
}

function listarHospitales() {
    let cantidad = 5;
    hospitales.forEach(hospital => {
        let idHospital = hospital.idHospital;
        let nombre = hospital.nombre;
        let ejeX = hospital.ejeX;
        let ejeY = hospital.ejeY;
        cantidad += 1;//falta calcular la cantidad de pacientes 
        let html = `<tr id="fila${idHospital}">
                        <td>${idHospital}</td>
                        <td id="nombre${idHospital}">${nombre}</td>
                        <td id="ejeX${idHospital}">${ejeX}</td>
                        <td id="ejeY${idHospital}">${ejeY}</td>
                        <td id="cantidad${idHospital}">${cantidad}</td>
                        <td>
                            <a class="success p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEditarHospitalModal(${idHospital})">
                                <i class="icon-mode_edit font-medium-3 mr-2"></i>
                            </a>
                            <a class="danger p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarEliminarHospitalModal(${idHospital})">
                                <i class="icon-close font-medium-3 mr-2"></i>
                            </a>
                            <a class="dark p-0" data-original-title="" title=""
                                data-toggle="modal" onclick="mostrarHospitalPacientesModal(${idHospital})">
                                <i class="icon-people font-medium-3 mr-2"></i>
                            </a>
                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
}

function mostrarHospitalPacientesModal(idHospital){
    $('#verPacientes').modal("show");
}

function mostrarEditarHospitalModal(idHospital) {
    actualIdHospital = idHospital;
    let nombre = $('#nombre' + idHospital).html();
    let ejeX = $('#ejeX' + idHospital).html();
    let ejeY = $('#ejeY' + idHospital).html();

    $('#nombre').val(nombre);
    $('#ejeX').val(ejeX);
    $('#ejeY').val(ejeY);
    $('#btnGuardarUbicacion').fadeIn();
    $('#modalMapaTitulo').html("INDIQUE LA UBICACIÓN");
    $('#editarHospital').modal("show");
}


function editarFila(hospital) {
    let idHospital = hospital.idHospital;
    $('#nombre' + idHospital).html(hospital.nombre);
    $('#ejeX' + idHospital).html(hospital.ejeX);
    $('#ejeY' + idHospital).html(hospital.ejeY);
    swal("Guardado", "Edición exitosa !", "success");
}


function mostrarEliminarHospitalModal(idHospital) {
    actualIdHospital = idHospital;
    let nombre = $('#nombre' + idHospital).html();
    let html = `<p class="text-dark">Estas seguro que desea eliminar a <span class="font-weight-bold">${nombre}</span>?</p>`;
    $('#mensajeEliminar').html(html);
    $('#eliminarHospital').modal("show");
}

$('#btnEliminar').click(function () {
    let url = "php/controlador/ControladorHospital.php";
    data = {
        request: 'eliminar',
        idHospital: actualIdHospital
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
    $('#fila' + actualIdHospital).fadeOut(1000);
    $('#btnCancelar2').click();
});


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