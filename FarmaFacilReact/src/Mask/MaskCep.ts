export function MaskCep(cep: string) {
    cep = cep.replace(/\D/g, ''); // Remove tudo que não for número
    cep = cep.replace(/(\d{5})(\d{1,3})?/, '$1-$2'); // Adiciona hífen após os primeiros 5 dígitos
    return cep;
}