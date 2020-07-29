var ubicaciones = new Array();
var actualIdUbicacion;
var usuario;
$(document).ready(function (){
    comprobarAdmin();
    getTodasUbicaciones();
    listarUbicaciones();
});

function comprobarAdmin(){
    if(sessionStorage.usuario){
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if(usuario.rol == "1")
            window.location.href = "index.html";
    }
}

function getTodasUbicaciones(){
    url="php/controlador/ControladorUbicacion.php";
    data = {
        'request': 'getTodasUbicaciones'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function(result){
            if(result.trim() != "empty")
                ubicaciones = JSON.parse(result.trim());
        }
    });
}

function listarUbicaciones(){
    ubicaciones.forEach(ubicacion => {
        let html = `<tr id="fila${ubicacion.idUbicacion}">
                        <td>${ubicacion.idUbicacion}</td>
                        <td id="nombre${ubicacion.idUbicacion}">${ubicacion.nombre}</td>
                        <td id="ejeX${ubicacion.idUbicacion}">${ubicacion.ejeX}</td>
                        <td id="ejeY${ubicacion.idUbicacion}">${ubicacion.ejeY}</td>
                        <td>
                    `;

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
                                <i class="icon-print font-medium-3 mr-2"></i>
                            </a>
                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
}

function getColorRiesgo(ubicacion){
    let riesgoHtml;
    if(ubicacion.gravedad == "ALTO")
        riesgoHtml = `<span class="badge badge-danger" id="riesgo${ubicacion.idUbicacion}">`;
    if(ubicacion.gravedad == "MEDIO")
        riesgoHtml = `<span class="badge badge-warning" id="riesgo${ubicacion.idUbicacion}">`;
    if(ubicacion.gravedad == "BAJO")
        riesgoHtml = `<span class="badge badge-success" id="riesgo${ubicacion.idUbicacion}">`;
    return riesgoHtml;
}

function mostrarEditarQRModal(idUbicacion){
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let ejeX = $('#ejeX' + idUbicacion).html();
    let ejeY = $('#ejeY' + idUbicacion).html();
    console.log(`${nombre} ${ejeX} ${ejeY}`);
    $('#nombre').val(nombre);
    $('#ejeX').val(ejeX);
    $('#ejeY').val(ejeY);
    $("#editarQR").modal("show");
}

function mostrarEliminarQRModal(idUbicacion){
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let html = `Estas seguro que desea eliminar QR de <span class="font-weight-bold" id="deleteQR">${nombre}</span>?`;
    $('#mensajeEliminar').html(html);
    $('#eliminarQR').modal("show");
}

function mostrarImprimirQRModal(idUbicacion){
    actualIdUbicacion = idUbicacion;
    let nombre = $('#nombre' + idUbicacion).html();
    let riesgo = $('#riesgo' + idUbicacion).html();
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

$('#btnEliminar').click(function(){
    data = {
        request: 'eliminar',
        idUbicacion: actualIdUbicacion
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function(result){
            console.log(result);
        }
    });
    $('#fila'+actualIdUbicacion).fadeOut(500);
    $('#btnCancelar2').click();
});

$('#btnUbicacion').click(function(){
    initMap();
});

$('#btnGuardar').click(function(){
    let nombre = $('#nombre').val();
    let ejeX = $('#ejeX').val();
    let ejeY = $('#ejeY').val();
    let url="php/controlador/ControladorUbicacion.php";
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
    $('#btnCancelar').click();
    alert("EDITADO EXITOSAMENTE");
    editarFila(actualIdUbicacion,nombre,ejeX,ejeY);
});

function editarFila(idUbicacion,nombre,ejeX,ejeY){
    $('#nombre' + idUbicacion).html(nombre);
    $('#ejeX' + idUbicacion).html(ejeX);
    $('#ejeY' + idUbicacion).html(ejeY);
}


