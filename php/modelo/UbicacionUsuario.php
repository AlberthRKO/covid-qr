<?php

    class UbicacionUsuario{
        public $idUbicacionUsuario;
        public $fecha;
        public $activo;
        public $idUsuario;
        public $idUbicacion;


        
        public function __construct($idUbicacionUsuario,$fecha,$activo,$idUsuario,$idUbicacion) {
            $this->idUbicacionUsuario = $idUbicacionUsuario;
            $this->fecha = $fecha;
            $this->activo = $activo;
            $this->idUsuario = $idUsuario;
            $this->idUbicacion = $idUbicacion;
        }

        public static function insertar($ubicacionUsuario){
            include('../connection.php');
            date_default_timezone_set ("America/La_Paz");
            $hoy = getdate();
            $now = $hoy['year']."/".$hoy['mon']."/".$hoy['mday']." ".$hoy['hours'].":".$hoy['minutes'].":".$hoy['seconds'];
            $query = $db->prepare("INSERT INTO ubicacionusuarios(FECHA,IDUSUARIO,IDUBICACION)VALUES('$now',?,?)");

            $query->bind_param("ii", $ubicacionUsuario->idUsuario, $ubicacionUsuario->idUbicacion);

            if($query->execute()){
                $query->close();
                return "OK";
                
            } else {
                $error = "Error al realizar la consulta: ".$query->error;
                $query->close();
                return $error;
            }
        }

        public static function getTodosUsuariosQRConfirmados($idUbicacion){
            include('../connection.php');
            $query = $db->prepare("SELECT U.IDUSUARIO, U.CI, U.NOMBRES, U.APELLIDOS, U.TELEFONO, U.CORREO, U.ROL, U.ESTADO, U.EJEX, U.EJEY, U.ACTIVO
                                   FROM usuarios U INNER JOIN ubicacionusuarios UU on U.IDUSUARIO=UU.IDUSUARIO
                                   WHERE U.ESTADO='CONFIRMADO' AND U.ACTIVO='1' AND UU.IDUBICACION=?
                                   AND DAY(UU.FECHA)=DAY(NOW()) AND MONTH(UU.FECHA)=MONTH(NOW()) AND YEAR(UU.FECHA)=YEAR(NOW())
                                   GROUP BY U.IDUSUARIO");
            $query->bind_param("i", $idUbicacion);
            $usuarios = array();
            //Ejecutamos la consulta
            if($query->execute()){
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$rol,$estado,$ejeX,$ejeY,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $usuarioActual = new Usuario($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,"",$rol,$estado,$ejeX,$ejeY,$activo);
                    array_push($usuarios,$usuarioActual);
                }
                //Cerramos la conexion
                $query->close();
                return $usuarios;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getQRRegistrados($idUsuario){
            include('../connection.php');
            $query = $db->prepare("SELECT UU.IDUBICACIONUSUARIO,UB.NOMBRE,UU.FECHA,UU.IDUSUARIO,UU.IDUBICACION
                                   FROM usuarios U INNER JOIN ubicacionusuarios UU
                                   ON U.IDUSUARIO=UU.IDUSUARIO INNER JOIN ubicaciones UB
                                   ON UB.IDUBICACION=UU.IDUBICACION
                                   WHERE U.IDUSUARIO=? AND DAY(UU.FECHA)=DAY(NOW()) AND MONTH(UU.FECHA)=MONTH(NOW()) AND YEAR(FECHA)=YEAR(NOW())
                                   ORDER BY UU.FECHA DESC");
                                   
            $query->bind_param("i", $idUsuario);
            $ubicaciones = array();
            //Ejecutamos la consulta
            if($query->execute()){
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUbicacionUsuario,$nombre,$fecha,$idUsuario,$idUbicacion);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $ubicacion = [
                        'idUbicacionUsuario' => $idUbicacionUsuario,
                        'nombre' => $nombre,
                        'fecha' => $fecha,
                        'idUsuario' => $idUsuario,
                        'idUbicacion' => $idUbicacion
                    ];
                    array_push($ubicaciones,$ubicacion);
                }
                //Cerramos la conexion
                $query->close();
                return $ubicaciones;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
    }
?>