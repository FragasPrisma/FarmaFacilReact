import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { InverterDate } from '../helper/InverterDate';
import { IReport } from '../Interfaces/Report/IReport';

export function ReportContasPagas(report: IReport) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const stylesParameters: StyleDictionary = {
        headerTable: {
            fontSize: 10,
            bold: true,
            alignment: 'left',
        },
        bodyTable: {
            fontSize: 8,
            bold: false,
            alignment: 'left',
        },
        header: {
            fontSize: 12,
            bold: true,
            alignment: 'left',
        },
        subheader: {
            fontSize: 8,
            alignment: 'right',
        },
        periodo: {
            fontSize: 8,
            alignment: 'left',
        },
        footer: {
            fontSize: 8,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 10, 0]
        }
    }

    const details = [
        {
            columns: [
                {
                    text: `${report.nomeEmpresa} \n\n ${report.title} \n\n`,
                    style: ['header', 'quote']
                },
                {
                    text: `Data:${new Date().toLocaleDateString()} \n\n Hora: ${new Date().toLocaleTimeString()} \n\n`,
                    style: ['subheader']
                }
            ]
        },
        {
            columns: [
                {
                    text: `Período: ${InverterDate(report.perido.dataInicial)} a ${InverterDate(report.perido.dataFinal)} \n\n`,
                    style: ['periodo']
                }
            ]
        },
        {
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                style: "tableExample",
                widths: [...report.widths.map(x => {
                    return x
                })],

                body: [
                    [...report.cabecalho.map(x => {
                        return {
                            text: x,
                            style: ['headerTable', 'quote']
                        }
                    })],

                    ...report.dados.map(row => row.map((cell: any) => {
                        return {
                            text: cell,
                            style: 'bodyTable'
                        }
                    }))
                ]
            }
        }
    ]

    const doc: TDocumentDefinitions = {
        content: [details],
        styles: stylesParameters,
        footer: function (currentPage, pageCount) {
            return { text: `Pag. ${currentPage.toString()}`, style: 'footer' };
        },
    }
    pdfMake.createPdf(doc).open();
}