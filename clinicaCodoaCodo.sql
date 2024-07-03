CREATE DATABASE clinicaCodoaCodo;

USE clinicaCodoaCodo;

CREATE TABLE provincias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE especialidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    dni VARCHAR(255) NOT NULL,
    especialidad_id INT,
    provincia_id INT,
    fecha_nacimiento DATE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id),
    FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

-- Insertar provincias
INSERT INTO provincias (nombre) VALUES 
('Buenos Aires'), ('Catamarca'), ('Chaco'), ('Chubut'), ('Córdoba'), 
('Corrientes'), ('Entre Ríos'), ('Formosa'), ('Jujuy'), ('La Pampa'), 
('La Rioja'), ('Mendoza'), ('Misiones'), ('Neuquén'), ('Río Negro'), 
('Salta'), ('San Juan'), ('San Luis'), ('Santa Cruz'), ('Santa Fe'), 
('Santiago del Estero'), ('Tierra del Fuego'), ('Tucumán');

-- Insertar especialidades
INSERT INTO especialidades (nombre) VALUES 
('Cardiología'), ('Dermatología'), ('Gastroenterología'), 
('Ginecología'), ('Neurología'), ('Oftalmología'), 
('Oncología'), ('Pediatría'), ('Psiquiatría'), ('Traumatología');

-- Insertar médicos
INSERT INTO medicos (nombre, apellido, email, telefono, direccion, ciudad, dni, especialidad_id, provincia_id, fecha_nacimiento) VALUES 
('Juan', 'Pérez', 'juan.perez@example.com', '123456789', 'Calle Falsa 123', 'Ciudad A', '12345678', 1, 1, '1980-01-01'),
('Ana', 'García', 'ana.garcia@example.com', '987654321', 'Avenida Siempre Viva 742', 'Ciudad B', '23456789', 2, 2, '1985-02-02'),
('Luis', 'Martínez', 'luis.martinez@example.com', '567890123', 'Calle Real 456', 'Ciudad C', '34567890', 3, 3, '1990-03-03'),
('María', 'Rodríguez', 'maria.rodriguez@example.com', '890123456', 'Calle Luna 789', 'Ciudad D', '45678901', 4, 4, '1982-04-04'),
('Pedro', 'González', 'pedro.gonzalez@example.com', '123890456', 'Avenida Sol 101', 'Ciudad E', '56789012', 5, 5, '1988-05-05'),
('Laura', 'López', 'laura.lopez@example.com', '456789012', 'Calle Estrella 202', 'Ciudad F', '67890123', 6, 6, '1992-06-06'),
('Carlos', 'Díaz', 'carlos.diaz@example.com', '789012345', 'Avenida Mar 303', 'Ciudad G', '78901234', 7, 7, '1983-07-07'),
('Sofía', 'Fernández', 'sofia.fernandez@example.com', '901234567', 'Calle Río 404', 'Ciudad H', '89012345', 8, 8, '1987-08-08'),
('Miguel', 'Ruiz', 'miguel.ruiz@example.com', '234567890', 'Avenida Lago 505', 'Ciudad I', '90123456', 9, 9, '1991-09-09'),
('Lucía', 'Hernández', 'lucia.hernandez@example.com', '567890123', 'Calle Bosque 606', 'Ciudad J', '12345678', 10, 10, '1984-10-10'),
('David', 'Jiménez', 'david.jimenez@example.com', '890123456', 'Avenida Selva 707', 'Ciudad K', '23456789', 1, 11, '1993-11-11'),
('Carmen', 'Álvarez', 'carmen.alvarez@example.com', '123456789', 'Calle Montaña 808', 'Ciudad L', '34567890', 2, 12, '1986-12-12'),
('Javier', 'Moreno', 'javier.moreno@example.com', '456789012', 'Avenida Valle 909', 'Ciudad M', '45678901', 3, 13, '1981-01-01'),
('Marta', 'Muñoz', 'marta.munoz@example.com', '789012345', 'Calle Roca 101', 'Ciudad N', '56789012', 4, 14, '1989-02-02'),
('Alberto', 'Romero', 'alberto.romero@example.com', '012345678', 'Avenida Playa 202', 'Ciudad O', '67890123', 5, 15, '1994-03-03'),
('Elena', 'Ortiz', 'elena.ortiz@example.com', '345678901', 'Calle Viento 303', 'Ciudad P', '78901234', 6, 16, '1985-04-04'),
('Pablo', 'Iglesias', 'pablo.iglesias@example.com', '678901234', 'Avenida Nieve 404', 'Ciudad Q', '89012345', 7, 17, '1992-05-05'),
('Sara', 'Santos', 'sara.santos@example.com', '901234567', 'Calle Lluvia 505', 'Ciudad R', '90123456', 8, 18, '1988-06-06'),
('Daniel', 'Castro', 'daniel.castro@example.com', '234567890', 'Avenida Sol 606', 'Ciudad S', '12345678', 9, 19, '1991-07-07'),
('Isabel', 'Ramos', 'isabel.ramos@example.com', '567890123', 'Calle Tierra 707', 'Ciudad T', '23456789', 10, 20, '1984-08-08');
medicosclinicacodoacodoclinicacodoacodo