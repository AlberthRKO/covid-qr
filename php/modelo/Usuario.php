<?php
    class Usuario{
        public $idUsuario;
        public $ci;
        public $nombres;
        public $apellidos;
        public $telefono;
        public $correo;
        public $contrasena;
        public $rol;
        public $estado;
        public $ejeX;
        public $ejeY;
        public $activo;

        
        public function __construct($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo) {
            $this->idUsuario = $idUsuario;
            $this->ci = $ci;
            $this->nombres = $nombres;
            $this->apellidos = $apellidos;
            $this->telefono = $telefono;
            $this->correo = $correo;
            $this->contrasena = $contrasena;
            $this->rol = $rol;
            $this->estado = $estado;
            $this->ejeX = $ejeX;
            $this->ejeY = $ejeY;
            $this->activo = $activo;
        }

        public static function insertar($usuario){
            include('../connection.php');
            $query = $db->prepare("INSERT INTO usuarios(CI,NOMBRES,APELLIDOS,TELEFONO,CORREO,CONTRASENA,ROL,EJEX,EJEY)VALUES(?,?,?,?,?,?,?,?,?)");

            $query->bind_param("sssssssss", $usuario->ci, $usuario->nombres, $usuario->apellidos, $usuario->telefono, $usuario->correo, $usuario->contrasena, $usuario->rol, $usuario->ejeX, $usuario->ejeY);

            if($query->execute()){
	            return "Datos agregados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function editar($usuario){
            include('../connection.php');
            $query = $db->prepare("UPDATE usuarios SET NOMBRES=?,APELLIDOS=?,CI=?,ESTADO=? WHERE IDUSUARIO=?");

            $query->bind_param("ssssi", $usuario->nombres, $usuario->apellidos,$usuario->ci,$usuario->estado,$usuario->idUsuario);

            if($query->execute()){
	            return "Datos editados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idUsuario){
            include('../connection.php');
            $query = $db->prepare("UPDATE usuarios SET ACTIVO='0' WHERE IDUSUARIO=?");

            $query->bind_param("i", $idUsuario);

            if($query->execute()){
	            return "Datos eliminados correctamente";
                $query->close();
                
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getByCiContrasena($ci,$contrasena){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM usuarios WHERE CI=? AND CONTRASENA=? AND ACTIVO='1'");

            $query->bind_param("ss", $ci,$contrasena);
            $usuario = null;
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $usuario = new Usuario($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo);
                }
                //Cerramos la conexion
                $query->close();
                return $usuario;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getByCi($ci){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM usuarios WHERE CI=? AND ACTIVO='1'");

            $query->bind_param("s", $ci);
            $usuario = null;
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $usuario = "exists";
                }
                //Cerramos la conexion
                $query->close();
                return $usuario;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getTodosUsuarios(){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM usuarios WHERE ACTIVO='1'");

            $usuarios = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $usuarioActual = new Usuario($idUsuario,$ci,$nombres,$apellidos,$telefono,$correo,$contrasena,$rol,$estado,$ejeX,$ejeY,$activo);
                    array_push($usuarios,$usuarioActual);
                }
                //Cerramos la conexion
                $query->close();
                return $usuarios;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
    }
?>