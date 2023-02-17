export function validCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;
  
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    let resto;
  
    // Verifica o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }
  
    if (resto != parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
  
    // Verifica o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }
  
    if (resto != parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  }
  