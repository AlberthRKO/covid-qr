<?php
use PHPUnit\Framework\TestCase;

final class TestUsuario extends TestCase{


    public function testLogin(): void {
        include('../modelo/Usuario.php');
        
        $ci='1033CH.';
        $contrasena='1234';
        $this->assertInstanceOf(
            Usuario::class,
            Usuario::getByCiContrasena($ci,$contrasena)
        );
    }

    public function testExisteUsuarioPorCI(): void {
        $ci='1033CH.';
        $this->assertEquals(
            "exists",
            Usuario::getByCi($ci)
        );
    }
}