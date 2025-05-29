import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { excelTimeToHHMM } from "@/lib/utils";

export function BulkUploadFleetMovements({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Simular click en input
  const handleDropzoneClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    inputRef.current?.click();
  };

  // Manejar selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Nueva función para procesar y validar el archivo Excel
  const handleProcessFile = async () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (!json || json.length < 2) {
        alert("El archivo Excel no contiene datos válidos.");
        return;
      }
      // Obtener cabeceras y filas
      const headers = json[0];
      const rows = json.slice(1).filter((row: any) => row.length > 0);

      // Obtener aeronaves y vuelos de la API
      const [avionesRes, vuelosRes] = await Promise.all([
        fetch("/api/aeronaves").then((r) => r.json()),
        fetch("/api/vuelos").then((r) => r.json()),
      ]);
      const aviones = Array.isArray(avionesRes) ? avionesRes : [];
      const vuelos = Array.isArray(vuelosRes) ? vuelosRes : [];

      // Validar y mapear filas
      const errores: any[] = [];
      const movimientos: any[] = [];
      const advertencias: string[] = [];
      rows.forEach((row: any, idx: number) => {
        // Extraer datos por índice de columna (ajustar según tu Excel)
        const [
          dia,
          mes,
          anio,
          placa,
          vueloCod,
          origen,
          destino,
          etd,
          cpta,
          atd,
          eta,
          ata,
          a_pta,
          pax,
          flight_time,
          block_time,
          fob,
          fod,
          fuel_consumed,
          total_min_dly,
          delay_code_1,
          delay_code_2,
          runway,
          ldw,
          tow,
        ] = row;
        // Buscar ids
        const avion = aviones.find(
          (a: any) => a.opav_matricula_avion === placa
        );
        const vuelo = vuelos.find(
          (v: any) => String(v.opvu_co_vuelo) === String(vueloCod)
        );
        // Validaciones
        const filaErrores = [];
        if (!avion)
          filaErrores.push("Matrícula de aeronave no encontrada: " + placa);
        if (!vuelo)
          filaErrores.push("Código de vuelo no encontrado: " + vueloCod);
        if (!dia || !mes || !anio) filaErrores.push("Fecha incompleta");
        // Puedes agregar más validaciones aquí
        if (filaErrores.length > 0) {
          errores.push({ fila: idx + 2, errores: filaErrores }); // +2 por cabecera y base 1
          return;
        }
        // Construir fecha
        const meses = [
          "ENERO",
          "FEBRERO",
          "MARZO",
          "ABRIL",
          "MAYO",
          "JUNIO",
          "JULIO",
          "AGOSTO",
          "SEPTIEMBRE",
          "OCTUBRE",
          "NOVIEMBRE",
          "DICIEMBRE",
        ];
        const mesNum = meses.indexOf((mes + "").toUpperCase()) + 1;
        const fecha = mesNum
          ? `${anio}-${mesNum.toString().padStart(2, "0")}-${dia
              .toString()
              .padStart(2, "0")}`
          : null;
        // Definir longitudes máximas según schema.prisma
        const maxLen = {
          etd: 10,
          cpta: 10,
          atd: 10,
          eta: 10,
          ata: 10,
          a_pta: 10,
          flight_time: 10,
          block_time: 10,
          fob: 20,
          fod: 20,
          fuel_consumed: 20,
          delay_code_1: 10,
          delay_code_2: 10,
          runway: 10,
        };
        // Truncar y advertir si algún campo excede la longitud
        const advertencias: string[] = [];
        function truncar(valor: any, campo: keyof typeof maxLen) {
          if (valor && valor.length > maxLen[campo]) {
            advertencias.push(
              `Fila ${idx + 2}: '${campo}' excede ${
                maxLen[campo]
              } caracteres y será recortado.`
            );
            return valor.substring(0, maxLen[campo]);
          }
          return valor;
        }
        movimientos.push({
          opmf_opav_id_avion: avion.opav_id_avion,
          opmf_opvu_id_vuelo: vuelo.opvu_id_vuelo,
          etd: truncar(excelTimeToHHMM(etd), "etd"),
          cpta: truncar(excelTimeToHHMM(cpta), "cpta"),
          atd: truncar(excelTimeToHHMM(atd), "atd"),
          eta: truncar(excelTimeToHHMM(eta), "eta"),
          ata: truncar(excelTimeToHHMM(ata), "ata"),
          a_pta: truncar(excelTimeToHHMM(a_pta), "a_pta"),
          pax: pax ? Number(pax) : null,
          flight_time: truncar(excelTimeToHHMM(flight_time), "flight_time"),
          block_time: truncar(excelTimeToHHMM(block_time), "block_time"),
          fob: truncar(fob ? fob.toString() : null, "fob"),
          fod: truncar(fod ? fod.toString() : null, "fod"),
          fuel_consumed: truncar(
            fuel_consumed ? fuel_consumed.toString() : null,
            "fuel_consumed"
          ),
          // Usar Math.round para evitar errores de redondeo por decimales flotantes en total_min_dly
          total_min_dly:
            total_min_dly !== undefined &&
            total_min_dly !== null &&
            total_min_dly !== ""
              ? Math.round(Number(total_min_dly))
              : null,
          delay_code_1: truncar(
            delay_code_1 ? delay_code_1.toString() : null,
            "delay_code_1"
          ),
          delay_code_2: truncar(
            delay_code_2 ? delay_code_2.toString() : null,
            "delay_code_2"
          ),
          runway: truncar(runway ? runway.toString() : null, "runway"),
          ldw: ldw ? Number(ldw) : null,
          tow: tow ? Number(tow) : null,
          opmf_date: fecha,
        });
      });

      if (errores.length > 0) {
        // Mostrar errores detallados
        let msg = "Errores encontrados en el archivo:\n";
        errores.forEach((e) => {
          msg += `Fila ${e.fila}: ${e.errores.join(", ")}\n`;
        });
        alert(msg);
        return;
      }
      if (advertencias.length > 0) {
        alert("Advertencias:\n" + advertencias.join("\n"));
      }

      // Si no hay errores, enviar movimientos a la API en lote
      const response = await fetch("/api/movimiento-flota/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movimientos),
      });
      if (response.ok) {
        let count = 0;
        try {
          const res = await response.json();
          count = res?.count || 0;
        } catch {}
        alert(
          `Carga masiva completada correctamente. Registros guardados: ${count}`
        );
        if (onSuccess) onSuccess();
        return;
      } else {
        let res = null;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            res = await response.json();
          }
        } catch (e) {
          // Ignorar error de parseo
        }
        if (res?.detalles && Array.isArray(res.detalles)) {
          let msg = "Errores en la carga masiva:\n";
          res.detalles.forEach((e: any) => {
            msg += `Fila ${e.fila}: ${e.errores.join(", ")}\n`;
          });
          alert(msg);
        } else {
          alert(
            "Error en la carga masiva: " + (res?.error || response.statusText)
          );
        }
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 p-6 bg-white dark:bg-secondary rounded-lg flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">
        Carga masiva de movimientos de flota
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Selecciona o arrastra un archivo Excel (.xlsx) con los movimientos de
        flota a cargar. Solo se permite un archivo por vez.
      </p>
      <form className="w-full flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleFileChange}
          title="Selecciona un archivo Excel"
          placeholder="Selecciona un archivo Excel"
        />
        <div
          className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 ${
            dragActive
              ? "border-primary"
              : "border-gray-300 dark:border-gray-500"
          }`}
          onClick={handleDropzoneClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          tabIndex={0}
          aria-label="Elegir archivo Excel"
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && handleDropzoneClick(e)
          }
        >
          <span className="text-sm mb-2 text-gray-700 dark:text-white">
            Arrastra aquí tu archivo o
          </span>
          <label
            htmlFor="file-upload"
            className="inline-block px-4 py-2 rounded bg-primary text-white dark:bg-primary dark:text-gray-700 font-semibold text-sm cursor-pointer select-none opacity-90 mb-0"
          >
            Elegir archivo
          </label>
          {selectedFile && (
            <span className="mt-2 text-xs dark:text-white text-gray-700 font-medium">
              Archivo seleccionado: {selectedFile.name}
            </span>
          )}
        </div>
        <Button
          type="button"
          className="w-full"
          disabled={!selectedFile}
          onClick={handleProcessFile}
        >
          Cargar archivo
        </Button>
      </form>
      <span className="text-xs text-gray-400 dark:text-gray-500">
        (Vista solo visual, lógica de carga no implementada)
      </span>
    </div>
  );
}
