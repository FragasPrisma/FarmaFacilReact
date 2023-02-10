export function GerarVencimento(dataEmissao: string, dataPrimeiroVencimento: string, index: number) {

    let vcto = dataPrimeiroVencimento ? dataPrimeiroVencimento : dataEmissao
    let date = new Date(vcto);
    date.setHours(date.getHours() + 3) 
            
    date.setMonth(date.getMonth() + index)
    
    let mesNumber = date.getMonth() 

    if(mesNumber == 0){
        date.setFullYear(date.getFullYear() - 1)
        mesNumber = 12;
    }

    let dia =
        date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString()

    let mes =
        mesNumber < 10
            ? "0" + mesNumber.toString()
            : mesNumber.toString();

    let dateString = date.getFullYear().toString() + "-" + mes + "-" + dia;

    return dateString;

}