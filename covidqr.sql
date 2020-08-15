-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-08-2020 a las 19:00:35
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
-- Estructura de tabla para la tabla `hospitales`
--

CREATE TABLE `hospitales` (
  `IDHOSPITAL` int(11) NOT NULL,
  `NOMBRE` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `EJEX` varchar(50) COLLATE utf8_bin NOT NULL,
  `EJEY` varchar(50) COLLATE utf8_bin NOT NULL,
  `DESCRIPCION` varchar(200) COLLATE utf8_bin NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `hospitales`
--

INSERT INTO `hospitales` (`IDHOSPITAL`, `NOMBRE`, `EJEX`, `EJEY`, `DESCRIPCION`, `ACTIVO`) VALUES
(1, 'IPTK', '-19.04548190388049', '-65.25780590713197', '', '1'),
(2, 'HOSPITAL UNIVERSITARIO', '-19.02833167224676', '-65.25700395977172', 'ESTO ES UNA DESCRIPCION', '1'),
(3, 'HOSPITAL SANTA BARBARA', '-19.044756349616137', '-65.26269801049804', '', '1'),
(4, 'HOSPITAL LUIS ESPINAL', '-19.025424434853893', '-65.23915629348757', '', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospitalusuarios`
--

CREATE TABLE `hospitalusuarios` (
  `IDHOSPITALUSUARIO` int(11) NOT NULL,
  `FECHA` date DEFAULT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1',
  `IDHOSPITAL` int(11) NOT NULL,
  `IDUSUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `hospitalusuarios`
--

INSERT INTO `hospitalusuarios` (`IDHOSPITALUSUARIO`, `FECHA`, `ACTIVO`, `IDHOSPITAL`, `IDUSUARIO`) VALUES
(4, '2020-08-15', '1', 2, 24),
(5, '2020-08-15', '1', 4, 25),
(6, '2020-08-15', '1', 4, 22),
(7, '2020-08-15', '1', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `IDUBICACION` int(11) NOT NULL,
  `NOMBRE` varchar(60) COLLATE utf8_bin NOT NULL,
  `DESCRIPCION` varchar(200) COLLATE utf8_bin NOT NULL,
  `GRAVEDAD` varchar(10) COLLATE utf8_bin NOT NULL,
  `EJEX` varchar(50) COLLATE utf8_bin NOT NULL,
  `EJEY` varchar(50) COLLATE utf8_bin NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`IDUBICACION`, `NOMBRE`, `DESCRIPCION`, `GRAVEDAD`, `EJEX`, `EJEY`, `ACTIVO`) VALUES
(1, 'PARADA RAVELO', 'MERCADO INFORMAL', 'BAJO', '-19.025686871471983', '-65.27805335561142', '1'),
(2, 'MERCADO CAMPESINO', 'MERCADO CON ALTA INCURRENCIA', 'ALTO', '-19.03327526175185', '-65.25370631534423', '1'),
(4, 'FACULTAD DE MEDICINA', 'CONCURRENCIA DE ESTUDIANTES', 'MEDIO', '-19.0460346', '-65.2683296', '1'),
(6, 'Mercado central', '', 'MEDIO', '-19.044495531233263', '-65.25893755345916', '1'),
(7, 'ASDF 2', '', 'MEDIO', '-19.0119936', '-65.273856', '1'),
(8, 'ASDF 1', '', 'MEDIO', '-19.01116689598012', '-65.27384527116394', '1'),
(9, 'MERCADO YURAC YURAC', 'asdf', 'MEDIO', '-19.029529734369284', '-65.27475815106506', '1');

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
(1, '2020-07-09 01:07:35', '1', 4, 1),
(2, '2020-08-12 01:00:00', '1', 4, 1),
(3, '2020-08-12 00:00:00', '1', 19, 1),
(4, '2020-08-12 13:00:00', '1', 19, 1),
(5, '2020-08-12 00:00:00', '1', 19, 2),
(6, '2020-08-13 00:00:00', '1', 19, 1),
(7, '2020-08-13 00:00:00', '1', 4, 1),
(8, '2020-08-13 00:00:00', '1', 22, 1),
(9, '2020-08-13 00:00:00', '1', 22, 1),
(10, '2020-08-13 00:00:00', '1', 19, 2);

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
  `CONTRASENA` varchar(20) COLLATE utf8_bin NOT NULL,
  `ROL` char(1) COLLATE utf8_bin DEFAULT NULL,
  `ESTADO` varchar(10) COLLATE utf8_bin DEFAULT 'NORMAL',
  `EJEX` varchar(50) COLLATE utf8_bin NOT NULL,
  `EJEY` varchar(50) COLLATE utf8_bin NOT NULL,
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`IDUSUARIO`, `CI`, `NOMBRES`, `APELLIDOS`, `TELEFONO`, `CORREO`, `CONTRASENA`, `ROL`, `ESTADO`, `EJEX`, `EJEY`, `ACTIVO`) VALUES
(4, '1033CH.', 'ALVARO', 'ZAPATA', '', 'V170ZAM@GMAIL.COM', '1234', '2', 'RECUPERADO', '-19.6548468', '-65.2782766', '1'),
(14, '14258827CH.', 'Alberth', 'Paredes', '', 'orlando.alb77@gmail.com', 'huevos12345', '2', 'NORMAL', '-19.038316', '-65.256559', '0'),
(19, '1234TJ.', 'Prueba 1', 'Perez 1', '', '', '1234', '1', 'CONFIRMADO', '-19.0119936', '-65.273856', '1'),
(20, '4567PD.', 'Prueba 2', 'Perez 2', '', '', '1234', '1', 'RECUPERADO', '-19.013058672740094', '-65.27422614484405', '1'),
(21, '7890SC.', 'Prueba 3', 'Perez 3', '', '', '1234', '1', 'FALLECIDO', '-19.01334269098526', '-65.27299769311523', '1'),
(22, '10333CH.', 'PRO', 'PAPI', '', '', '123', '1', 'CONFIRMADO', '-19.032724594987403', '-65.27295034218902', '0'),
(23, '123CH.', 'POPO', 'PANTALONES', '', '', 'asd', '1', 'RECUPERADO', '-19.03331791947911', '-65.27473669339294', '1'),
(24, '123456789CH.', 'PRUEBA 5', 'AAAAA', '', '', '1234', '1', 'CONFIRMADO', '-19.03274828204976', '-65.25436170487976', '1'),
(25, '1234567891CH.', 'ARMANDO', 'PAREDES', '', '', 'ASDF', '1', 'RECUPERADO', '-19.03330777719791', '-65.25374036122436', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hospitales`
--
ALTER TABLE `hospitales`
  ADD PRIMARY KEY (`IDHOSPITAL`);

--
-- Indices de la tabla `hospitalusuarios`
--
ALTER TABLE `hospitalusuarios`
  ADD PRIMARY KEY (`IDHOSPITALUSUARIO`),
  ADD KEY `IDHOSPITAL` (`IDHOSPITAL`),
  ADD KEY `IDUSUARIO` (`IDUSUARIO`);

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
-- AUTO_INCREMENT de la tabla `hospitales`
--
ALTER TABLE `hospitales`
  MODIFY `IDHOSPITAL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `hospitalusuarios`
--
ALTER TABLE `hospitalusuarios`
  MODIFY `IDHOSPITALUSUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `IDUBICACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `ubicacionusuarios`
--
ALTER TABLE `ubicacionusuarios`
  MODIFY `IDUBICACIONUSUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IDUSUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hospitalusuarios`
--
ALTER TABLE `hospitalusuarios`
  ADD CONSTRAINT `hospitalusuarios_ibfk_1` FOREIGN KEY (`IDHOSPITAL`) REFERENCES `hospitales` (`IDHOSPITAL`),
  ADD CONSTRAINT `hospitalusuarios_ibfk_2` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuarios` (`IDUSUARIO`);

--
-- Filtros para la tabla `ubicacionusuarios`
--
ALTER TABLE `ubicacionusuarios`
  ADD CONSTRAINT `ubicacionusuarios_ibfk_1` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuarios` (`IDUSUARIO`),
  ADD CONSTRAINT `ubicacionusuarios_ibfk_2` FOREIGN KEY (`IDUBICACION`) REFERENCES `ubicaciones` (`IDUBICACION`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
