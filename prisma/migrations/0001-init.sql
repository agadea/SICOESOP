-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "genr";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "oper";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rrhh";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tecn";

-- CreateTable
CREATE TABLE "oper"."oper_mov_flota" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" INTEGER NOT NULL,
    "month" VARCHAR(20) NOT NULL,
    "year" INTEGER NOT NULL,
    "acft" VARCHAR(20) NOT NULL,
    "flight" VARCHAR(20) NOT NULL,
    "origin" VARCHAR(10) NOT NULL,
    "destination" VARCHAR(10) NOT NULL,
    "etd" VARCHAR(10),
    "cpta" VARCHAR(10),
    "atd" VARCHAR(10),
    "eta" VARCHAR(10),
    "ata" VARCHAR(10),
    "a_pta" VARCHAR(10),
    "pax" INTEGER,
    "flight_time" VARCHAR(10),
    "block_time" VARCHAR(10),
    "fob" VARCHAR(20),
    "fod" VARCHAR(20),
    "fuel_consumed" VARCHAR(20),
    "total_min_dly" INTEGER,
    "delay_code_1" VARCHAR(10),
    "delay_code_2" VARCHAR(10),
    "runway" VARCHAR(10),
    "ldw" INTEGER,
    "tow" INTEGER,

    CONSTRAINT "oper_mov_flota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genr"."airports" (
    "code" VARCHAR(50),
    "name" VARCHAR(200),
    "citycode" VARCHAR(50),
    "cityname" VARCHAR(200),
    "countryname" VARCHAR(200),
    "countrycode" VARCHAR(200),
    "timezone" VARCHAR(8),
    "lat" VARCHAR(32),
    "lon" VARCHAR(32),
    "numairports" INTEGER,
    "city" VARCHAR(10)
);

-- CreateTable
CREATE TABLE "genr"."genr_aeropuertos" (
    "gear_gecd_id_pais" INTEGER,
    "gear_gecd_id_ciudad" INTEGER,
    "gear_id_aeropuerto" SERIAL NOT NULL,
    "gear_co_iata_aeropuerto" VARCHAR(5),
    "gear_nm_aeropuerto" VARCHAR(100),
    "gear_timezone" VARCHAR(5),
    "gear_latitud" VARCHAR(15),
    "gear_longitud" VARCHAR(15),
    "gear_co_status" INTEGER,
    "gear_fe_status" DATE,
    "gear_co_usua" VARCHAR(10),
    "gear_fe_reg" DATE,
    "gear_fe_modif" DATE,

    CONSTRAINT "aeropuerto_pk" PRIMARY KEY ("gear_id_aeropuerto")
);

-- CreateTable
CREATE TABLE "genr"."genr_archivo" (
    "gtar_id_archivo" BIGSERIAL NOT NULL,
    "gtar_tp_archivo" VARCHAR NOT NULL,
    "gtar_url_archivo" VARCHAR NOT NULL,
    "gtar_nm_archivo" VARCHAR NOT NULL,
    "gtar_co_status" INTEGER NOT NULL,
    "gtar_fe_status" TIMESTAMP(6) NOT NULL,
    "gtar_co_usua" VARCHAR NOT NULL,
    "gtar_fe_reg" TIMESTAMP(6) NOT NULL,
    "gtar_fe_modif" TIME(6),
    "gtar_id_mod_arc" INTEGER,
    "gtar_id_modulo" INTEGER NOT NULL,

    CONSTRAINT "genr_archivo_pkey" PRIMARY KEY ("gtar_id_archivo")
);

-- CreateTable
CREATE TABLE "genr"."genr_bancos" (
    "genr_banco_id" SERIAL NOT NULL,
    "genr_banco_nm" VARCHAR(124) NOT NULL,
    "genr_banco_cod" INTEGER,

    CONSTRAINT "genr_bancos_pkey" PRIMARY KEY ("genr_banco_id")
);

-- CreateTable
CREATE TABLE "genr"."genr_ciudad" (
    "gecd_gepa_id_pais" INTEGER NOT NULL,
    "gecd_co_iso_pais" VARCHAR(3) NOT NULL,
    "gecd_co_estado" VARCHAR(5),
    "gecd_id_ciudad" SERIAL NOT NULL,
    "gecd_co_ciudad" VARCHAR(5) NOT NULL,
    "gecd_nm_ciudad" VARCHAR(60),
    "gecd_co_status" INTEGER,
    "gecd_fe_status" DATE,
    "gecd_co_usua" VARCHAR(10),
    "gecd_fe_reg" DATE,
    "gecd_fe_modif" DATE
);

-- CreateTable
CREATE TABLE "genr"."genr_localidades" (
    "gelo_rrcm_co_compania" VARCHAR(10) NOT NULL,
    "gelo_id_localidad" VARCHAR(7) NOT NULL,
    "gelo_de_localidad" VARCHAR(100) NOT NULL,
    "gelo_co_status" INTEGER,
    "gelo_fe_status" DATE,
    "gelo_co_usua" VARCHAR(10) NOT NULL,
    "gelo_fe_reg" DATE,
    "gelo_fe_modif" DATE,

    CONSTRAINT "localidad_pk" PRIMARY KEY ("gelo_rrcm_co_compania","gelo_id_localidad")
);

-- CreateTable
CREATE TABLE "genr"."genr_manifiesto_pasajeros" (
    "genr_manifiesto_pas_id" SERIAL NOT NULL,
    "genr_manifiesto_pas_vuelo_id" INTEGER NOT NULL,
    "genr_manifiesto_pas_nm_pas" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_ap_pas" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_nac" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_fe_n" DATE NOT NULL,
    "genr_manifiesto_pas_num_ppt" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_vc_ppt" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_vc_visa" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_dir" VARCHAR(64) NOT NULL,
    "genr_manifiesto_pas_zip_cod" INTEGER NOT NULL,
    "genr_manifiesto_pas_co_status" INTEGER NOT NULL,
    "genr_manifiesto_pas_fe_reg" DATE NOT NULL,
    "genr_manifiesto_pas_fe_edit" DATE,
    "genr_manifiesto_pas_fe_elim" DATE,
    "genr_manifiesto_pas_co_usua_reg" VARCHAR(32) NOT NULL,
    "genr_manifiesto_pas_co_usua_edit" VARCHAR(32),
    "genr_manifiesto_pas_co_usua_elim" VARCHAR(32),
    "genr_manifiesto_pas_num_visa_ot" VARCHAR(32) NOT NULL,

    CONSTRAINT "genr_manifiesto_pasajeros_pkey" PRIMARY KEY ("genr_manifiesto_pas_id")
);

-- CreateTable
CREATE TABLE "genr"."genr_manifiesto_vuelos" (
    "genr_manifiesto_vuelos_id" SERIAL NOT NULL,
    "genr_manifiesto_vuelos_vuelo" VARCHAR(32) NOT NULL,
    "genr_manifiesto_vuelos_ruta" VARCHAR(32) NOT NULL,
    "genr_manifiesto_vuelos_fe" DATE NOT NULL,
    "genr_manifiesto_vuelos_co_status" INTEGER NOT NULL,
    "genr_manifiesto_vuelos_fe_reg" DATE NOT NULL,
    "genr_manifiesto_vuelos_fe_edit" DATE,
    "genr_manifiesto_vuelos_fe_elim" DATE,
    "genr_manifiesto_vuelos_co_usua_reg" VARCHAR(32) NOT NULL,
    "genr_manifiesto_vuelos_co_usua_edit" VARCHAR(32),
    "genr_manifiesto_vuelos_co_usua_elim" VARCHAR(32),

    CONSTRAINT "genr_manifiesto_vuelos_pkey" PRIMARY KEY ("genr_manifiesto_vuelos_id")
);

-- CreateTable
CREATE TABLE "genr"."genr_monedas" (
    "gemo_co_moneda" VARCHAR(15) NOT NULL,
    "gemo_nm_moneda" VARCHAR(15),
    "gemo_sim_moneda" VARCHAR(15),
    "gemo_ind_local" VARCHAR(15),
    "gemo_co_status" INTEGER,
    "gemo_fe_status" DATE,
    "gemo_co_usua" VARCHAR(10) NOT NULL,
    "gemo_fe_reg" DATE,
    "gemo_fe_modif" DATE,

    CONSTRAINT "moneda_pk" PRIMARY KEY ("gemo_co_moneda")
);

-- CreateTable
CREATE TABLE "genr"."genr_pais" (
    "gepa_id_pais" INTEGER NOT NULL,
    "gepa_co_iso_pais" VARCHAR(3) NOT NULL,
    "gepa_co_iso3_pais" VARCHAR(3),
    "gepa_nm_pais" VARCHAR(60),
    "gepa_nm_pais_en" VARCHAR(60),
    "gepa_co_tlf_pais" VARCHAR(7),
    "gepa_co_status" INTEGER,
    "gepa_fe_status" DATE,
    "gepa_co_usua" VARCHAR(10) NOT NULL,
    "gepa_fe_reg" DATE,
    "gepa_fe_modif" DATE,

    CONSTRAINT "pais_pk" PRIMARY KEY ("gepa_id_pais")
);

-- CreateTable
CREATE TABLE "genr"."genr_tabla_basica" (
    "getb_co_tabla" VARCHAR(15) NOT NULL,
    "getb_nm_tabla" VARCHAR(60),
    "getb_de_tabla" VARCHAR(100),
    "getb_co_status" INTEGER,
    "getb_fe_status" DATE,
    "getb_co_usua" VARCHAR(10),
    "getb_fe_reg" DATE,
    "getb_fe_modif" DATE,

    CONSTRAINT "tabla_bas_pk" PRIMARY KEY ("getb_co_tabla")
);

-- CreateTable
CREATE TABLE "genr"."genr_tabla_basica_det" (
    "gtbd_getb_co_tabla" VARCHAR(15) NOT NULL,
    "gtbd_co_campo" VARCHAR(20) NOT NULL,
    "gtbd_nm_campo" VARCHAR(50),
    "gtbd_nm_campo_largo" VARCHAR(100),
    "gtbd_rv_value_ad" VARCHAR(10),
    "gtbd_co_status" INTEGER,
    "gtbd_fe_status" DATE,
    "gtbd_co_usua" VARCHAR(10) NOT NULL,
    "gtbd_fe_reg" DATE,
    "gtbd_fe_modif" DATE,

    CONSTRAINT "basica_det_pk" PRIMARY KEY ("gtbd_getb_co_tabla","gtbd_co_campo")
);

-- CreateTable
CREATE TABLE "oper"."oper_aviones" (
    "opav_id_avion" SERIAL NOT NULL,
    "opav_opar_id_mod_aeronave" INTEGER NOT NULL,
    "opav_matricula_avion" VARCHAR(25),
    "opav_serial_avion" VARCHAR(25),
    "opav_motor_avion" VARCHAR(25),
    "opav_fuel_avion" VARCHAR(25),
    "opav_ca_passenger" INTEGER,
    "opav_rvsm" VARCHAR(30),
    "opav_tcas" VARCHAR(60),
    "opav_mzfw_peso_estruct" INTEGER,
    "opav_mrw_peso_estruct" INTEGER,
    "opav_mtgw_peso_estruct" INTEGER,
    "opav_mlw_peso_estruct" INTEGER,
    "opav_dow_nacional" INTEGER,
    "opav_doi_nacional" DOUBLE PRECISION,
    "opav_dow_internacional" INTEGER,
    "opav_doi_internacional" DOUBLE PRECISION,
    "opav_dow_ferry" INTEGER,
    "opav_doi_ferry" DOUBLE PRECISION,
    "opav_co_status" INTEGER,
    "opav_fe_status" DATE,
    "opav_fe_reg" DATE,
    "opav_co_usuario" VARCHAR(10),
    "opav_fe_modif" DATE,
    "opav_id" SERIAL NOT NULL,

    CONSTRAINT "oper_aviones_pkey" PRIMARY KEY ("opav_id")
);

-- CreateTable
CREATE TABLE "oper"."oper_comb_logbook" (
    "opcm_id_comb" SERIAL NOT NULL,
    "opcm_oplb_id_logbook" INTEGER NOT NULL,
    "opcm_opit_id_itinerario" INTEGER,
    "opcm_comb_sal" INTEGER,
    "opcm_comb_lleg" INTEGER,
    "opcm_comb_consu" INTEGER,
    "opcm_comb_tanq" INTEGER,
    "opcm_comb_id_unidad" INTEGER,
    "opcm_co_status" INTEGER NOT NULL,
    "opcm_fe_reg" DATE NOT NULL,
    "opcm_fe_edit" DATE,
    "opcm_fe_elim" DATE,
    "opcm_co_usua_reg" VARCHAR(10) NOT NULL,
    "opcm_co_usua_edit" VARCHAR(10),
    "opcm_co_usua_elim" VARCHAR(10),
    "opcm_optl_co_tray" INTEGER NOT NULL,
    "opcm_comb_id_unidad_tanq" INTEGER,

    CONSTRAINT "oper_comb_logbook_pkey" PRIMARY KEY ("opcm_id_comb")
);

-- CreateTable
CREATE TABLE "oper"."oper_comb_prov" (
    "oper_comb_prov_id" BIGSERIAL NOT NULL,
    "oper_comb_prov_nm" VARCHAR NOT NULL,
    "oper_comb_prov_cod" INTEGER NOT NULL,
    "oper_comb_prov_fe_registro" DATE NOT NULL,
    "oper_comb_prov_fe_mod" DATE,
    "oper_comb_prov_usuario_registro" VARCHAR NOT NULL,
    "oper_comb_prov_usuario_modif" VARCHAR,
    "oper_comb_prov_co_status" INTEGER NOT NULL,

    CONSTRAINT "oper_comb_prov_pkey" PRIMARY KEY ("oper_comb_prov_id")
);

-- CreateTable
CREATE TABLE "oper"."oper_comida" (
    "opco_id_comida" SERIAL NOT NULL,
    "opco_gtbd_co_campo" VARCHAR(20) NOT NULL,
    "opco_de_hora_desde" TIME(6),
    "opco_de_hora_hasta" TIME(6),
    "opco_fe_efectiva" DATE,
    "opco_co_status" INTEGER,
    "opco_fe_status" DATE,
    "opco_fe_reg" DATE,
    "opco_co_usuario" VARCHAR(10),
    "opco_fe_modif" DATE,

    CONSTRAINT "comida_pk" PRIMARY KEY ("opco_id_comida")
);

-- CreateTable
CREATE TABLE "oper"."oper_costo" (
    "opco_id_costo" SERIAL NOT NULL,
    "opco_nu_costo" VARCHAR(10),
    "opco_fe_registro" DATE,
    "opco_fe_mod" DATE,
    "opco_co_usuario" VARCHAR(10),
    "opco_co_status" INTEGER,
    "opco_fe_efectiva" DATE,
    "opco_fe_from" DATE,
    "opco_fe_to" DATE,
    "opco_provider" VARCHAR(20)
);

-- CreateTable
CREATE TABLE "oper"."oper_ct_demoras" (
    "opct_id_ct_demora" INTEGER NOT NULL,
    "opct_nm_ct_demora_esp" VARCHAR(200) NOT NULL,
    "opct_nm_ct_demora_ing" VARCHAR(200) NOT NULL,
    "opct_co_status" INTEGER,
    "opct_fe_registro" DATE
);

-- CreateTable
CREATE TABLE "oper"."oper_cumplimiento" (
    "opcu_id_falta" SERIAL NOT NULL,
    "opcu_nombre" VARCHAR(100) NOT NULL,
    "opcu_ci_rif" INTEGER NOT NULL,
    "opcu_fe_falta" DATE,
    "opcu_asignacion" VARCHAR(255),
    "opcu_tp_tripulacion" INTEGER NOT NULL,
    "opcu_co_bono" INTEGER NOT NULL,
    "opcu_observ_falta" VARCHAR(2000) NOT NULL,
    "opcu_tp_justificacion" INTEGER NOT NULL,
    "opcu_co_status" INTEGER NOT NULL,
    "opcu_fe_reg" DATE,
    "opcu_fe_modif" DATE,
    "opcu_co_usuario" VARCHAR(10),
    "opcu_cant_faltas" INTEGER,

    CONSTRAINT "oper_cumplimiento_pkey" PRIMARY KEY ("opcu_id_falta")
);

-- CreateTable
CREATE TABLE "oper"."oper_feriados" (
    "opfe_id_feriado" SERIAL NOT NULL,
    "opfe_nm_feriado" VARCHAR(200) NOT NULL,
    "opfe_fe_feriado" DATE NOT NULL,
    "opfe_status_feriado" INTEGER,
    "opfe_co_status" INTEGER,
    "opfe_fe_registro" DATE,
    "opfe_fe_modif" DATE,
    "opfe_co_usuario" VARCHAR(10),

    CONSTRAINT "oper_feriados_pkey" PRIMARY KEY ("opfe_id_feriado")
);

-- CreateTable
CREATE TABLE "oper"."oper_hora_almuerzos" (
    "opal_id_hora_almuerzo" BIGSERIAL NOT NULL,
    "opal_hora_inicio" TIMESTAMP(0) NOT NULL,
    "opal_hora_fin" TIMESTAMP(0) NOT NULL,
    "opal_co_status" INTEGER NOT NULL,
    "opal_fe_registro" TIMESTAMP(0) NOT NULL,
    "opal_fe_modif" TIMESTAMP(0),
    "opal_co_usuario" VARCHAR(191) NOT NULL,

    CONSTRAINT "oper_hora_almuerzos_pkey" PRIMARY KEY ("opal_id_hora_almuerzo")
);

-- CreateTable
CREATE TABLE "oper"."oper_hora_cenas" (
    "opce_id_hora_cenas" BIGSERIAL NOT NULL,
    "opce_hora_inicio" TIMESTAMP(0) NOT NULL,
    "opce_hora_fin" TIMESTAMP(0) NOT NULL,
    "opce_co_status" INTEGER NOT NULL,
    "opce_fe_registro" TIMESTAMP(0) NOT NULL,
    "opce_fe_modif" TIMESTAMP(0),
    "opce_co_usuario" VARCHAR(191) NOT NULL,

    CONSTRAINT "oper_hora_cenas_pkey" PRIMARY KEY ("opce_id_hora_cenas")
);

-- CreateTable
CREATE TABLE "oper"."oper_hora_desayunos" (
    "opde_id_hora_desayunos" BIGSERIAL NOT NULL,
    "opde_hora_inicio" TIMESTAMP(0) NOT NULL,
    "opde_hora_fin" TIMESTAMP(0) NOT NULL,
    "opde_co_status" INTEGER NOT NULL,
    "opde_fe_registro" TIMESTAMP(0) NOT NULL,
    "opde_fe_modif" TIMESTAMP(0),
    "opde_co_usuario" VARCHAR(191) NOT NULL,

    CONSTRAINT "oper_hora_desayunos_pkey" PRIMARY KEY ("opde_id_hora_desayunos")
);

-- CreateTable
CREATE TABLE "oper"."oper_itinerarios" (
    "opit_id_itinerario" SERIAL NOT NULL,
    "opit_opru_id_ruta" INTEGER,
    "opit_ho_salida" TIMETZ(6),
    "opit_ho_llegada" TIMETZ(6),
    "opit_nu_vuelo" INTEGER,
    "opit_nu_duracion" DECIMAL,
    "opit_de_frecuencia" VARCHAR(15),
    "opit_co_usuario" VARCHAR(10),
    "opit_co_status" INTEGER,
    "opit_fe_reg" DATE,
    "opit_fe_mod" DATE,
    "opit_de_millas" VARCHAR(20),
    "opit_fecha_efectiva" DATE,
    "opit_getb_co_tabla" INTEGER,
    "opit_fecha_efectiva_init" DATE,
    "opit_fecha_efectiva_end" DATE,

    CONSTRAINT "oper_itinerarios_pkey" PRIMARY KEY ("opit_id_itinerario")
);

-- CreateTable
CREATE TABLE "oper"."oper_llegada" (
    "opeg_id_llegada" INTEGER NOT NULL,
    "opeg_hora" TIME(6) NOT NULL,
    "opeg_id_tp_vuelo" INTEGER,
    "opeg_co_status" INTEGER NOT NULL,
    "opeg_fe_registro" DATE,
    "opeg_fe_modif" DATE,
    "opeg_co_usuario" VARCHAR(10),

    CONSTRAINT "oper_llegada_pkey" PRIMARY KEY ("opeg_id_llegada")
);

-- CreateTable
CREATE TABLE "oper"."oper_logbook" (
    "oplb_id_logbook" SERIAL NOT NULL,
    "oplb_pag_logbook" BIGINT NOT NULL,
    "oplb_fe_vuelo" DATE NOT NULL,
    "oplb_opit_id_itinerario" INTEGER,
    "oplb_opar_id_mod_aeronave" INTEGER,
    "oplb_opav_id_avion" INTEGER,
    "oplb_ci_empl_cap" VARCHAR(20) NOT NULL,
    "oplb_ci_empl_fo" VARCHAR(20) NOT NULL,
    "oplb_ci_empl_inst_eval" VARCHAR(20),
    "oplb_ci_empl_insp" VARCHAR(20),
    "oplb_ci_empl_tma" VARCHAR(20),
    "oplb_ci_empl_dvlo" VARCHAR(20),
    "oplb_co_status" INTEGER,
    "oplb_fe_reg" DATE,
    "oplb_fe_edit" DATE,
    "oplb_fe_elim" DATE,
    "oplb_co_usua_reg" VARCHAR(10) NOT NULL,
    "oplb_co_usua_edit" VARCHAR(10),
    "oplb_co_usua_elim" VARCHAR(10),
    "oplb_observacion" VARCHAR(3000),
    "oplb_opvu_id_tp_vuelo" BIGINT,
    "oplb_ini_hora_serv" TIME(6),

    CONSTRAINT "oper_logbook_pkey" PRIMARY KEY ("oplb_id_logbook","oplb_pag_logbook")
);

-- CreateTable
CREATE TABLE "oper"."oper_mant_motor_logbook" (
    "opmm_id_mant_motor" SERIAL NOT NULL,
    "opmm_oplb_id_logbook" INTEGER NOT NULL,
    "opmm_opmv_tray" INTEGER,
    "opmm_co_eng" INTEGER,
    "opmm_eng_pres_rat" REAL,
    "opmm_n1" REAL,
    "opmm_ex_gas_temp" INTEGER,
    "opmm_n2" REAL,
    "opmm_fuel_flow" REAL,
    "opmm_ace_p" INTEGER,
    "opmm_ace_t" INTEGER,
    "opmm_ace_c" INTEGER,
    "opmm_co_status" INTEGER NOT NULL,
    "opmm_fe_reg" DATE NOT NULL,
    "opmm_fe_edit" DATE,
    "opmm_fe_elim" DATE,
    "opmm_usua_reg" VARCHAR(10) NOT NULL,
    "opmm_usua_edit" VARCHAR(10),
    "opmm_usua_elim" VARCHAR(10),

    CONSTRAINT "oper_mant_motor_logbook_pkey" PRIMARY KEY ("opmm_id_mant_motor")
);

-- CreateTable
CREATE TABLE "oper"."oper_mant_vuelo_logbook" (
    "opmv_id_mant_vuelo" SERIAL NOT NULL,
    "opmv_oplb_id_logbook" INTEGER NOT NULL,
    "opmv_tray" INTEGER,
    "opmv_fly_level" INTEGER,
    "opmv_ias" INTEGER,
    "opmv_mach" INTEGER,
    "opmv_tac" VARCHAR(4000),
    "opmv_co_status" INTEGER NOT NULL,
    "opmv_fe_reg" DATE NOT NULL,
    "opmv_fe_edit" DATE,
    "opmv_fe_elim" DATE,
    "opmv_usua_reg" VARCHAR(10) NOT NULL,
    "opmv_usua_edit" VARCHAR(10),
    "opmv_usua_elim" VARCHAR(10),

    CONSTRAINT "oper_mant_vuelo_logbook_pkey" PRIMARY KEY ("opmv_id_mant_vuelo")
);

-- CreateTable
CREATE TABLE "oper"."oper_modelo_aeronaves" (
    "opar_id_mod_aeronave" SERIAL NOT NULL,
    "opar_co_mod_aeronave" VARCHAR(10),
    "opar_nm_mod_aeronave" VARCHAR(100),
    "opar_co_status" INTEGER,
    "opar_fe_status" DATE,
    "opar_fe_reg" DATE,
    "opar_co_usuario" VARCHAR(10),
    "opar_fe_modif" DATE
);

-- CreateTable
CREATE TABLE "oper"."oper_nocturnas" (
    "opno_id_hora_nocturna" SERIAL NOT NULL,
    "opno_hora_inicio" TIME(6),
    "opno_hora_fin" TIME(6),
    "opno_co_status" INTEGER,
    "opno_fe_registro" DATE,
    "opno_fe_modif" DATE,
    "opno_co_usuario" VARCHAR(10),

    CONSTRAINT "oper_nocturnas_pkey" PRIMARY KEY ("opno_id_hora_nocturna")
);

-- CreateTable
CREATE TABLE "oper"."oper_programacion" (
    "oppr_id_programacion" SERIAL NOT NULL,
    "oppr_fe_reg" DATE,
    "oppr_fe_mod" DATE,
    "oppr_co_status" INTEGER,
    "oppr_co_usuario" VARCHAR(10),
    "oppr_fe_mes" DATE,

    CONSTRAINT "oper_programacion_pkey" PRIMARY KEY ("oppr_id_programacion")
);

-- CreateTable
CREATE TABLE "oper"."oper_programacion_categoria" (
    "oper_id_prog_categoria" SERIAL NOT NULL,
    "oper_genr_id_campo" INTEGER,
    "oper_co_status" INTEGER,
    "oper_co_usuario" VARCHAR(10),
    "oper_fe_reg" DATE,
    "oper_oppr_id_programacion" INTEGER,

    CONSTRAINT "oper_id_prog_categoria_pkey" PRIMARY KEY ("oper_id_prog_categoria")
);

-- CreateTable
CREATE TABLE "oper"."oper_programacion_pilotos" (
    "oppr_id_programacion" SERIAL NOT NULL,
    "oppr_fe_vuelo" DATE,
    "oppr_co_usuario" VARCHAR(10),
    "oppr_co_status" INTEGER,
    "oppr_tusu_co_usuario" VARCHAR(10),
    "oppr_tipo" INTEGER,
    "oppr_fe_reg" DATE,
    "oppr_fe_mod" DATE,
    "oppr_oppr_id_programacion" INTEGER,
    "oppr_co_ubicacion" INTEGER,

    CONSTRAINT "oper_programacion_piloto_pkey" PRIMARY KEY ("oppr_id_programacion")
);

-- CreateTable
CREATE TABLE "oper"."oper_programacion_vuelos" (
    "oper_id_prog_vuelos" SERIAL NOT NULL,
    "oper_opit_id_itinerario" INTEGER,
    "oper_co_status" INTEGER,
    "oper_co_usuario" VARCHAR(10),
    "oper_fe_reg" DATE,
    "oper_oppr_id_programacion" INTEGER,
    "oper_opvu_id_vuelo" INTEGER,

    CONSTRAINT "oper_programacion_vuelos_pkey" PRIMARY KEY ("oper_id_prog_vuelos")
);

-- CreateTable
CREATE TABLE "oper"."oper_ruta" (
    "opru_id_ruta" SERIAL NOT NULL,
    "opru_gear_aerop_origen" INTEGER,
    "opru_gear_aerop_destino" INTEGER,
    "opru_co_usuario" VARCHAR(10),
    "opru_co_status" INTEGER,
    "opru_fe_reg" DATE,
    "opru_fe_mod" DATE,
    "opru_getb_co_tabla" INTEGER,

    CONSTRAINT "oper_ruta_pkey" PRIMARY KEY ("opru_id_ruta")
);

-- CreateTable
CREATE TABLE "oper"."oper_tiem_logbook" (
    "optl_id_tiempos" SERIAL NOT NULL,
    "optl_oplb_id_logbook" INTEGER NOT NULL,
    "optl_co_tray" INTEGER NOT NULL,
    "optl_opvu_id_vuelo" INTEGER NOT NULL,
    "optl_opit_id_itinerario" INTEGER,
    "optl_co_mto" INTEGER,
    "optl_co_rto" INTEGER,
    "optl_hr_sal" TIME(6) NOT NULL,
    "optl_hr_desp" TIME(6) NOT NULL,
    "optl_hr_ater" TIME(6) NOT NULL,
    "optl_hr_lleg" TIME(6) NOT NULL,
    "optl_co_status" INTEGER NOT NULL,
    "optl_fe_reg" DATE NOT NULL,
    "optl_fe_edit" DATE,
    "optl_fe_elim" DATE,
    "optl_co_usua_reg" VARCHAR(10) NOT NULL,
    "optl_co_usua_edit" VARCHAR(10),
    "optl_co_usua_elim" VARCHAR(10),
    "optl_tm_blk" TIMETZ(6),
    "optl_tm_fly" TIMETZ(6),

    CONSTRAINT "oper_tiem_logbook_pkey" PRIMARY KEY ("optl_id_tiempos")
);

-- CreateTable
CREATE TABLE "oper"."oper_tipo_vuelos" (
    "optv_id_tp_vuelo" SERIAL NOT NULL,
    "optv_nm_tp_vuelo" VARCHAR(50) NOT NULL,
    "optv_co_status" INTEGER NOT NULL,
    "optv_fe_registro" DATE NOT NULL,
    "optv_fe_status" DATE,
    "optv_fe_modif" DATE,

    CONSTRAINT "oper_tipo_vuelos_pkey" PRIMARY KEY ("optv_id_tp_vuelo")
);

-- CreateTable
CREATE TABLE "oper"."oper_totales_logbook" (
    "optt_id_total" SERIAL NOT NULL,
    "optt_oplb_id_logbook" INTEGER,
    "optt_tot_cy" INTEGER,
    "optt_tot_rto" INTEGER,
    "optt_tot_bloq" TIME(6),
    "optt_tot_fly" TIME(6),
    "optt_tot_comb" INTEGER,
    "optt_tot_comb_tanq" INTEGER,
    "optt_co_status" INTEGER NOT NULL,
    "optt_fe_reg" DATE NOT NULL,
    "optt_co_usuario" VARCHAR(10) NOT NULL,
    "optt_tot_tm_serv" TIME(6),

    CONSTRAINT "oper_totales_logbook_pkey" PRIMARY KEY ("optt_id_total")
);

-- CreateTable
CREATE TABLE "oper"."oper_tp_demoras" (
    "optd_id_iata_tp_demora" INTEGER NOT NULL,
    "optd_nm_tp_demora" VARCHAR(2000) NOT NULL,
    "optd_co_status" INTEGER NOT NULL,
    "optd_opct_id_ct_demora" INTEGER,
    "optd_fe_registro" DATE,
    "optd_fe_modif" DATE,
    "optd_co_usuario" VARCHAR(10),
    "optd_id_tp_demora" INTEGER NOT NULL,

    CONSTRAINT "oper_tp_demoras_pkey" PRIMARY KEY ("optd_id_tp_demora")
);

-- CreateTable
CREATE TABLE "oper"."oper_trip_logbook" (
    "optc_id_trip" SERIAL NOT NULL,
    "optc_oplb_id_logbook" INTEGER NOT NULL,
    "optc_ci_empl_trip" VARCHAR(20),
    "optc_tp_trip" INTEGER,
    "optc_co_status" INTEGER NOT NULL,
    "optc_fe_reg" DATE NOT NULL,
    "optc_fe_edit" DATE,
    "optc_fe_elim" DATE,
    "optc_co_usua_reg" VARCHAR(10) NOT NULL,
    "optc_co_usua_edit" VARCHAR(10),
    "optc_co_usua_elim" VARCHAR(10),

    CONSTRAINT "oper_trip_logbook_pkey" PRIMARY KEY ("optc_id_trip")
);

-- CreateTable
CREATE TABLE "oper"."oper_vuelos" (
    "opvu_id_vuelo" SERIAL NOT NULL,
    "opvu_opru_id_ruta" INTEGER,
    "opvu_co_vuelo" VARCHAR(100) NOT NULL,
    "opvu_co_status" INTEGER NOT NULL,
    "opvu_fe_registro" DATE NOT NULL,
    "opvu_fe_modif" DATE,
    "opvu_co_usuario" VARCHAR(10) NOT NULL,

    CONSTRAINT "oper_vuelos_pkey" PRIMARY KEY ("opvu_id_vuelo")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_ausencias" (
    "rrau_id_ausencia" SERIAL NOT NULL,
    "rrau_co_usuario" VARCHAR(10),
    "rrau_co_usuario_reg" VARCHAR(10),
    "rrau_id_motivo" INTEGER,
    "rrau_fe_inicio" TIMESTAMPTZ(6),
    "rrau_fe_fin" TIMESTAMPTZ(6),
    "rrau_rrfo_formato_id" INTEGER,
    "rrau_co_status" INTEGER,

    CONSTRAINT "rrhh_ausencias_pkey" PRIMARY KEY ("rrau_id_ausencia")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_calendarios" (
    "rrca_id_calendario" SERIAL NOT NULL,
    "rrca_fe_corte" DATE,
    "rrca_fe_act" DATE,
    "rrca_co_status" INTEGER,
    "rrca_co_usuario" VARCHAR(10) NOT NULL,
    "rrca_fe_reg" DATE,
    "rrca_fe_mod" DATE
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_cargos" (
    "rrca_rrde_co_compania" VARCHAR(10) NOT NULL,
    "rrca_rrde_id_direccion" INTEGER NOT NULL,
    "rrca_de_cargo" VARCHAR(100),
    "rrca_co_status" INTEGER,
    "rrca_fe_status" DATE,
    "rrca_co_usua" VARCHAR(10) NOT NULL,
    "rrca_fe_reg" DATE,
    "rrca_fe_modif" DATE,
    "rrca_id_cargo" SERIAL NOT NULL,
    "rrca_rrde_id_departam" INTEGER NOT NULL,

    CONSTRAINT "cargo_pk" PRIMARY KEY ("rrca_id_cargo")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_companias" (
    "rrcm_co_compania" VARCHAR(10) NOT NULL,
    "rrcm_cd_rif_nacionalidad" VARCHAR(4),
    "rrcm_nu_rif" VARCHAR(20),
    "rrcm_nm_razon_social" VARCHAR(100),
    "rrcm_nm_corto" VARCHAR(60),
    "rrcm_co_pais" INTEGER,
    "rrcm_di_ubicacion" VARCHAR(200),
    "rrcm_co_sigla" VARCHAR(1),
    "rrcm_co_status" INTEGER,
    "rrcm_fe_status" DATE,
    "rrcm_co_usua" VARCHAR(10) NOT NULL,
    "rrcm_fe_reg" DATE,
    "rrcm_fe_modif" DATE,

    CONSTRAINT "compania_pk" PRIMARY KEY ("rrcm_co_compania")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_contraloria_boletos_config_admins" (
    "rrcb_id_conf" BIGSERIAL NOT NULL,
    "rrcb_adm_conf" VARCHAR(128) NOT NULL,
    "rrcb_fe_reg_conf" DATE NOT NULL,
    "rrcb_fe_modif_conf" DATE,
    "rrcb_co_status_conf" INTEGER NOT NULL,
    "rrcb_fe_status_conf" DATE,
    "rrcb_usua_reg_conf" VARCHAR(32),
    "rrcb_usua_modif_conf" VARCHAR(32),
    "rrcb_usua_reg_ip_conf" VARCHAR(32) NOT NULL,
    "rrcb_usua_modif_ip_conf" VARCHAR(32),
    "rrcb_adm_conf_tlf" BIGINT,
    "rrcb_adm_conf_email" VARCHAR,
    "rrcb_adm_conf_tp" INTEGER,

    CONSTRAINT "rrhh_contraloria_boletos_config_admins_pkey" PRIMARY KEY ("rrcb_id_conf")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_contraloria_boletos_jefes_directores_config" (
    "rrcbjd_id_conf" BIGSERIAL NOT NULL,
    "rrcbjd_adm_conf" VARCHAR(128) NOT NULL,
    "rrcbjd_adm_type_conf" INTEGER NOT NULL,
    "rrcbjd_dir_asig_conf" INTEGER,
    "rrcbjd_dep_asig_conf" INTEGER,
    "rrcbjd_fe_reg_conf" DATE NOT NULL,
    "rrcbjd_fe_modif_conf" DATE,
    "rrcbjd_co_status_conf" INTEGER NOT NULL,
    "rrcbjd_fe_status_conf" DATE,
    "rrcbjd_usua_reg_conf" VARCHAR(32),
    "rrcbjd_usua_modif_conf" VARCHAR(32),

    CONSTRAINT "rrhh_contraloria_boletos_jefes_directores_config_pkey" PRIMARY KEY ("rrcbjd_id_conf")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_departamentos" (
    "rrde_rrdi_co_compania" VARCHAR(10) NOT NULL,
    "rrde_rrdi_id_direccion" INTEGER NOT NULL,
    "rrde_de_departamento" VARCHAR(60),
    "rrde_id_sap_departamento" VARCHAR(10) NOT NULL,
    "rrde_co_status" INTEGER,
    "rrde_fe_status" DATE,
    "rrde_co_usua" VARCHAR(10) NOT NULL,
    "rrde_fe_reg" DATE,
    "rrde_fe_modif" DATE,
    "rrde_id_departamento" SERIAL NOT NULL,

    CONSTRAINT "dep_pk" PRIMARY KEY ("rrde_id_departamento")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_direcciones" (
    "rrdi_rrcm_co_compania" VARCHAR(10) NOT NULL,
    "rrdi_id_direccion" SERIAL NOT NULL,
    "rrdi_de_direccion" VARCHAR(100) NOT NULL,
    "rrdi_id_sap_direccion" VARCHAR(10) NOT NULL,
    "rrdi_co_status" INTEGER,
    "rrdi_fe_status" DATE,
    "rrdi_co_usua" VARCHAR(10) NOT NULL,
    "rrdi_fe_reg" DATE,
    "rrdi_fe_modif" DATE,

    CONSTRAINT "direccion_pk" PRIMARY KEY ("rrdi_id_direccion")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_empleados" (
    "rrem_rrco_co_compania" VARCHAR(10) NOT NULL,
    "rrem_co_nacionalidad_empl" VARCHAR(4) NOT NULL,
    "rrem_ci_rif_empl" VARCHAR(20) NOT NULL,
    "rrem_co_sap_empl" INTEGER,
    "rrem_nm_empl" VARCHAR(100) NOT NULL,
    "rrem_fe_ingreso" DATE NOT NULL,
    "rrem_rrca_id_direccion" INTEGER NOT NULL,
    "rrem_gelo_id_localidad" VARCHAR(7),
    "rrem_co_sexo" VARCHAR(1),
    "rrem_co_edo_civil" VARCHAR(3),
    "rrem_fe_nacimiento" DATE,
    "rrem_email_empl" VARCHAR(100),
    "rrem_id_cargo_superv" VARCHAR(10),
    "rrem_co_status" INTEGER,
    "rrem_fe_status" DATE,
    "rrem_fe_egreso" DATE,
    "rrem_motv_egreso" VARCHAR(100),
    "rrem_observaciones" VARCHAR(100),
    "rrem_ind_nuev_ingreso" INTEGER,
    "rrem_fe_reg" DATE,
    "rrem_co_usua" VARCHAR(10) NOT NULL,
    "rrem_fe_modif" DATE,
    "rrem_rrca_id_cargo" INTEGER,
    "rrem_rrca_id_departam" INTEGER,
    "rrem_nu_telefono" VARCHAR(15),
    "rrem_nu_ext_telefono" VARCHAR(5),
    "rrem_foto" VARCHAR,
    "rrem_id_tipo_nu_ext_telefono_adc" INTEGER,
    "rrem_nu_telefono_adc" INTEGER,

    CONSTRAINT "pk_emplead" PRIMARY KEY ("rrem_ci_rif_empl","rrem_co_nacionalidad_empl")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_formatos" (
    "rrfo_id_formato" SERIAL NOT NULL,
    "rrfo_de_formato" VARCHAR,
    "rrfo_rrdi_id_direccion" INTEGER,
    "rrfo_rrde_id_departamento" INTEGER,
    "rrfo_co_usuario" VARCHAR(10),
    "rrfo_fe_reg" TIMESTAMPTZ(6),
    "rrfo_fe_mod" TIMESTAMPTZ(6),
    "rrfo_co_status" INTEGER,
    "rrfo_rrco_co_compania" INTEGER,
    "rrfo_co_usuario_aprobador" VARCHAR(10),

    CONSTRAINT "rrhh_formato_pkey" PRIMARY KEY ("rrfo_id_formato")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_horas_extras" (
    "rrhe_id_horas" SERIAL NOT NULL,
    "rrhe_co_usuario" VARCHAR(10),
    "rrhe_co_usario_reg" VARCHAR(10),
    "rrhe_fe_horas" DATE,
    "rrhe_de_actividad" VARCHAR,
    "rrhe_fe_reg" TIMESTAMPTZ(6),
    "rrhe_fe_mod" TIMESTAMPTZ(6),
    "rrhe_co_status" INTEGER,
    "rrhe_rrfo_formato_id" INTEGER,
    "rrhe_fe_inicio" TIMETZ(6),
    "rrhe_fe_fin" TIMETZ(6),

    CONSTRAINT "rrhh_horas_extras_pkey" PRIMARY KEY ("rrhe_id_horas")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_opd" (
    "rrcb_opd_id" BIGSERIAL NOT NULL,
    "rrcb_opd_emp" VARCHAR(191) NOT NULL,
    "rrcb_opd_url_emp_file" VARCHAR(512),
    "rrcb_opd_tracker" VARCHAR(512),
    "rrcb_opd_emp_email" VARCHAR(191),
    "rrcb_opd_emp_movil" BIGINT,
    "rrcb_opd_emp_tlf" BIGINT,
    "rrcb_opd_vu_salida" INTEGER NOT NULL,
    "rrcb_opd_vu_retorno" INTEGER,
    "rrcb_opd_fe_salida" DATE NOT NULL,
    "rrcb_opd_fe_retorno" DATE,
    "rrcb_opd_resp_dir" VARCHAR(191),
    "rrcb_opd_resp_cord" VARCHAR(191),
    "rrcb_opd_resp_cont" VARCHAR(191),
    "rrcb_opd_aprob_dir" INTEGER,
    "rrcb_opd_aprob_cord" INTEGER,
    "rrcb_opd_aprob_cont" INTEGER,
    "rrcb_rrts_id_tp_opd" INTEGER NOT NULL,
    "rrcb_rrts_id_motivo_opd" INTEGER NOT NULL,
    "rrcb_opd_fe_status" DATE NOT NULL,
    "rrcb_opd_status" INTEGER NOT NULL,
    "rrcb_observaciones_emp" VARCHAR(512),
    "rrcb_observaciones_resp_cont" VARCHAR(512),
    "rrcb_co_opd_status" INTEGER NOT NULL,
    "rrcb_fe_reg" TIMESTAMP(0) NOT NULL,
    "rrcb_fe_modif" TIMESTAMP(0),
    "rrcb_opd_one_way" INTEGER,
    "rrcb_opd_ho_salida" TIME(6),
    "rrcb_opd_ho_retorno" TIME(6),

    CONSTRAINT "rrhh_opd_pkey" PRIMARY KEY ("rrcb_opd_id")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_opd_pax" (
    "rhopd_id_pax" BIGSERIAL NOT NULL,
    "rhopd_rrcb_opd_id" INTEGER NOT NULL,
    "rhopd_ci_pax" VARCHAR(20) NOT NULL,
    "rhopd_nm_pax" VARCHAR(60) NOT NULL,
    "rhopd_tp_pax" INTEGER NOT NULL,
    "rhopd_co_status" INTEGER NOT NULL,
    "rhopd_fe_reg" DATE NOT NULL,
    "rhopd_fe_edit" DATE,
    "rhopd_fe_elim" DATE,
    "rhopd_co_usua_reg" VARCHAR(10) NOT NULL,
    "rhopd_co_usua_edit" VARCHAR(10),
    "rhopd_co_usua_elim" VARCHAR(10),
    "rhopd_motivo_elim" VARCHAR(256),

    CONSTRAINT "rrhh_opd_pax_pkey" PRIMARY KEY ("rhopd_id_pax")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_periodos_vacacionales" (
    "rrpv_periodo_id" BIGSERIAL NOT NULL,
    "rrpv_periodo_status" INTEGER,
    "rrpv_periodo_fe_ini" DATE,
    "rrpv_periodo_fe_fin" DATE,
    "rrpv_periodo_fe_rein" DATE,
    "rrpv_periodo_dias_disp" INTEGER,
    "rrpv_vacaciones_frag" INTEGER,
    "rrpv_periodo_num" INTEGER,
    "rrpv_periodo_fe" DATE,
    "rrpv_fecha_carga" DATE,
    "rrpv_status" INTEGER,
    "rrpv_fe_reg" DATE,
    "rrpv_fe_modif" DATE,
    "rrpv_periodo_emp" VARCHAR,

    CONSTRAINT "rrhh_periodos_vacacionales_pkey" PRIMARY KEY ("rrpv_periodo_id")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_recibo" (
    "rrre_id_recibo" SERIAL NOT NULL,
    "rrre_de_recibo" VARCHAR,
    "rrre_fecha_reg" DATE,
    "rrre_co_usuario" VARCHAR(10),
    "rrre_co_status" INTEGER,
    "rrre_fe_status" DATE,
    "rrre_fecha_mod" DATE,
    "rrre_de_monto" VARCHAR,
    "rrre_fe_recibo" VARCHAR(30),
    "rrre_de_cedula" VARCHAR,
    "rrre_de_dirigido" VARCHAR,

    CONSTRAINT "rrhh_recibo_pkey" PRIMARY KEY ("rrre_id_recibo")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_recibo_vip" (
    "rrre_id_vip" BIGSERIAL NOT NULL,
    "rrre_de_vip" VARCHAR(2000) NOT NULL,
    "rrre_fe_reg_vip" TIMESTAMP(0) NOT NULL,
    "rrre_co_usuario_vip" VARCHAR(500) NOT NULL,
    "rrre_co_status_vip" INTEGER NOT NULL,
    "rrre_fe_status_vip" TIMESTAMP(0) NOT NULL,
    "rrre_fe_mod_vip" TIMESTAMP(0) NOT NULL,
    "rrre_de_monto_vip" VARCHAR(2000) NOT NULL,
    "rrre_fe_recibo_vip" VARCHAR(2000) NOT NULL,
    "rrre_de_cedula_vip" VARCHAR(2000) NOT NULL,
    "rrre_de_dirigido_vip" VARCHAR(2000) NOT NULL,

    CONSTRAINT "rrhh_recibo_vip_pkey" PRIMARY KEY ("rrre_id_vip")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_solicitudes" (
    "rrso_id_solicitud" SERIAL NOT NULL,
    "rrso_rrts_id_direccion" INTEGER,
    "rrso_rrts_id_tp_solicitud" INTEGER,
    "rrso_co_usuario_sol" VARCHAR(10),
    "rrso_co_status_solicitud" INTEGER,
    "rrso_fe_status_solicitud" DATE,
    "rrso_fe_solicitud" DATE,
    "rrso_fe_exclusion" DATE,
    "rrso_co_status" INTEGER,
    "rrso_fe_status" DATE,
    "rrso_fe_reg" DATE,
    "rrso_fe_modif" DATE,
    "rrso_co_usuario_adm" VARCHAR(10),
    "rrso_ti_solicitud" VARCHAR(60),
    "rrso_di_ip_solicitud" VARCHAR(200),
    "rrso_observaciones_sol" VARCHAR(1000),
    "rrso_observaciones_adm" VARCHAR(1000),
    "rrso_co_usuario_sol_tlf" VARCHAR(10),
    "rrso_co_usuario_sol_mail" VARCHAR(64),
    "rrso_sol_opt1" INTEGER,
    "rrso_sol_opt2" INTEGER,
    "rrso_co_usuario_sol_amount_char" VARCHAR(200),
    "rrso_sol_opt_extra" VARCHAR(512),
    "rrso_co_usuario_sol_amount" VARCHAR(64),

    CONSTRAINT "rrhh_solicitudes_pkey" PRIMARY KEY ("rrso_id_solicitud")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_solicitudes_conf" (
    "rrso_id_conf" SERIAL NOT NULL,
    "rrso_adm_conf" VARCHAR(128) NOT NULL,
    "rrso_tlf_conf" BIGINT NOT NULL,
    "rrso_fe_reg_conf" DATE NOT NULL,
    "rrso_fe_modif_conf" DATE,
    "rrso_co_status_conf" INTEGER NOT NULL,
    "rrso_fe_status_conf" DATE,
    "rrso_usua_reg_conf" VARCHAR(32),
    "rrso_usua_modif_conf" VARCHAR(32),
    "rrso_usua_reg_ip_conf" VARCHAR(32) NOT NULL,
    "rrso_usua_modif_ip_conf" VARCHAR(32),

    CONSTRAINT "rrhh_solicitudes_conf_pkey" PRIMARY KEY ("rrso_id_conf")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_solicitudes_conf_firma" (
    "rrso_conf_firma_id" BIGSERIAL NOT NULL,
    "rrso_conf_firma_resp" INTEGER,
    "rrso_conf_firma_image" VARCHAR,
    "rrso_conf_firma_tlf1" VARCHAR(13),
    "rrso_conf_firma_tlf2" VARCHAR(13),
    "rrso_conf_firma_rif" VARCHAR(24),
    "rrso_conf_firma_dir" VARCHAR(256),
    "rrso_conf_firma_co_status" INTEGER,
    "rrso_conf_firma_co_usua_reg" VARCHAR(10),
    "rrso_conf_firma_co_usua_edit" VARCHAR(10),
    "rrso_conf_firma_fe_registro" TIMETZ(6) NOT NULL,
    "rrso_conf_firma_fe_modif" TIMETZ(6),
    "rrso_conf_firma_image_type" VARCHAR,

    CONSTRAINT "rrhh_solicitudes_conf_firma_pkey" PRIMARY KEY ("rrso_conf_firma_id","rrso_conf_firma_fe_registro")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_tipo_solicitudes" (
    "rrts_rrdi_rrcm_co_compania" VARCHAR(10) NOT NULL,
    "rrts_rrdi_id_direccion" INTEGER NOT NULL,
    "rrts_id_tp_solicitud" SERIAL NOT NULL,
    "rrts_nm_tp_solicitud" VARCHAR(100),
    "rrts_co_status" INTEGER,
    "rrts_fe_status" DATE,
    "rrts_co_usua" VARCHAR(10) NOT NULL,
    "rrts_fe_reg" DATE,
    "rrts_fe_modif" DATE,

    CONSTRAINT "rrhh_tipo_solicitudes_pkey" PRIMARY KEY ("rrts_id_tp_solicitud")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_variaciones" (
    "rrva_variaciones_id" BIGSERIAL NOT NULL,
    "rrva_variaciones_emp" VARCHAR(191) NOT NULL,
    "rrva_variaciones_resp_dir" VARCHAR(191),
    "rrva_variaciones_resp_cord" VARCHAR(191),
    "rrva_variaciones_resp_rrhh" VARCHAR(191),
    "rrva_variaciones_aprob_dir" INTEGER,
    "rrva_variaciones_aprob_cord" INTEGER,
    "rrva_variaciones_aprob_rrhh" INTEGER,
    "rrva_variaciones_num_dias_ausen" INTEGER NOT NULL,
    "rrva_variaciones_fe_ini" DATE NOT NULL,
    "rrva_variaciones_fe_fin" DATE NOT NULL,
    "rrva_variaciones_fe_rein" DATE NOT NULL,
    "rrva_rrts_id_tp_variacion" INTEGER NOT NULL,
    "rrva_variaciones_fe_status" DATE NOT NULL,
    "rrva_variaciones_status" INTEGER NOT NULL,
    "rrva_observaciones_emp" VARCHAR(500),
    "rrva_observaciones_resp_rrhh" VARCHAR(500),
    "rrva_co_variaciones_status" INTEGER NOT NULL,
    "rrva_fe_reg" TIMESTAMP(0) NOT NULL,
    "rrva_fe_modif" TIMESTAMP(0),
    "rrva_variaciones_suplente" VARCHAR,
    "rrva_variaciones_emp_file" VARCHAR(100000),
    "rrva_variaciones_ho_ini" TIME(6),
    "rrva_variaciones_ho_fin" TIME(6),

    CONSTRAINT "rrhh_variaciones_pkey" PRIMARY KEY ("rrva_variaciones_id")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_variaciones_config" (
    "rrvc_varcon_id" BIGSERIAL NOT NULL,
    "rrvc_varcon_adm" VARCHAR(191) NOT NULL,
    "rrvc_varcon_adm_type" INTEGER NOT NULL,
    "rrvc_varcon_dir_asig" INTEGER,
    "rrvc_varcon_dep_asig" INTEGER,
    "rrvc_varcon_fe_var" DATE NOT NULL,
    "rrvc_co_status" INTEGER,
    "rrvc_fe_status" DATE,
    "rrvc_co_usua_reg" VARCHAR(10) NOT NULL,
    "rrvc_co_usua_mod" VARCHAR(10),
    "rrvc_fe_reg" DATE NOT NULL,
    "rrvc_fe_modif" DATE,

    CONSTRAINT "rrhh_variaciones_config_pkey" PRIMARY KEY ("rrvc_varcon_id")
);

-- CreateTable
CREATE TABLE "rrhh"."rrhh_variaciones_config_notificaciones" (
    "rrva_id_conf" SERIAL NOT NULL,
    "rrva_adm_conf" VARCHAR(128) NOT NULL,
    "rrva_fe_reg_conf" DATE NOT NULL,
    "rrva_fe_modif_conf" DATE,
    "rrva_co_status_conf" INTEGER NOT NULL,
    "rrva_fe_status_conf" DATE,
    "rrva_usua_reg_conf" VARCHAR(32),
    "rrva_usua_modif_conf" VARCHAR(32),
    "rrva_usua_reg_ip_conf" VARCHAR(32) NOT NULL,
    "rrva_usua_modif_ip_conf" VARCHAR(32),
    "rrva_adm_conf_location" VARCHAR(6),

    CONSTRAINT "rrhh_variaciones_config_notificaciones_pkey" PRIMARY KEY ("rrva_id_conf")
);

-- CreateTable
CREATE TABLE "tecn"."jobs" (
    "id" BIGSERIAL NOT NULL,
    "queue" VARCHAR(191) NOT NULL,
    "payload" TEXT NOT NULL,
    "attempts" SMALLINT NOT NULL,
    "reserved_at" INTEGER,
    "available_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecn"."migrations" (
    "id" SERIAL NOT NULL,
    "migration" VARCHAR(191) NOT NULL,
    "batch" INTEGER NOT NULL,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_menu" (
    "temn_id_menu" SERIAL NOT NULL,
    "temn_de_menu" VARCHAR(50),
    "tmen_lo_menu" VARCHAR(60),
    "temn_co_status" INTEGER,
    "temn_fe_status" DATE,
    "temn_fe_reg" DATE,
    "temn_co_usua" VARCHAR(10),
    "temn_fe_modif" DATE,

    CONSTRAINT "menu_pk" PRIMARY KEY ("temn_id_menu")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_per_pri_sub" (
    "tpps_id_perprisub" SERIAL NOT NULL,
    "tpps_tepf_id_perfil" INTEGER,
    "tpps_tepr_id_priv" INTEGER,
    "tpps_tesm_id_submenu" INTEGER,
    "tpps_fe_reg" DATE,
    "tpps_co_usua" VARCHAR(10),
    "tpps_fe_modif" DATE,

    CONSTRAINT "per_pri_sub_pk" PRIMARY KEY ("tpps_id_perprisub")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_perfiles" (
    "tepf_id_perfil" SERIAL NOT NULL,
    "tepf_de_perfil" VARCHAR(50),
    "tepf_co_status" INTEGER,
    "tepf_fe_status" DATE,
    "tepf_fe_reg" DATE,
    "tepf_co_usuario" VARCHAR(10),
    "tepf_fe_modif" DATE,

    CONSTRAINT "perfil_pk" PRIMARY KEY ("tepf_id_perfil")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_privilegios" (
    "tepr_id_priv" SERIAL NOT NULL,
    "tepr_de_priv" VARCHAR(50),
    "tepr_co_status" INTEGER,
    "tepr_fe_status" DATE,
    "tepr_fe_reg" DATE,
    "tepr_co_usuario" VARCHAR(10),
    "tepr_fe_modif" DATE,

    CONSTRAINT "priv_pk" PRIMARY KEY ("tepr_id_priv")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_sistemas" (
    "tesi_id_sistema" SERIAL NOT NULL,
    "tesi_de_sistema" VARCHAR(20),
    "tesi_fe_reg" DATE,
    "tesi_fe_mod" DATE,
    "tesi_co_status" INTEGER,
    "tesi_co_usuario" VARCHAR(10),
    "tesi_ru_sistema" VARCHAR,
    "tesi_lo_sistema" VARCHAR(256),

    CONSTRAINT "tecn_sistemas_pkey" PRIMARY KEY ("tesi_id_sistema")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_submenu" (
    "tesm_temn_id_menu" INTEGER NOT NULL,
    "tesm_id_submenu" SERIAL NOT NULL,
    "tesm_de_submenu" VARCHAR(50),
    "tesm_co_status" INTEGER,
    "tesm_fe_status" DATE,
    "tesm_fe_reg" DATE,
    "tesm_co_usua" VARCHAR(10),
    "tesm_fe_modif" DATE,
    "tesm_de_ruta" VARCHAR(100),
    "tesm_tesi_id_sistema" INTEGER DEFAULT 1,

    CONSTRAINT "submenu_pk" PRIMARY KEY ("tesm_temn_id_menu","tesm_id_submenu")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_usu_perfiles" (
    "tsup_tusu_co_usuario" VARCHAR(10) NOT NULL,
    "tsup_tepf_id_perfil" INTEGER NOT NULL,
    "tsup_fe_reg" DATE,

    CONSTRAINT "usua_perfil" PRIMARY KEY ("tsup_tusu_co_usuario","tsup_tepf_id_perfil")
);

-- CreateTable
CREATE TABLE "tecn"."tecn_usuarios" (
    "tusu_co_usuario" VARCHAR(10) NOT NULL,
    "tusu_de_contrasena" VARCHAR(100) NOT NULL,
    "tusu_co_nacionalidad" VARCHAR(4) NOT NULL,
    "tusu_ci_rif_usuario" VARCHAR(20) NOT NULL,
    "tusu_tp_usuario" VARCHAR(2) NOT NULL,
    "tusu_nm_usuario" VARCHAR(100) NOT NULL,
    "tusu_email_usuario" VARCHAR(100),
    "tusu_co_status" INTEGER,
    "tusu_fe_status" DATE,
    "tusu_fe_desde" DATE,
    "tusu_fe_hasta" DATE,
    "tusu_co_usua_reg" VARCHAR(10) NOT NULL,
    "tusu_fe_reg" TIMESTAMPTZ(6),
    "tusu_fe_modif" DATE,
    "remember_token" VARCHAR(100),
    "tusu_ti_session" INTEGER,
    "tusu_ind_usu_mas" INTEGER,

    CONSTRAINT "tecn_usuario_pkey" PRIMARY KEY ("tusu_co_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "loc_uni_pk" ON "genr"."genr_localidades"("gelo_rrcm_co_compania", "gelo_id_localidad");

-- CreateIndex
CREATE UNIQUE INDEX "uni_co_sap" ON "rrhh"."rrhh_direcciones"("rrdi_id_sap_direccion");

-- CreateIndex
CREATE UNIQUE INDEX "uni_direc_pk" ON "rrhh"."rrhh_direcciones"("rrdi_rrcm_co_compania", "rrdi_id_direccion");

-- CreateIndex
CREATE INDEX "jobs_queue_index" ON "tecn"."jobs"("queue");

-- AddForeignKey
ALTER TABLE "genr"."genr_localidades" ADD CONSTRAINT "loc_compania_fk" FOREIGN KEY ("gelo_rrcm_co_compania") REFERENCES "rrhh"."rrhh_companias"("rrcm_co_compania") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genr"."genr_tabla_basica_det" ADD CONSTRAINT "basica_fk" FOREIGN KEY ("gtbd_getb_co_tabla") REFERENCES "genr"."genr_tabla_basica"("getb_co_tabla") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_itinerarios" ADD CONSTRAINT "fk_ruta" FOREIGN KEY ("opit_opru_id_ruta") REFERENCES "oper"."oper_ruta"("opru_id_ruta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_itinerarios" ADD CONSTRAINT "fk_vuelo" FOREIGN KEY ("opit_nu_vuelo") REFERENCES "oper"."oper_vuelos"("opvu_id_vuelo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_programacion_categoria" ADD CONSTRAINT "fk_programacion" FOREIGN KEY ("oper_oppr_id_programacion") REFERENCES "oper"."oper_programacion_pilotos"("oppr_id_programacion") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_programacion_pilotos" ADD CONSTRAINT "fk_programacion" FOREIGN KEY ("oppr_oppr_id_programacion") REFERENCES "oper"."oper_programacion"("oppr_id_programacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_programacion_vuelos" ADD CONSTRAINT "fk_itinerario_prog" FOREIGN KEY ("oper_opit_id_itinerario") REFERENCES "oper"."oper_itinerarios"("opit_id_itinerario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_programacion_vuelos" ADD CONSTRAINT "fk_prog" FOREIGN KEY ("oper_oppr_id_programacion") REFERENCES "oper"."oper_programacion_pilotos"("oppr_id_programacion") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_ruta" ADD CONSTRAINT "oper_ruta_opru_gear_aerop_destino_fkey" FOREIGN KEY ("opru_gear_aerop_destino") REFERENCES "genr"."genr_aeropuertos"("gear_id_aeropuerto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oper"."oper_ruta" ADD CONSTRAINT "oper_ruta_opru_gear_aerop_origen_fkey" FOREIGN KEY ("opru_gear_aerop_origen") REFERENCES "genr"."genr_aeropuertos"("gear_id_aeropuerto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_ausencias" ADD CONSTRAINT "fk_formatos" FOREIGN KEY ("rrau_rrfo_formato_id") REFERENCES "rrhh"."rrhh_formatos"("rrfo_id_formato") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_ausencias" ADD CONSTRAINT "fk_usuarios" FOREIGN KEY ("rrau_co_usuario") REFERENCES "tecn"."tecn_usuarios"("tusu_co_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_departamentos" ADD CONSTRAINT "direccion_fk" FOREIGN KEY ("rrde_rrdi_co_compania", "rrde_rrdi_id_direccion") REFERENCES "rrhh"."rrhh_direcciones"("rrdi_rrcm_co_compania", "rrdi_id_direccion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_direcciones" ADD CONSTRAINT "compania_fk" FOREIGN KEY ("rrdi_rrcm_co_compania") REFERENCES "rrhh"."rrhh_companias"("rrcm_co_compania") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_horas_extras" ADD CONSTRAINT "fk_formato" FOREIGN KEY ("rrhe_rrfo_formato_id") REFERENCES "rrhh"."rrhh_formatos"("rrfo_id_formato") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rrhh"."rrhh_horas_extras" ADD CONSTRAINT "fk_usuario" FOREIGN KEY ("rrhe_co_usuario") REFERENCES "tecn"."tecn_usuarios"("tusu_co_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_per_pri_sub" ADD CONSTRAINT "tpps_perf_fk" FOREIGN KEY ("tpps_tepf_id_perfil") REFERENCES "tecn"."tecn_perfiles"("tepf_id_perfil") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_per_pri_sub" ADD CONSTRAINT "tpps_priv_fk" FOREIGN KEY ("tpps_tepr_id_priv") REFERENCES "tecn"."tecn_privilegios"("tepr_id_priv") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_submenu" ADD CONSTRAINT "fk_sistema" FOREIGN KEY ("tesm_tesi_id_sistema") REFERENCES "tecn"."tecn_sistemas"("tesi_id_sistema") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_submenu" ADD CONSTRAINT "submenu_fk" FOREIGN KEY ("tesm_temn_id_menu") REFERENCES "tecn"."tecn_menu"("temn_id_menu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_usu_perfiles" ADD CONSTRAINT "perfil_fk" FOREIGN KEY ("tsup_tepf_id_perfil") REFERENCES "tecn"."tecn_perfiles"("tepf_id_perfil") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tecn"."tecn_usu_perfiles" ADD CONSTRAINT "usuario_fk" FOREIGN KEY ("tsup_tusu_co_usuario") REFERENCES "tecn"."tecn_usuarios"("tusu_co_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

