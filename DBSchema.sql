CREATE TABLE  Usuario  (
	 cedula SERIAL NOT NULL,
	 id_carrera INT UNIQUE,
	 rol varchar(255) NOT NULL DEFAULT 'Delegado' ,
	 is_admin  BOOLEAN NOT NULL DEFAULT 'false',
	 nombre  varchar(255) NOT NULL,
	 apellido  varchar(255) NOT NULL,
	 email  varchar(255) NOT NULL,
	 clave  varchar(255) NOT NULL,
	 telefono  VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY ( cedula )
);

CREATE TABLE  Interaccion  (
	 id SERIAL NOT NULL UNIQUE,
	 cedula_delegado  INT NOT NULL,
	 cedula_profesor  INT NOT NULL,
	 NRC  INT NOT NULL,
	 tipo  varchar(255) NOT NULL,
	 hora_inicio  DATE NOT NULL,
	 hora_fin  DATE NOT NULL,
	 asistencia  INT NOT NULL DEFAULT  0,
	 observaciones_profesor  TEXT NOT NULL,
	 observaciones_delegado  TEXT NOT NULL,
	 nivel_incidencia  INT NOT NULL DEFAULT  0,
	 descripcion_incidencia  TEXT NOT NULL,
	 estado  varchar(255) NOT NULL,
	PRIMARY KEY ( id )
);

CREATE TABLE  Materia  (
	 NRC SERIAL NOT NULL UNIQUE,
	 id_carrera  INT NOT NULL DEFAULT  0 ,
	 nombre_materia  varchar(255) NOT NULL,
	 num_inscritos  INT NOT NULL DEFAULT  0 ,
	 num_interacciones  INT NOT NULL DEFAULT  0 ,
	 cedula_profesor  INT NOT NULL DEFAULT  0 ,
	 cedula_delegado  INT NOT NULL DEFAULT  0 ,
	PRIMARY KEY ( NRC )
);

CREATE TABLE  Carrera  (
	 id  SERIAL NOT NULL, 
	 nombre_carrera  varchar(255) NOT NULL,
	PRIMARY KEY ( id )
);

ALTER TABLE  Usuario  ADD CONSTRAINT  Usuario_fk0  FOREIGN KEY ( id_carrera ) REFERENCES  Carrera ( id );

ALTER TABLE  Interaccion  ADD CONSTRAINT  Interaccion_fk0  FOREIGN KEY ( cedula_delegado ) REFERENCES  Usuario ( cedula );

ALTER TABLE  Interaccion  ADD CONSTRAINT  Interaccion_fk1  FOREIGN KEY ( cedula_profesor ) REFERENCES  Usuario ( cedula );

ALTER TABLE  Interaccion  ADD CONSTRAINT  Interaccion_fk2  FOREIGN KEY ( NRC ) REFERENCES  Materia ( NRC );

ALTER TABLE  Materia  ADD CONSTRAINT  Materia_fk0  FOREIGN KEY ( id_carrera ) REFERENCES  Carrera ( id );

ALTER TABLE  Materia  ADD CONSTRAINT  Materia_fk1  FOREIGN KEY ( cedula_profesor ) REFERENCES  Usuario ( cedula );

ALTER TABLE  Materia  ADD CONSTRAINT  Materia_fk2  FOREIGN KEY ( cedula_delegado ) REFERENCES  Usuario ( cedula );