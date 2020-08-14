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
    case "getGravedad":
      $idUbicacion = $_POST['idUbicacion'];
      $latitud = $_POST['ejeX'];
      $longitud = $_POST['ejeY'];
      $usuarios = UbicacionUsuario::getTodosUsuariosQRConfirmados($idUbicacion);
      $usuariosConfirmados = Usuario::getTodosUsuariosConfirmados();
      $casosQR = count($usuarios);
      $casosCercanos = 0;
      foreach($usuariosConfirmados as $usuario){
        $distancia = distance($usuario->ejeX,$usuario->ejeY,$latitud,$longitud);
        if($distancia < 110)
          $casosCercanos++;
      }
      $casos = $casosQR + $casosCercanos;
      if($casos <= 5)
        $gravedad = "BAJO";
      else{
        if($casos <= 10)
          $gravedad = "MEDIO";
        else
          $gravedad = "ALTO";
      }
      echo $gravedad;
    break;
  }
                  ///y       x      y     x pero para nosotros al reves por gil
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