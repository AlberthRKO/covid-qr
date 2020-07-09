<?php
  include('../modelo/UbicacionUsuario.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $idUsuario = $_POST['idUsuario'];
      $idUbicacion = $_POST['idUbicacion'];

      $ubicacionUsuario = new UbicacionUsuario(1,"","1",$idUsuario,$idUbicacion);
      $result = UbicacionUsuario::insertar($ubicacionUsuario);
      echo $result;
    break;
  }
?>