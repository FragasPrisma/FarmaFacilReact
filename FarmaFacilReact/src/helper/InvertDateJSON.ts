export function InvertDateJSON(date: string) {
    
    let dia = date.slice(0, 2)
    let mes = date.slice(3, 5)
    let ano = date.slice(6, 10)

    return ano + "-" + mes + "-" + dia
}