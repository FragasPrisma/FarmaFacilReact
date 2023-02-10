export function InverterDate(date: string) {
    let ano = date.slice(0, 4)
    let mes = date.slice(5, 7)
    let dia = date.slice(8, 10)

    return dia + "/" + mes + "/" + ano
}