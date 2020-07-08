<?php
  include('../modelo/Usuario.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $ci = $_POST['ci'];
      $nombres = $_POST['nombres'];
      $apellidos = $_POST['apellidos'];
      $telefono = $_POST['telefono'];
      $correo = $_POST['correo'];
      $contrasena = $_POST['contrasena'];
      $rol = $_POST['rol'];
      $estado = $_POST['estado'];
      $ejeX = $_POST['ejeX'];
      $ejeY = $_POST['ejeY'];
      $usuario = new Usuario(1,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,'1');
      Usuario::insertar($usuario);
    break;
    case "getByCI":
      $ci = $_POST['ci'];
      $usuario = Usuario::getByCI($ci);
      if($usuario != null)
        echo json_encode($usuario);
      else
        echo "empty";
    break;
  }
?>