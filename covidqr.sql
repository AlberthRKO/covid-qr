-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2020 a las 01:19:54
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `covidqr`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `IDUBICACION` int(11) NOT NULL,
  `NOMBRE` varchar(60) COLLATE utf8_bin NOT NULL,
  `Descripcion` varchar(200) COLLATE utf8_bin NOT NULL,
  `UBICACIONX` int(11) NOT NULL,
  `UBICACIONY` int(11) NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`IDUBICACION`, `NOMBRE`, `Descripcion`, `UBICACIONX`, `UBICACIONY`, `ACTIVO`) VALUES
(1, 'PARADA RAVELO', 'MERCADO INFORMAL', -19, -65, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacionusuarios`
--

CREATE TABLE `ubicacionusuarios` (
  `IDUBICACIONUSUARIO` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1',
  `IDUSUARIO` int(11) NOT NULL,
  `IDUBICACION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ubicacionusuarios`
--

INSERT INTO `ubicacionusuarios` (`IDUBICACIONUSUARIO`, `FECHA`, `ACTIVO`, `IDUSUARIO`, `IDUBICACION`) VALUES
(1, '2020-06-14 19:18:45', '1', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IDUSUARIO` int(11) NOT NULL,
  `CI` varchar(20) COLLATE utf8_bin NOT NULL,
  `NOMBRES` varchar(60) COLLATE utf8_bin NOT NULL,
  `APELLIDOS` varchar(60) COLLATE utf8_bin NOT NULL,
  `TELEFONO` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `CORREO` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `ROL` char(1) COLLATE utf8_bin DEFAULT NULL,
  `ESTADO` varchar(10) COLLATE utf8_bin DEFAULT 'NORMAL',
  `UBICACIONX` int(11) NOT NULL,
  `UBICACIONY` int(11) NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`IDUSUARIO`, `CI`, `NOMBRES`, `APELLIDOS`, `TELEFONO`, `CORREO`, `ROL`, `ESTADO`, `UBICACIONX`, `UBICACIONY`, `ACTIVO`) VALUES
(1, '1033', 'ALVA', 'ZAP', '793', 'V@GMAIL.COM', '2', 'NORMAL', -19, -65, '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`IDUBICACION`);

--
-- Indices de la tabla `ubicacionusuarios`
--
ALTER TABLE `ubicacionusuarios`
  ADD PRIMARY KEY (`IDUBICACIONUSUARIO`),
  ADD KEY `IDUSUARIO` (`IDUSUARIO`),
  ADD KEY `IDUBICACION` (`IDUBICACION`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IDUSUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `IDUBICACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `ubicacionusuarios`
--
ALTER TABLE `ubicacionusuarios`
  MODIFY `IDUBICACIONUSUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IDUSUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ubicacionusuarios`
--
ALTER TABLE `ubicacionusuarios`
  ADD CONSTRAINT `ubicacionusuarios_ibfk_1` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuarios` (`IDUSUARIO`),
  ADD CONSTRAINT `ubicacionusuarios_ibfk_2` FOREIGN KEY (`IDUBICACION`) REFERENCES `ubicaciones` (`IDUBICACION`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
