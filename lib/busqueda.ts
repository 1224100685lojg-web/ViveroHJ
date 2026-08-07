export function normalizarTexto(
  texto:string
){

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .trim();

}



export function buscarTexto(
  texto:string,
  busqueda:string
){

  const contenido =
    normalizarTexto(texto);


  const palabras =
    normalizarTexto(busqueda)
    .split(" ")
    .filter(Boolean);



  return palabras.every(
    palabra =>
      contenido.includes(palabra)
  );

}