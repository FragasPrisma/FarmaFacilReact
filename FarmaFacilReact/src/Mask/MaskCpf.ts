export function MaskCpf(cpf: string) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 3º dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 6º dígito
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
    return cpf;
}