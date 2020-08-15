<?php
  include('../modelo/HospitalUsuario.php');
  include('../modelo/Usuario.php');
  include('../modelo/Hospital.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $idUsuario = $_POST['idUsuario'];
      $idHospital = $_POST['idHospital'];

      $hospitalUsuario = new HospitalUsuario(1,"","1",$idHospital,$idUsuario);
      $result = HospitalUsuario::insertar($hospitalUsuario);
      echo $result;
    break;
    case "editar":
      $idUsuario = $_POST['idUsuario'];
      $idHospital = $_POST['idHospital'];

      $result = HospitalUsuario::editar($idHospital,$idUsuario);
      echo $result;
    break;
    case "getTodosUsuariosHospitalizados":
      $idHospital = $_POST['idHospital'];
      $usuarios = HospitalUsuario::getTodosUsuariosHospitalizados($idHospital);
      if($usuarios != null)
        echo json_encode($usuarios);
      else
        echo "empty";
    break;
    case "getHospitalUsuario":
      $idUsuario = $_POST['idUsuario'];
      $hospital = HospitalUsuario::getHospitalUsuario($idUsuario);
      if($hospital != null)
        echo json_encode($hospital);
      else
        echo "empty";
    break;
  }
?>