<?php
    class Ubicacion{
        public $idUbicacion;
        public $nombre;
        public $descripcion;
        public $gravedad;
        public $ejeX;
        public $ejeY;
        public $activo;
        
        public function __construct($idUbicacion,$nombre,$descripcion,$gravedad,$ejeX,$ejeY,$activo) {
            $this->idUbicacion = $idUbicacion;
            $this->nombre = $nombre;
            $this->descripcion = $descripcion;
            $this->gravedad = $gravedad;
            $this->ejeX = $ejeX;
            $this->ejeY = $ejeY;
            $this->activo = $activo;
        }

        public static function insertar($ubicacion){
            include('../connection.php');
            $query = $db->prepare("INSERT INTO ubicaciones(NOMBRE,DESCRIPCION,GRAVEDAD,EJEX,EJEY)VALUES(?,?,?,?,?)");

            $query->bind_param("sssss", $ubicacion->nombre,$ubicacion->descripcion,$ubicacion->gravedad,$ubicacion->ejeX, $ubicacion->ejeY);

            if($query->execute()){
	            return "Datos agregados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function editar($ubicacion){
            include('../connection.php');
            $query = $db->prepare("UPDATE ubicaciones SET NOMBRE=?,EJEX=?,EJEY=? WHERE IDUBICACION=?");

            $query->bind_param("sssi", $ubicacion->nombre,$ubicacion->ejeX, $ubicacion->ejeY,$ubicacion->idUbicacion);

            if($query->execute()){
	            return "Datos editados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idUbicacion){
            include('../connection.php');
            $query = $db->prepare("UPDATE ubicaciones SET ACTIVO='0' WHERE IDUBICACION=?");

            $query->bind_param("i",$idUbicacion);

            if($query->execute()){
	            return "Datos eliminados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getTodasUbicaciones(){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM ubicaciones WHERE ACTIVO='1'");

            $ubicaciones = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUbicacion,$nombre,$descripcion,$gravedad,$ejeX,$ejeY,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $ubicacionActual = new Ubicacion($idUbicacion,$nombre,$descripcion,$gravedad,$ejeX,$ejeY,$activo);
                    array_push($ubicaciones,$ubicacionActual);
                }
                //Cerramos la conexion
                $query->close();
                return $ubicaciones;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
    }
?>