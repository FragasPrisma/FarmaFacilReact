export function MaskCep(cep: string) {

    if(!cep) return "";

    cep = cep.replace(/\D/g, ''); // Remove tudo que não for número
    cep = cep.replace(/(\d{5})(\d{1,3})?/, '$1-$2'); // Adiciona hífen após os primeiros 5 dígitos
    return cep;
}

export function MaskCnpj(cnpj: string) {

    if(!cnpj) return "";

    cnpj = cnpj.replace(/\D/g, ''); // Remove tudo que não for número
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após o 2º dígito
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 5º dígito
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2'); // Adiciona barra após o 8º dígito
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona hífen antes dos últimos 4 dígitos
    return cnpj;
}

export function MaskCpf(cpf: string) {
    if(!cpf) return "";
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 3º dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 6º dígito
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
    return cpf;
}

export function MaskIe(ie: string) {

    if(!ie) return "";

    if(ie.charAt(0).toUpperCase() == "P"){
        return ie;
    }

    ie = ie.replace(/\D/g, ''); // Remove tudo que não for número
    ie = ie.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 3º dígito
    ie = ie.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 6º dígito
    ie = ie.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
    return ie;
}

export function MaskIm(im: string) {
    im = im.replace(/\D/g, ''); // Remove tudo que não for número
    im = im.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/, '$1/$2-$3'); // Adiciona barras e hífen nos lugares corretos
    return im;
}

export function MaskTelefone(telefone: string) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for número
    telefone = telefone.replace(/^(\d{2})?(\d{4,5})(\d{4})$/, '$2-$3'); // Adiciona hífen entre o quarto e o quinto dígitos
    return telefone;
  }