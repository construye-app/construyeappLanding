// Utilidad para obtener todos los códigos de país y nombres desde una API pública
// Esta función puede ser usada en un script de build o para poblar el select dinámicamente

export async function fetchCountryCallingCodes() {
  // API pública de restcountries.com
  const res = await fetch('https://restcountries.com/v3.1/all?fields=idd,name');
  const data = await res.json();
  // Filtrar y mapear a formato { code, name }
  const codes = data
    .filter((c: any) => c.idd && c.idd.root)
    .flatMap((c: any) => {
      if (c.idd.suffixes && c.idd.suffixes.length > 0) {
        return c.idd.suffixes.map((s: string) => ({
          code: `${c.idd.root}${s}`,
          name: c.name.common
        }));
      } else {
        return [{ code: c.idd.root, name: c.name.common }];
      }
    })
    .filter((c: any) => c.code && c.name)
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
  return codes;
}

// Ejemplo de uso:
// fetchCountryCallingCodes().then(console.log);
