import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function setVfs(vfs) {
    pdfMake.vfs = vfs;
  }

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  export default pdfMake;