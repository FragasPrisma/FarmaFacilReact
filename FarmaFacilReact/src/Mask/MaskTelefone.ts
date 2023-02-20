export function MaskTelefone(telefone: string) {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for número
    telefone = telefone.replace(/^(\d{2})?(\d{4,5})(\d{4})$/, '$2-$3'); // Adiciona hífen entre o quarto e o quinto dígitos
    return telefone;
  }