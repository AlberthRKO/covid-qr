var error = false;
function insertarUsuario(e){
    e.preventDefault();
    let contrasena1 = $('#contrasena1').val();
    let contrasena2 = $('#contrasena2').val();
    let contrasena;
    let ci = $('#ci').val() + $('select[name=extension]').val();
    if(contrasena1 != "" && contrasena1 == contrasena2){
        $('#alertaContrasena').removeClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeOut();
        contrasena = contrasena1;
        error = false;
    }
    else{
        $('#alertaContrasena').addClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeIn();
        $('#contrasena1').focus();
        error = true;
    }
    if( $('#aceptar').prop('checked') ) {
        $('#alertaAceptar').removeClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeOut();
        error = false;
    }
    else{
        $('#alertaAceptar').addClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeIn();
        error = true;
    }
    if(error)
        return;
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'insertar',
        'nombres': $('#nombres').val(),
        'apellidos': $('#nombres').val(),
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
    window.location.href = "index.html";
}