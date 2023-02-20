export function MaskCnpj(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, ''); // Remove tudo que não for número
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após o 2º dígito
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 5º dígito
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2'); // Adiciona barra após o 8º dígito
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona hífen antes dos últimos 4 dígitos
    return cnpj;
}