<?php

    class HospitalUsuario{
        public $idHospitalUsuario;
        public $fecha;
        public $activo;
        public $idHospital;
        public $idUsuario;


        
        public function __construct($idHospitalUsuario,$fecha,$activo,$idHospital,$idUsuario) {
            $this->idHospitalUsuario = $idHospitalUsuario;
            $this->fecha = $fecha;
            $this->activo = $activo;
            $this->idHospital = $idHospital;
            $this->idUsuario = $idUsuario;
        }

        public static function insertar($hospitalUsuario){
            include('../connection.php');
            $query = $db->prepare("INSERT INTO hospitalusuarios(FECHA,IDHOSPITAL,IDUSUARIO)VALUES(NOW(),?,?)");

            $query->bind_param("ii", $hospitalUsuario->idHospital, $hospitalUsuario->idUsuario);

            if($query->execute()){
                $query->close();
                return "OK";
                
            } else {
                $error = "Error al realizar la inserción: ".$query->error;
                $query->close();
                return $error;
            }
        }

        public static function editar($idHospital,$idUsuario){
            include('../connection.php');
            $query = $db->prepare("UPDATE hospitalusuarios SET IDHOSPITAL=? WHERE IDUSUARIO=?");

            $query->bind_param("ii", $idHospital,$idUsuario);

            if($query->execute()){
                $query->close();
                return "OK";
                
            } else {
                $error = "Error al realizar la inserción: ".$query->error;
                $query->close();
                return $error;
            }
        }

        public static function getTodosUsuariosHospitalizados($idHospital){
            include('../connection.php');
            $query = $db->prepare("SELECT U.IDUSUARIO,U.CI,U.NOMBRES,U.APELLIDOS,U.TELEFONO,U.CORREO,U.ROL,U.ESTADO,U.EJEX,U.EJEY,U.ACTIVO
                                   FROM usuarios U INNER JOIN hospitalusuarios H ON U.IDUSUARIO=H.IDUSUARIO
                                   WHERE H.IDHOSPITAL=? AND H.ACTIVO='1' AND U.ACTIVO='1' AND U.ESTADO='CONFIRMADO'");
            $query->bind_param("i", $idHospital);
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

        public static function getHospitalUsuario($idUsuario){
            include('../connection.php');
            $query = $db->prepare("SELECT H.IDHOSPITAL,H.NOMBRE,H.EJEX,H.EJEY,H.DESCRIPCION,HU.ACTIVO
                                   FROM hospitales h INNER JOIN hospitalusuarios HU ON H.IDHOSPITAL=HU.IDHOSPITAL
                                   WHERE HU.IDUSUARIO=?");
            $query->bind_param("i", $idUsuario);
            $hospital = null;
            //Ejecutamos la consulta
            if($query->execute()){
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idHospital, $nombre, $ejeX, $ejeY, $descripcion, $activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $hospital = new Hospital($idHospital, $nombre, $ejeX, $ejeY, $descripcion, $activo);
                }
                //Cerramos la conexion
                $query->close();
                return $hospital;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
    }
?>
