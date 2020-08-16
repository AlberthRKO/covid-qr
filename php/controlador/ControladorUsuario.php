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
    case "editar":
      $idUsuario = $_POST['idUsuario'];
      $ci = $_POST['ci'];
      $nombres = $_POST['nombres'];
      $apellidos = $_POST['apellidos'];
      $estado = $_POST['estado'];
      $usuario = new Usuario($idUsuario,$ci,$nombres,$apellidos,'','','','',$estado,'','','1');
      Usuario::editar($usuario);
    break;
    case "eliminar":
      $idUsuario = $_POST['idUsuario'];
      Usuario::eliminar($idUsuario);
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
        echo json_encode($usuario);
      else
        echo "empty";
    break;
    case "getTodosUsuarios":
      $usuarios = Usuario::getTodosUsuarios();
      if($usuarios != null)
        echo json_encode($usuarios);
      else
        echo "empty";
    break;
    case "getTodosUsuariosConfirmados":
      $usuarios = Usuario::getTodosUsuariosConfirmados();
      if($usuarios != null)
        echo json_encode($usuarios);
      else
        echo "empty";
    break;
    case "getTodosUsuariosConfirmadosCercanosQR":
      $latitud = $_POST['ejeX'];
      $longitud = $_POST['ejeY'];
      $usuarios = Usuario::getTodosUsuariosConfirmados();
      $usuariosCercanos = array();
      foreach($usuarios as $usuario){
        $distancia = distance($usuario->ejeX,$usuario->ejeY,$latitud,$longitud);
        if($distancia < 110)
          array_push($usuariosCercanos, $usuario);
      }
      if(count($usuariosCercanos) > 0)
        echo json_encode($usuariosCercanos);
      else
        echo "empty";
    break;
  }

  function distance($lat1, $lon1, $lat2, $lon2) {

    $theta = $lon1 - $lon2;
    $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $km = $dist * 60 * 1.1515 * 1.609344;
    $metros = $km*1000;

    return $metros;
  }
?>