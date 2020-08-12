<?php
  include('../modelo/Hospital.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $nombre = $_POST['nombre'];
      $ejeX = $_POST['ejeX'];
      $ejeY = $_POST['ejeY'];
      $descripcion = $_POST['descripcion'];
      $hospital = new Hospital(1,$nombre,$ejeX,$ejeY,$descripcion,'1');
      Hospital::insertar($hospital);
    break;
    case "editar":
      $idHospital = $_POST['idHospital'];
      $nombre = $_POST['nombre'];
      $ejeX = $_POST['ejeX'];
      $ejeY = $_POST['ejeY'];
      $hospital = new Hospital($idHospital,$nombre,$ejeX,$ejeY,'','1');
      Hospital::editar($hospital);
    break;
    case "eliminar":
      $idHospital = $_POST['idHospital'];
      Hospital::eliminar($idHospital);
    break;
    case "getTodosHospitales":
      $hospitales = Hospital::getTodosHospitales();
      if($hospitales != null)
        echo json_encode($hospitales);
      else
        echo "empty";
    break;
  }
?>