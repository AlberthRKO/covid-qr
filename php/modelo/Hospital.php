<?php
    class Hospital{
        public $idHospital;
        public $nombre;
        public $ejeX;
        public $ejeY;
        public $descripcion;
        public $activo;
        
        public function __construct($idHospital, $nombre, $ejeX, $ejeY, $descripcion, $activo) {
            $this->idHospital = $idHospital;
            $this->nombre = $nombre;
            $this->ejeX = $ejeX;
            $this->ejeY = $ejeY;
            $this->descripcion = $descripcion;
            $this->activo = $activo;
        }

        public static function insertar($hospital){
            include('../connection.php');
            $query = $db->prepare("INSERT INTO hospitales(NOMBRE,EJEX,EJEY,DESCRIPCION)VALUES(?,?,?,?)");

            $query->bind_param("ssss", $hospital->nombre, $hospital->ejeX, $hospital->ejeY, $hospital->descripcion);

            if($query->execute()){
	            return "Datos agregados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function editar($hospital){
            include('../connection.php');
            $query = $db->prepare("UPDATE hospitales SET NOMBRE=?,EJEX=?,EJEY=? WHERE IDHOSPITAL=?");

            $query->bind_param("sssi", $hospital->nombre,$hospital->ejeX,$hospital->ejeY,$hospital->idHospital);

            if($query->execute()){
	            return "Datos editados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idHospital){
            include('../connection.php');
            $query = $db->prepare("UPDATE hospitales SET ACTIVO='0' WHERE IDHOSPITAL=?");

            $query->bind_param("i", $idHospital);

            if($query->execute()){
	            return "Datos eliminados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getTodosHospitales(){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM hospitales WHERE ACTIVO='1'");

            $hospitales = array();
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
                    $hospitalActual = new Hospital($idHospital, $nombre, $ejeX, $ejeY, $descripcion, $activo);
                    array_push($hospitales, $hospitalActual);
                }
                //Cerramos la conexion
                $query->close();
                return $hospitales;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
    }
?>