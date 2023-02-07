import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { Container } from "../styles"
import { RadioCustom } from "../../../Components/Inputs/RadioCustom"
import { IConvenio } from "../../../Interfaces/Convenio/IConvenio"

interface IData {
    convenioModel: IConvenio,
    nomeEndereco: { nomeEstado: string, nomeCidade: string, nomeBairro: string }
}

export function ConvenioDetailsGeral({ convenioModel, nomeEndereco }: IData) {

    return (
        <Container>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Nome"
                        type="text"
                        value={convenioModel.nome}
                        readonly={true}
                        required={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Desconto (%)"
                        type="text"
                        value={convenioModel.desconto}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Acréscimo (%)"
                        type="text"
                        value={convenioModel.acrescimo}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Manifesto (%)"
                        type="text"
                        value={convenioModel.manifesto}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Dia Recebimento"
                        type="number"
                        value={convenioModel.diaRecebimento}
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        value={convenioModel.cep}
                        readonly={true}
                    />
                </div>
                <div className="col-6">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        value={convenioModel.endereco}
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        value={convenioModel.numeroEndereco}
                        readonly={true}
                    />
                </div>
                <div className="col-6">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        value={convenioModel.complemento}
                        readonly={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Estado"
                        type="text"
                        value={nomeEndereco.nomeEstado}
                        readonly={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Cidade"
                        type="text"
                        value={nomeEndereco.nomeCidade}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Bairro"
                        type="text"
                        value={nomeEndereco.nomeBairro}
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <RadioCustom
                        name="convenio"
                        options={["Outros", "Pertech", "Tekla", "Celos", "Perdigão", "Brandili"]}
                        value={convenioModel.identificadorConvenio}
                        titleComponet="Indentificador Convênio"
                        readonly={true}
                    />
                </div>
                <div className="col-4 mt-4">
                    <div className="row">
                        {convenioModel.identificadorConvenio == 4 &&

                            <CustomInput
                                label="Código Perdigão"
                                type="text"
                                value={convenioModel.codigoPerdigao}
                                readonly={true}
                            />
                        }
                        <CustomInput
                            label="DDD"
                            type="text"
                            value={convenioModel.ddd}
                            readonly={true}
                        />
                        <CustomInput
                            label="Telefone"
                            type="text"
                            value={convenioModel.telefone}
                            readonly={true}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-2">
                    <CustomInput
                        label="Cad. Farmácia"
                        type="text"
                        value={convenioModel.cadastroFarmacia}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Dias Primeiro Vcto"
                        type="text"
                        value={convenioModel.diasPrimeiroVencimento}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="CNPJ"
                        type="text"
                        value={convenioModel.cnpj}
                        readonly={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Inscrição Estadual"
                        type="text"
                        value={convenioModel.ie}
                        readonly={true}
                    />
                </div>
            </div>
        </Container>
    )
}