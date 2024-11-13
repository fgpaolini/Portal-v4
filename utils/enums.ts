/* Encuentra la key de un enum en funcion del valor que se pase.
     Util para enums con base string:
        Por ejemplo: 
            findKeyByValue(ContratoAltaExtras,ContratoAltaExtras.Bateria)
    siendo 
        export enum ContratoAltaExtras {Bateria = "Batería virtual",GDOs = "GDOs",SegundaVivienda = "Segunda vivienda"}
    devolveria
        "Bateria"
        ya que la key del valor ContratoAltaExtras.Bateria ("Bateria virtual") es "Bateria" y no el valor.            
*/
export function findKeyByValue<T extends Record<string, string>>(enumObj: T, value: T[keyof T]): keyof T | undefined {
    return Object.keys(enumObj).find((key) => enumObj[key as keyof T] === value) as keyof T | undefined;
  }