import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor"
import { Container } from "../styles"

interface IData {
    fornecedorModel: IFornecedor,
    nomePLanoDeConta: string,
    nomeBanco: string
}

export function FornecedorDetailsComplemento({ fornecedorModel, nomeBanco, nomePLanoDeConta }: IData) {

    return (

        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Banco"
                        type="text"
                        value={nomeBanco}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Plano de Contas"
                        type="text"
                        value={nomePLanoDeConta}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Responsável técnico"
                        type="text"
                        value={fornecedorModel.responsavelTecnico}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Observações"
                        type="text"
                        value={fornecedorModel.observacoes}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Home-Page"
                        type="text"
                        value={fornecedorModel.homePage}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">

                <div className="col-3">
                    <CustomInput
                        label="Autorização de funcionamento"
                        type="text"
                        value={fornecedorModel.autorizacaoFuncionamento}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-3">
                    <CustomInput
                        label="Autorização Especial"
                        type="text"
                        value={fornecedorModel.autorizacaoEspecial}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Licença Mapa"
                        type="text"
                        value={fornecedorModel.licencaMapa}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">


                <div className="col-2">
                    <CustomInput
                        label="Cadastro Farmácia"
                        type="text"
                        value={fornecedorModel.cadastroFarmacia}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Agência"
                        type="text"
                        value={fornecedorModel.agencia}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Conta Corrente"
                        type="text"
                        value={fornecedorModel.contaCorrenteFornecedor}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Alvará sanitário"
                        type="text"
                        value={fornecedorModel.alvaraSanitario}
                        readonly={true}
                        required={false}
                    />
                </div>


            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Valor mínimo"
                        type="number"
                        value={fornecedorModel.valorMinimoPedido}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Previsão de Entrega"
                        type="number"
                        value={fornecedorModel.previsaoEntrega}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Frete"
                        type="text"
                        value={fornecedorModel.frete}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Forma Pgto"
                        type="text"
                        value={fornecedorModel.formaPagamento}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

        </Container>
    )
}