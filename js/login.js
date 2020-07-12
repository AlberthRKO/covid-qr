$('#btnIniciar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    window.location.href = "index.html";
});

function hayError(){
    let ci = $('#ci').val().trim() + $('select[name=extension]').val();
    let contrasena = $('#contrasena').val();
    let errorCi = validarCi(ci);
    let errorContrasena = validarContrasena(contrasena);
    let usuario = getUsuario(ci,contrasena);
    let errorUsuario = validarUsuario(usuario);

    if(errorCi || errorContrasena || errorUsuario)
        return true;
    else{
        sessionStorage.usuario = JSON.stringify(usuario);
    }
}

function validarCi(ci){
    if(ci == ""){
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje').fadeIn();
        $('#ci').focus();
        return true;
    }
    else{
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje').fadeOut();
        return false;
    }
}

function validarContrasena(contrasena){
    if(contrasena == ""){
        $('#alertaContrasena').addClass("alert alert-danger");
        $('#alertaContrasenaMensaje1').fadeIn();
        $('#contrasena').focus();
        return true;
    }
    else{
        $('#alertaContrasena').removeClass("alert alert-danger");
        $('#alertaContrasenaMensaje1').fadeOut();
        return false;
    }
}

function getUsuario(ci,contrasena){
    let usuario;
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getByCiContrasena',
        'ci': ci,
        'contrasena': contrasena
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success : result => {
            usuario = result.trim();
        }
    });
    return usuario;
}

function validarUsuario(usuario){
    if(usuario == "empty"){
        $('#alertaContrasena').addClass("alert alert-danger");
        $('#alertaContrasenaMensaje2').fadeIn();
        $('#contrasena').focus();
        return true;
    }
}