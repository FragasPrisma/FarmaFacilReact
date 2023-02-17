export function ValidCnpj(cnpj: string) {
    // Remover caracteres não numéricos do CNPJ
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    // CNPJs com todos os números iguais são inválidos
    if (cnpj.match(/^(\d)\1+$/)) {
      return false;
    }
  
    // Validar o primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    let digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (parseInt(cnpj.charAt(12)) !== digito) {
      return false;
    }
  
    // Validar o segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }
    digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (parseInt(cnpj.charAt(13)) !== digito) {
      return false;
    }
  
    // CNPJ é válido
    return true;
  }
  