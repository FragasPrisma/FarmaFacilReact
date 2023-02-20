export function MaxLengthNumber(length: number, value: number) {

    value = value > length ? length : value 

    return value
}