import pdfMake from 'pdfmake/build/pdfmake'
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { InverterDate } from '../helper/InverterDate';
import { IReport } from '../Interfaces/Report/IReport';
import fonstPdfMake from '../fontsPdfMake.json'

export function ReportContasPagas(report: IReport) {

    pdfMake.vfs = fonstPdfMake;
    
    const stylesParameters: StyleDictionary = {
        headerTable: {
            fontSize: 7,
            bold: true,
            alignment: 'left',
        },
        bodyTable: {
            fontSize: 5,
            bold: false,
            alignment: 'left',
        },
        bodyTableBold: {
            fontSize: 7,
            bold: true,
            alignment: 'left',
        },
        header: {
            fontSize: 12,
            bold: true,
            alignment: 'left',
            margin: [0, 10, 0, 5],
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
            style: ['header', 'quote'],
            
            table:{
                
                widths: [300, 185],
                heights: [30, 30],
                body:[
                    [report.nomeEmpresa,`Data:${new Date().toLocaleDateString()}`],
                    [{stack:[report.title]},{stack:[`Hora: ${new Date().toLocaleTimeString()}`]}]
                ],

            }
            // columns: [
            //     {
            //         text: `${report.nomeEmpresa} \n\n ${report.title} \n\n`,
            //         style: ['header', 'quote']
            //     },
            //     {
            //         text: `Data:${new Date().toLocaleDateString()} \n\n Hora: ${new Date().toLocaleTimeString()} \n\n`,
            //         style: ['subheader']
            //     }
            // ]
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
                style:"tableExample",
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
                        
                        if(!row[1]){
                            return {
                                text: cell,
                                style: 'bodyTableBold'
                            }    
                        }

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