var usuarios = new Array();
var actualIdUsuario;
$(document).ready(function (){
    comprobarAdmin();
    getTodosUsuarios();
    listarUsuarios();
    console.log("ASDF");
});

function comprobarAdmin(){
    if(sessionStorage.usuario){
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if(usuario.rol == "1")
            window.location.href = "index.html";
    }
}

function getTodosUsuarios(){
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getTodosUsuarios'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function(result){
            if(result.trim() != "empty")
                usuarios = JSON.parse(result.trim());
        }
    });
}

function listarUsuarios(){
    usuarios.forEach(usuario => {
        let idUsuario = usuario.idUsuario;
        let ci = usuario.ci.substr(0,usuario.ci.length-3);
        let extension = usuario.ci.substr(usuario.ci.length-3,usuario.ci.length);
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

function mostrarEditarUsuarioModal(idUsuario){
    actualIdUsuario = idUsuario;////////////////////////falta editar usuario y eliminar con la bd
    let nombres = $('#nombres' + idUsuario).html();
    let apellidos = $('#apellidos' + idUsuario).html();
    let ci = $('#ci' + idUsuario).html();
    let extension = $('#extension'+idUsuario).html();
    let estado = $("#estado"+idUsuario).html();
    
    $('#nombres').val(nombres);
    $('#apellidos').val(apellidos);
    $('#ci').val(ci);
    $('#extension').val(extension);
    $("#estado").val(estado);

    $('#editar').modal("show");
}

$('#btnGuardar').click(function(){
    let nombres = $('#nombres').val();
    let apellidos = $('#apellidos').val();
    let ci = $('#ci').val();
    let extension = $('#extension').val();
    let estado = $('#estado').val();

    let url="php/controlador/ControladorUsuario.php";
    data = {
        request: 'editar',
        idUsuario: actualIdUsuario,
        nombres: nombres,
        apellidos: apellidos,
        ci: ci+extension,
        estado: estado
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
    $('#btnCancelar').click();
    let usuario = {
        idUsuario:actualIdUsuario,
        ci: ci,
        extension: extension,
        nombres: nombres,
        apellidos: apellidos,
        estado: estado
    }
    editarFila(usuario);
});

function editarFila(usuario){
    let idUsuario = usuario.idUsuario;
    $('#nombres' + idUsuario).html(usuario.nombres);
    $('#ci' + idUsuario).html(usuario.ci);
    $('#extension' + idUsuario).html(usuario.extension);
    $('#apellidos' + idUsuario).html(usuario.apellidos);
    let etiquetaEstado = getEtiquetaEstado(usuario);
    $('#filaEstado' + idUsuario).html(etiquetaEstado);
}


function mostrarEliminarUsuarioModal(idUsuario){
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


function getEtiquetaEstado(usuario){
    let estadoHtml;

    if(usuario.estado == "NORMAL")
        estadoHtml = `<span class="badge badge-light" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if(usuario.estado == "CONFIRMADO")
        estadoHtml = `<span class="badge badge-primary" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if(usuario.estado == "RECUPERADO")
        estadoHtml = `<span class="badge badge-success" id="estado${usuario.idUsuario}">${usuario.estado}</span>`;
    if(usuario.estado == "FALLECIDO")
        estadoHtml = `<span class="badge badge-danger id="estado${usuario.idUsuario}"">${usuario.estado}</span>`;

    return estadoHtml;
}