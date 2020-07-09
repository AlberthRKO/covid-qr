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
            $query = $db->prepare("INSERT INTO ubicacionusuarios(FECHA,IDUSUARIO,IDUBICACION)VALUES(NOW(),?,?)");

            $query->bind_param("ii", $ubicacionUsuario->idUsuario, $ubicacionUsuario->idUbicacion);

            if($query->execute()){
                $query->close();
                return "OK";
                
            } else {
                $query->close();
                return "Error al realizar la consulta: ".$query->error;
            }
        }
        
    }
?>