export function MaskIm(im: string) {
    im = im.replace(/\D/g, ''); // Remove tudo que não for número
    im = im.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/, '$1/$2-$3'); // Adiciona barras e hífen nos lugares corretos
    return im;
}