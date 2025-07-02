export function transformEnumValue(value: string): string {
  const enumMapping: Record<string, string> = {
    "Cortes_a": "Cortesía",
    "En_tr_nsito": "En tránsito",
    // Agrega otros valores si es necesario
  };
  return enumMapping[value] || value;
}
