import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

export function BulkUploadFleetMovements() {
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

  // Nueva función para procesar el archivo Excel
  const handleProcessFile = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Mostrar los datos en consola
      console.log("Datos del Excel:", json);
      alert("Datos del Excel mostrados en consola");
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
