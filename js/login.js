var error = false;
function login(e){
    e.preventDefault();
    let ci = $('#ci').val() + $('select[name=extension]').val();
    let contrasena = $('#contrasena').val();
    if($('#ci').val() == ""){
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje').fadeIn();
        $('#ci').focus();
        error = true;
    }
    else{
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje').fadeOut();
        error = false;
    }
    if(error)
        return;
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
        success: result => {
            console.log(result);
        }
    });
    sessionStorage.ci = ci;
    window.location.href = "index.html";
}