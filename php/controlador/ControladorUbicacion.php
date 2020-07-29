<?php
  include('../modelo/Ubicacion.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $nombre = $_POST['nombre'];
      $descripcion = $_POST['descripcion'];
      $gravedad = "MEDIO";
      $ejeX = $_POST['ejeX'];
      $ejeY = $_POST['ejeY'];
      $ubicacion = new Ubicacion(1,$nombre,$descripcion,$gravedad,$ejeX,$ejeY,'1');
      Ubicacion::insertar($ubicacion);
    break;
    case "editar":
      $idUbicacion = $_POST['idUbicacion'];
      $nombre = $_POST['nombre'];
      $ejeX = $_POST['ejeX'];
      $ejeY = $_POST['ejeY'];
      $ubicacion = new Ubicacion($idUbicacion,$nombre,'','',$ejeX,$ejeY,'1');
      Ubicacion::editar($ubicacion);
    break;
    case "eliminar":
      $idUbicacion = $_POST['idUbicacion'];
      Ubicacion::eliminar($idUbicacion);
    break;
    case "getTodasUbicaciones":
      $ubicaciones = Ubicacion::getTodasUbicaciones();
      if($ubicaciones != null)
        echo json_encode($ubicaciones);
      else
        echo "empty";
    break;
  }
?>