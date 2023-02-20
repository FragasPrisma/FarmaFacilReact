export function MaskIe(ie: string) {

    if(ie.charAt(0).toUpperCase() == "P"){
        return ie;
    }

    ie = ie.replace(/\D/g, ''); // Remove tudo que não for número
    ie = ie.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 3º dígito
    ie = ie.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após o 6º dígito
    ie = ie.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
    return ie;
}