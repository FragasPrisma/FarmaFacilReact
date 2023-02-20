export interface ITurno {
    id: number,
    horaInicial: Date | undefined,
    horaFinal: Date | undefined,
    filialId: number | null
}