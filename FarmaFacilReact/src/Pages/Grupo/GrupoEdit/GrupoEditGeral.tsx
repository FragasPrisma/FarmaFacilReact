import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { ChangeEvent, useState } from "react";
import { Container } from "../styles";
import { IGrupo, IGrupoEnsaios } from "../IGrupo";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";

export let GrupoGeral: IGrupo = {
    id: 0,
    descricao: "",
    comissao: 0,
    percentualDesconto: 0,
    tipo: 0,
    ativaPesagemGrupo: false,
    descontoMaximo: 0,
    ativaControleDeLotesAcabados: false,
    fatorReferenciaGrupo: 0,
    ativaControleLotesDrogaria: false,
    codigoGrupoLp: "",
    grupoEnsaios: [] as IGrupoEnsaios[]
}

interface IData {
    erros: {
        erro: boolean,
        index: number,
        erroNome: string
    },
    GrupoModel:IGrupo
}

export function GrupoEditGeral({erros,GrupoModel} : IData) {

    const [descricao, setDescricao] = useState(GrupoModel.descricao);
    const [comissao, setComissao] = useState(GrupoModel.comissao);
    const [percentualDesconto, setPercentualDesconto] = useState(GrupoModel.percentualDesconto);
    const [tipo, setTipo] = useState(GrupoModel.tipo);
    const [ativaPesagemGrupo, setAtivaPesagemGrupo] = useState(GrupoModel.ativaPesagemGrupo);
    const [descontoMaximo, setDescontoMaximo] = useState(GrupoModel.descontoMaximo);
    const [ativaControleDeLotesAcabados, setAtivaControleDeLotesAcabados] = useState(GrupoModel.ativaControleDeLotesAcabados);
    const [fatorReferenciaGrupo, setFatorReferenciaGrupo] = useState(GrupoModel.fatorReferenciaGrupo);
    const [ativaControleLotesDrogaria, setAtivaControleLotesDrogaria] = useState(GrupoModel.ativaControleLotesDrogaria);
    const [codigoGrupoLp, setCodigoGrupoLp] = useState(GrupoModel.codigoGrupoLp);

    GrupoGeral.descricao = descricao;
    GrupoGeral.comissao = comissao;
    GrupoGeral.percentualDesconto = percentualDesconto;
    GrupoGeral.tipo = tipo;
    GrupoGeral.ativaPesagemGrupo = ativaPesagemGrupo;
    GrupoGeral.ativaControleDeLotesAcabados = ativaControleDeLotesAcabados;
    GrupoGeral.descontoMaximo = descontoMaximo;
    GrupoGeral.fatorReferenciaGrupo = fatorReferenciaGrupo;
    GrupoGeral.ativaControleLotesDrogaria = ativaControleLotesDrogaria;
    GrupoGeral.codigoGrupoLp = codigoGrupoLp;


    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-4">
                        <CustomInput
                            label="Descrição"
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricao}
                            maxLength={50}
                            erros={erros}
                            index={1}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDescricao(e.target.value)
                            }
                            required={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Comissão (%)"
                            type="number"
                            placeholder="Digite a comissão"
                            value={comissao}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setComissao(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Desconto (%)"
                            type="number"
                            erros={erros}
                            index={2}
                            placeholder="Digite o desconto"
                            value={percentualDesconto}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPercentualDesconto(parseFloat(e.target.value))
                            }
                            required={true}
                        />
                    </div>
                    {tipo == 2 &&
                        <div className="col-2">
                            <CustomInput
                                label="Desconto Max (%)"
                                type="number"
                                placeholder="Digite o desconto Max"
                                value={descontoMaximo}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescontoMaximo(parseFloat(e.target.value))
                                }
                            />
                        </div>

                    }

                </div>
                <div className="row">
                    <div className="col-4">
                        <RadioCustom
                            name="tipo"
                            options={["Matéria Prima", "Semi-Acabado", "Acabado", "Embalagem", "Cápsula", "Homeopatia", "Floral"]}
                            value={tipo}
                            titleComponet="Tipo"
                            onClickOptions={(check) => setTipo(check)}
                        />
                    </div>
                    <div className="col-3 mt-4">
                        {tipo == 0 &&
                            <CheckboxCustom
                                options={["Pesagem Monitorada"]}
                                check={ativaPesagemGrupo}
                                onClickOptions={(e) => setAtivaPesagemGrupo(e.target.checked)}
                            />
                        }
                        {tipo == 2 &&
                            <CheckboxCustom
                                options={["Ativa Controle de Lotes"]}
                                check={ativaControleDeLotesAcabados}
                                onClickOptions={(e) => setAtivaControleDeLotesAcabados(e.target.checked)}
                            />
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}
