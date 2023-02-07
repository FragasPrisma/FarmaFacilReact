import { Container } from "../styles"
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom"
import { IConvenio } from "../../../Interfaces/Convenio/IConvenio"
import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom"

interface IData {
    convenioModel: IConvenio,
    nomeVisitador: string
}

export function ConvenioDetailsComplemento({ convenioModel, nomeVisitador }: IData) {

    return (
        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Visitador"
                        type="text"
                        value={nomeVisitador}
                        readonly={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Etiqueta"
                        type="text"
                        value=""
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <CheckboxCustom
                        options={["Bloqueado"]}
                        check={convenioModel.bloqueado}
                        readOnly={true}
                    />
                </div>
                <div className="col-5">
                    <CheckboxCustom
                        options={["Utilizar endereço do Convênio no comprovante de venda"]}
                        check={convenioModel.enderecoComprovanteVenda}
                        readOnly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <CheckboxCustom
                        options={["Enviar E-Cmmerce"]}
                        check={convenioModel.enviarEcommerce}
                        readOnly={true}
                    />
                </div>
                <div className="col-3">
                    <CheckboxCustom
                        options={["Permitir Parcelamento"]}
                        check={convenioModel.permitirParcelamento}
                        readOnly={true}
                    />
                </div>
            </div>
            <div className="col-3 mb-5">
                <CheckboxCustom
                    options={["Permitir Rateio (Funcionário/Empresa)"]}
                    check={convenioModel.permitirRateio}
                    readOnly={true}
                />
            </div>
            <FieldsetCustom numberCols={8} legend="Grupo diferenciado Grupos Drogaria">

                {convenioModel.convenioGrupos.map((item) => (

                    <div key={item.id} className="row mt-2">
                        <div className="col-2">
                            <CustomInput
                                label="Grupo Id"
                                type="text"
                                value={item.grupoId}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Desconto"
                                type="number"
                                value={item.desconto}
                                required={true}
                                readonly={true}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <div className="row">
                                <div className="col-12">
                                    <CheckboxCustom
                                        options={["Aplica Desconto Produto"]}
                                        check={item.aplicaDescontoProduto}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="col-12">
                                    <CheckboxCustom
                                        options={["Custo Referência como Preço de Venda"]}
                                        check={item.aplicaCustoReferencia}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </FieldsetCustom>
        </Container>
    )
}