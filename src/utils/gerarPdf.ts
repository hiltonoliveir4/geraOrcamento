import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "pdfmake/build/vfs_fonts";
import { logo } from "./logoBase64";
import { formatToEuro } from "./formatToEuro";
import { filesToBase64 } from "./filesToBase64";

pdfMake.vfs = vfs;

export const gerarPDF = async (data: any) => {
    const logobase64 = logo
    const imagensBase64 = await filesToBase64(data.imagens || []);
    const imagensEmLinhas = [];

    for (let i = 0; i < imagensBase64.length; i += 2) {
        imagensEmLinhas.push([
            { image: imagensBase64[i], width: 200, margin: [0, 10, 0, 10] },
            imagensBase64[i + 1]
                ? { image: imagensBase64[i + 1], width: 200, margin: [0, 10, 0, 10] }
                : '' // se não houver segunda imagem, célula vazia
        ]);
    }

    const subTotal = data.itens.reduce((acc: any, item: any) => acc + Number(item.total), 0)
    const valorIva =  data.valor_iva ? subTotal * (Number(data.valor_iva) / 100) : 0
    const docDefinition: any = {
        content: [
            {
                image: `${logobase64}`,  width: 150, alignment: "center"
            },
            { text: "ASG AltaSensor, Lda.", style: "header", alignment: "center", fontSize: 8 },
            { text: "Praceta Cidade Brasília N.º 4 – 1º B – 2735-660 Agualva - Cacém", alignment: "center",  fontSize: 8 },
            { text: "Tlm: 967 320 321 – Email: geral@altasensorgas.pt altasensorgas@gmail.com", alignment: "center",  fontSize: 8 },
            { text: "NIF: 509 381 820", alignment: "center", margin: [0, 0, 0, 20],  fontSize: 8 },

            { text: [{text: 'IMPIC: ', bold: true}, `${data.impic}`] },
            { text: [{text: 'Orçamento Nº: ', bold: true}, `${data.orcamento}`]},
            { text: [{text: 'Data: ', bold: true}, `${data.data}`] },
            { text: [{text: 'Cliente: ', bold: true}, `${data.cliente}`]},
            { text: [{text: 'Morada de obra: ', bold: true},  `${data.morada}`], margin: [0, 0, 0, 20] },
            {
                table: 
                    {
                        headerRows: 1,
                        widths: [ '*'],
                        body: [
                            [ {text: `${data.obra.toUpperCase()}`, bold: true, alignment: "center", color: '#ffffff'} ],
                        ]
                    }, 
                    layout: {
                        fillColor: "#0099cc",
                        hLineWidth: () => 0,
                        vLineWidth: () => 0
                    },
                    margin: [0, 0, 0, 10]
            },
            {
                table: {
                    widths: [30, "*", 30, 40, 70],
                    body: [
                        [
                            { text: "Item", bold: true }, 
                            { text: "Descrição", bold: true }, 
                            { text: "Unid.", bold: true }, 
                            { text: "Quant.", bold: true }, 
                            { text: "Total", bold: true }
                        ],
                        ...(data.itens || []).map((item: any, i: number) => [
                            { text: item.item || i + 1, margin: [0, 0, 0, 10] },
                            { text: item.descricao || "", margin: [0, 0, 0, 10] },
                            { text: item.unidade || "", margin: [0, 0, 0, 10] },
                            { text: item.quantidade || "", margin: [0, 0, 0, 10] },
                            { text: formatToEuro(item.total) || "", margin: [0, 0, 0, 10] },
                        ]),
                    ],
                },
                layout: {
                    fillColor: function (rowIndex: number) {
                        return rowIndex === 0 ? "#EEEEEE" : null;
                    },
                    bold:function (rowIndex: number) {
                        return rowIndex === 0 ? true : false;
                    },
                    hLineWidth: () => 0,
                    vLineWidth: () => 0
                },
                margin: [0, 0, 0, 5]
            },
            {
                layout: 'noBorders',
                table: {
                    widths: [30, "*", 30, 80, 70],
                    body: [
                        ["", "", "", { text: 'Subtotal', bold: true }, formatToEuro(subTotal)],
                        ["", "", "", { text: 'Iva', bold: true }, formatToEuro(valorIva)],
                        ["", "", "", { text: 'Total', bold: true }, formatToEuro(subTotal + valorIva)],
                    ],
                },
                pageBreak: 'after'
            },

            //OUTRA PAGINA
            { text: "Validade do orçamento:", alignment: "left", bold: true, margin: [0, 20, 0, 0] },
            { text: `A validade é de ${data.validade}`, alignment: "left", margin: [0, 0, 0, 20] },

            { text: "IVA:", alignment: "left", bold: true },
            { text: `IVA à taxa legal de ${data.valor_iva}%`, alignment: "left", margin: [0, 0, 0, 20]},
            
            { text: "Condições de pagamento:", alignment: "left", bold: true },
            { text: `${data.pagamento}`, alignment: "left", margin: [0, 0, 0, 20]},

            { text: "Prazo de Execução dos trabalhos:", alignment: "left", bold: true },
            { text: `${data.prazo}`, alignment: "left", margin: [0, 0, 0, 20]},

            { text: [{text: 'IBAN: ', bold: true}, `${data.iban}`], alignment: "left", margin: [0, 0, 0, 20]},

            { text: "Seguro:", alignment: "left", bold: true },
            { text: `${data.seguro}`, alignment: "left", margin: [0, 0, 0, 20]},

            { text: "Exclusões:", alignment: "left", bold: true },
            { text: `${data.exclusoes}`, alignment: "left", margin: [0, 0, 0, 60]},

            //IMAGENS
            { text: "FOTOGRAFIAS DOS ESPAÇOS A INTERVIR", alignment: "left", bold: true, margin: [0, 20, 0, 0] },
            {
                table: {
                    widths: ['*', '*'],
                    body: imagensEmLinhas
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            header: {
                fontSize: 8,
                bold: true,
                margin: [0, 0, 0, 10],
            },
        },
        defaultStyle: {
            fontSize: 12,
        },
    };

    pdfMake.createPdf(docDefinition).download(`orcamento_${data.orcamento}_cliente_${data.cliente}.pdf`);
};
