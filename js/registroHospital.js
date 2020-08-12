var hospitales;

$('#btnRegistrar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    insertar();
    limpiar();
    swal("Guardado", "Registro exitoso !", "success");
});

$('#btnUbicacion').click(function(){
    setTodosHospitales();
    dibujarMapaHospital(hospitales, false);
});

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

function limpiar(){
    $('#nombre').val("");
    $('#ejeX').val("");
    $('#ejeY').val("");
    $('#descripcion').val("");
}

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

function insertar(){
    let nombre = $('#nombre').val().trim();
    let ejeX = $('#ejeX').val().trim();
    let ejeY = $('#ejeY').val().trim();
    let descripcion = $('#descripcion').val().trim();
    url="php/controlador/ControladorHospital.php";
    data = {
        request: 'insertar',
        nombre: nombre,
        ejeX: ejeX,
        ejeY: ejeY,
        descripcion: descripcion
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
}

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