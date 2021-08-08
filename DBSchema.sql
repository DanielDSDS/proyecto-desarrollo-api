CREATE TABLE `Usuario` (
	`cedula` INT(255) NOT NULL,
	`id_carrera` INT(255) UNIQUE,
	`rol` varchar(255) NOT NULL DEFAULT 'Delegado',
	`is_admin` BOOLEAN NOT NULL DEFAULT 'false',
	`nombre` varchar(255) NOT NULL,
	`apellido` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`clave` varchar(255) NOT NULL,
	`telefono` VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (`cedula`)
);

CREATE TABLE `Interaccion` (
	`id` INT(255) NOT NULL AUTO_INCREMENT,
	`cedual_delegado` INT(255) NOT NULL,
	`cedula_profesor` INT(255) NOT NULL,
	`NRC` INT(255) NOT NULL,
	`nombre_materia` varchar(255) NOT NULL,
	`tipo` varchar(255) NOT NULL,
	`hora_inicio` DATETiME NOT NULL,
	`hora_fin` DATETIME NOT NULL,
	`asistencia` INT(255) NOT NULL DEFAULT '0',
	`observaciones_profesor` TEXT(255) NOT NULL,
	`observaciones_delegado` TEXT(255) NOT NULL,
	`nivel_incidencia` INT(255) NOT NULL DEFAULT '0',
	`descripcion_incidencia` TEXT(255) NOT NULL,
	`estado` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Materia` (
	`NRC` INT(255) NOT NULL AUTO_INCREMENT,
	`id_carrera` INT(255) NOT NULL DEFAULT '0',
	`nombre_materia` varchar(255) NOT NULL,
	`num_inscritos` INT(255) NOT NULL DEFAULT '0',
	`num_interacciones` INT(255) NOT NULL DEFAULT '0',
	`cedula_profesor` INT(255) NOT NULL DEFAULT '0',
	`cedula_delegado` INT(255) NOT NULL DEFAULT '0',
	PRIMARY KEY (`NRC`)
);

CREATE TABLE `Carrera` (
	`id` INT(255) NOT NULL AUTO_INCREMENT,
	`nombre_carrera` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_fk0` FOREIGN KEY (`id_carrera`) REFERENCES `Carrera`(`id`);

ALTER TABLE `Interaccion` ADD CONSTRAINT `Interaccion_fk0` FOREIGN KEY (`cedual_delegado`) REFERENCES `Usuario`(`cedula`);

ALTER TABLE `Interaccion` ADD CONSTRAINT `Interaccion_fk1` FOREIGN KEY (`cedula_profesor`) REFERENCES `Usuario`(`cedula`);

ALTER TABLE `Interaccion` ADD CONSTRAINT `Interaccion_fk2` FOREIGN KEY (`NRC`) REFERENCES `Materia`(`NRC`);

ALTER TABLE `Materia` ADD CONSTRAINT `Materia_fk0` FOREIGN KEY (`id_carrera`) REFERENCES `Carrera`(`id`);

ALTER TABLE `Materia` ADD CONSTRAINT `Materia_fk1` FOREIGN KEY (`cedula_profesor`) REFERENCES `Usuario`(`cedula`);

ALTER TABLE `Materia` ADD CONSTRAINT `Materia_fk2` FOREIGN KEY (`cedula_delegado`) REFERENCES `Usuario`(`cedula`);