<?php
  include('../modelo/UbicacionUsuario.php');
  include('../modelo/Usuario.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $idUsuario = $_POST['idUsuario'];
      $idUbicacion = $_POST['idUbicacion'];

      $ubicacionUsuario = new UbicacionUsuario(1,"","1",$idUsuario,$idUbicacion);
      $result = UbicacionUsuario::insertar($ubicacionUsuario);
      echo $result;
    break;
    case "getTodosUsuariosQRConfirmados":
      $idUbicacion = $_POST['idUbicacion'];
      $usuarios = UbicacionUsuario::getTodosUsuariosQRConfirmados($idUbicacion);
      if($usuarios != null)
        echo json_encode($usuarios);
      else
        echo "empty";
    break;
  }
?>