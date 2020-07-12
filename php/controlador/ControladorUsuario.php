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
    case "getByCiContrasena":
      $ci = $_POST['ci'];
      $contrasena = $_POST['contrasena'];
      $usuario = Usuario::getByCiContrasena($ci,$contrasena);
      if($usuario != null)
        echo json_encode($usuario);
      else
        echo "empty";
    break;
    case "getByCi":
      $ci = $_POST['ci'];
      $usuario = Usuario::getByCi($ci);
      if($usuario != null)
        echo $usuario;
      else
        echo "empty";
    break;
  }
?>