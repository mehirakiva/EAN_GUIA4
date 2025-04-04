-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2025 a las 01:32:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `auth_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_envio`
--

CREATE TABLE `estado_envio` (
  `id` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_pedido` int(11) NOT NULL,
  `transportadora_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `estado` enum('preparacion','transito','entregado','cancelado') DEFAULT 'preparacion',
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_envio`
--

INSERT INTO `estado_envio` (`id`, `fecha`, `id_pedido`, `transportadora_id`, `cliente_id`, `estado`, `observaciones`) VALUES
(1, '2025-04-01 22:56:06', 4, 4, 5, 'entregado', '                                                            Esta todo roto222222222\r\n          \r\n          \r\n          \r\n          \r\n          '),
(2, '2025-04-01 23:15:53', 5, 4, 6, 'entregado', NULL),
(3, '2025-04-01 23:16:17', 6, 5, 6, 'cancelado', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `estado_pedido` enum('pendiente','procesando','enviado','entregado','cancelado') DEFAULT 'pendiente',
  `producto` varchar(255) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `transportadora_id` int(11) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha_pedido`, `estado_pedido`, `producto`, `cliente_id`, `transportadora_id`, `ruta`, `observaciones`) VALUES
(4, '2025-04-01 17:20:05', 'pendiente', 'bolso', 5, 3, 'Bogota-Colombia', '👽'),
(5, '2025-04-01 18:05:11', 'pendiente', 'bolso', 6, 4, 'Bogota-Colombia', ''),
(6, '2025-04-01 18:15:25', 'enviado', 'bolso', 6, 5, 'Bogota-Colombia', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `id` int(11) NOT NULL,
  `ruta_origen` varchar(255) NOT NULL,
  `ruta_descanso` varchar(255) DEFAULT NULL,
  `ruta_destino` varchar(255) NOT NULL,
  `ruta_llegada` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutas`
--

INSERT INTO `rutas` (`id`, `ruta_origen`, `ruta_descanso`, `ruta_destino`, `ruta_llegada`, `created_at`, `updated_at`) VALUES
(2, 'Bogota', 'Melgar', 'Girardot', '12:08:00', '2025-04-01 05:08:56', '2025-04-01 05:08:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportadoras`
--

CREATE TABLE `transportadoras` (
  `id` int(11) NOT NULL,
  `nombre_transportadora` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transportadoras`
--

INSERT INTO `transportadoras` (`id`, `nombre_transportadora`, `created_at`, `updated_at`) VALUES
(2, 'InterRapidisimo', '2025-04-01 04:07:04', '2025-04-01 04:07:04'),
(3, 'Rappi', '2025-04-01 04:07:10', '2025-04-01 04:07:10'),
(4, 'Coordinadora', '2025-04-01 04:07:15', '2025-04-01 22:40:01'),
(5, 'Envia', '2025-04-01 22:38:29', '2025-04-01 22:38:41'),
(7, 'Sevientrega', '2025-04-01 22:40:15', '2025-04-01 22:40:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','cliente') DEFAULT 'cliente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(3, 'admins', 'admin@admin.com', '$2b$10$k8yBPPGH9D3jZLKT8HhAgOGe093cvSfJWpB43u2UXhXheZhTzHQmi', 'admin', '2025-04-01 03:53:43'),
(5, 'stevens', 'herrebra7@gmail.com', '$2b$10$EnhNl.dPnusy7oCcTNAbvOxqRHHCuURrSmEax5EA2S0UzOA4mFI6W', 'cliente', '2025-04-01 22:19:40'),
(6, 'ingris', 'ingris@ingris.com', '$2b$10$THovxa11VU304PyitTkNlOEysXIx0ZKNq7UXC5W.hXIkLq9hM.7t2', 'cliente', '2025-04-01 23:04:52');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estado_envio`
--
ALTER TABLE `estado_envio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `transportadora_id` (`transportadora_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `transportadora_id` (`transportadora_id`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transportadoras`
--
ALTER TABLE `transportadoras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado_envio`
--
ALTER TABLE `estado_envio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transportadoras`
--
ALTER TABLE `transportadoras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estado_envio`
--
ALTER TABLE `estado_envio`
  ADD CONSTRAINT `estado_envio_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `estado_envio_ibfk_2` FOREIGN KEY (`transportadora_id`) REFERENCES `transportadoras` (`id`),
  ADD CONSTRAINT `estado_envio_ibfk_3` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`transportadora_id`) REFERENCES `transportadoras` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
