var errorNombre;
var errorEjes;

$(document).ready(function (){
    comprobarAdmin();
});

function comprobarAdmin(){
    if(sessionStorage.usuario){
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if(usuario.rol == "1")
            window.location.href = "index.html";
    }
}


$('#btnRegistrar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    insertar();
});




function hayError(){    
    errorEjes = validarEjes();
    errorNombre = validarNombre();
    if(errorNombre || errorEjes)
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

function validarEjes(){
    let ejeX = $('#ejeX').val();
    let ejeY = $('#ejeY').val();
    if(ejeX.trim() != "" && ejeY.trim() != ""){
        $('#alertaEjes').removeClass("alert alert-danger");
        $('#alertaEjesMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaEjes').addClass("alert alert-danger");
        $('#alertaEjesMensaje').fadeIn();
        return true;
    }
}

function insertar(){
    let nombre = $('#nombre').val();
    let descripcion = $('#descripcion').val();
    let ejeX = $('#ejeX').val();
    let ejeY = $('#ejeY').val();
    url="php/controlador/ControladorUbicacion.php";
    data = {
        'request': 'insertar',
        'nombre': nombre,
        'ejeX': ejeX,
        'ejeY': ejeY,
        'descripcion': descripcion
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
    limpiar();
    swal("Guardado", "Registro exitoso !", "success");
}

function limpiar(){
    $('#nombre').val("");
    $('#descripcion').val("");
    $('#ejeX').val("");
    $('#ejeY').val("");
}

$('#btnUbicacion').click(function(){
    initMap();
});