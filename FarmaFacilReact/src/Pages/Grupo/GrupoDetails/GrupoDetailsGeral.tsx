import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { IGrupo } from "../../../Interfaces/Grupo/IGrupo";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";

interface IData {
    GrupoModel: IGrupo
}

export function GrupoDetailsGeral({ GrupoModel }: IData) {

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-4">
                        <CustomInput
                            label="Descrição"
                            type="text"
                            value={GrupoModel.descricao}
                            readonly={true}
                            required={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Comissão (%)"
                            type="number"
                            value={GrupoModel.comissao}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Desconto (%)"
                            type="number"
                            value={GrupoModel.percentualDesconto}
                            readonly={true}
                            required={true}
                        />
                    </div>
                    {GrupoModel.tipo == 2 &&
                        <div className="col-2">
                            <CustomInput
                                label="Desconto Max (%)"
                                type="number"
                                value={GrupoModel.descontoMaximo}
                                readonly={true}
                            />
                        </div>

                    }

                </div>
                <div className="row">
                    <div className="col-4">
                        <RadioCustom
                            name="tipo"
                            options={["Matéria Prima", "Semi-Acabado", "Acabado", "Embalagem", "Cápsula", "Homeopatia", "Floral"]}
                            value={GrupoModel.tipo}
                            titleComponet="Tipo"
                            readonly={true}
                        />
                    </div>
                    <div className="col-3 mt-4">
                        {GrupoModel.tipo == 0 &&
                            <CheckboxCustom
                                options={["Pesagem Monitorada"]}
                                check={GrupoModel.ativaPesagemGrupo}
                                readOnly={true}
                            />
                        }
                        {GrupoModel.tipo == 2 &&
                            <CheckboxCustom
                                options={["Ativa Controle de Lotes"]}
                                check={GrupoModel.ativaControleDeLotesAcabados}
                                readOnly={true}
                            />
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}
