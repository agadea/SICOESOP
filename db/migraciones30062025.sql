-- Crear ENUM para estado compartido entre pasajeros, carga y correo
CREATE TYPE oper_pacc_estado_enum AS ENUM ('Embarcada', 'Desembarcada', 'En tránsito');

-- Crear ENUM para tipo compartido entre pasajeros, carga y correo
CREATE TYPE oper_pacc_tipo_enum AS ENUM ('Paga', 'Cortesía');

-- Crear tabla central para pasajeros, carga y correo
CREATE TABLE oper_pax_carga_correo (
    opcc_id SERIAL PRIMARY KEY,
    opmf_id INT NOT NULL, -- Referencia a la tabla oper_mov_flota
    oppa_id INT, -- Referencia a la tabla de pasajeros
    opca_id INT, -- Referencia a la tabla de carga
    opco_id INT -- Referencia a la tabla de correo
);

-- Crear tabla para pasajeros
CREATE TABLE oper_pax (
    opax_id SERIAL PRIMARY KEY,
    estado oper_pacc_estado_enum NOT NULL, -- Estado compartido
    tipo oper_pacc_tipo_enum NOT NULL, -- Tipo compartido
    valor DECIMAL(10, 2) NOT NULL, -- Campo genérico para cantidad/peso
    opcc_id INT, -- Referencia a la tabla central
    FOREIGN KEY (opcc_id) REFERENCES oper_pax_carga_correo(opcc_id) ON DELETE SET NULL
);

-- Crear tabla para carga
CREATE TABLE oper_carga (
    ocarga_id SERIAL PRIMARY KEY,
    estado oper_pacc_estado_enum NOT NULL, -- Estado compartido
    tipo oper_pacc_tipo_enum NOT NULL, -- Tipo compartido
    valor DECIMAL(10, 2) NOT NULL, -- Campo genérico para cantidad/peso
    opcc_id INT, -- Referencia a la tabla central
    FOREIGN KEY (opcc_id) REFERENCES oper_pax_carga_correo(opcc_id) ON DELETE SET NULL
);

-- Crear tabla para correo
CREATE TABLE oper_correo (
    opcorreo_id SERIAL PRIMARY KEY,
    estado oper_pacc_estado_enum NOT NULL, -- Estado compartido
    tipo oper_pacc_tipo_enum NOT NULL, -- Tipo compartido
    valor DECIMAL(10, 2) NOT NULL, -- Campo genérico para cantidad/peso
    opcc_id INT, -- Referencia a la tabla central
    FOREIGN KEY (opcc_id) REFERENCES oper_pax_carga_correo(opcc_id) ON DELETE SET NULL
);

-- Alterar tabla existente para movimientos de flota
ALTER TABLE oper.oper_mov_flota
ADD COLUMN opcc_id INT,

-- Agregar claves foráneas a la tabla central
ALTER TABLE oper.oper_pax_carga_correo
ADD CONSTRAINT fk_opmf_id FOREIGN KEY (opmf_id) REFERENCES oper.oper_mov_flota(opmf_id) ON DELETE CASCADE;

ALTER TABLE oper.oper_pax_carga_correo ADD CONSTRAINT oper_carga FOREIGN KEY (opca_id)
REFERENCES oper.oper_carga(ocarga_id) ON DELETE SET NULL;

ALTER TABLE oper.oper_pax_carga_correo ADD CONSTRAINT oper_correo FOREIGN KEY (opco_id)
REFERENCES oper.oper_correo(opcorreo_id) ON DELETE SET NULL;

ALTER TABLE oper.oper_pax_carga_correo ADD CONSTRAINT oper_pax FOREIGN KEY (oppa_id)
REFERENCES oper.oper_pax(opax_id) ON DELETE SET NULL;

ALTER TABLE oper.oper_aviones
ADD COLUMN opav_tipo_fuel_avion VARCHAR(25);

