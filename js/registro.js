var errorContrasena;
var errorAceptar;

$('#btnRegistrar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    insertar();
    window.location.href = "index.html";
});



function hayError(){
    errorContrasena = validarContrasena();
    errorAceptar = validarAceptar();
    if(errorContrasena || errorAceptar)
        return true;
    return false;
}

function validarContrasena(){
    let contrasena1 = $('#contrasena1').val();
    let contrasena2 = $('#contrasena2').val();
    if(contrasena1 != "" && contrasena1 == contrasena2){
        $('#alertaContrasena').removeClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaContrasena').addClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeIn();
        $('#contrasena1').focus();
        return true;
    }
}

function validarAceptar(){
    if( $('#aceptar').prop('checked') ) {
        $('#alertaAceptar').removeClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaAceptar').addClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeIn();
        return true;
    }
}

function insertar(){
    let contrasena = $('#contrasena1').val();
    let ci = $('#ci').val() + $('select[name=extension]').val();
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'insertar',
        'nombres': $('#nombres').val(),
        'apellidos': $('#apellidos').val(),
        'ci': ci,
        'telefono': '',
        'correo': $('#correo').val(),
        'contrasena': contrasena,
        'rol': '1',
        'estado': 'NORMAL',
        'ejeX': $('#ejeX').val(),
        'ejeY': $('#ejeY').val()
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
    sessionStorage.ci = ci;
    sessionStorage.contrasena = contrasena;
}

$('#ubicacion').click(function(){
    initMap();
});