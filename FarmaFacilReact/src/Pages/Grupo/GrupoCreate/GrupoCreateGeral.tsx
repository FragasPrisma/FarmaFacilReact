import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { ChangeEvent, useState } from "react";
import { Container } from "../styles";
import { IGrupo, IGrupoEnsaios } from "../../../Interfaces/Grupo/IGrupo";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";
import { MaxLengthNumber } from "../../../helper/MaxLengthNumber";

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

interface Erros {
    erros: {
        erro: boolean,
        index: number,
        erroNome: string
    }
}

export function GrupoCreateGeral({ erros }: Erros) {

    const [descricao, setDescricao] = useState("");
    const [comissao, setComissao] = useState(0);
    const [percentualDesconto, setPercentualDesconto] = useState(0);
    const [tipo, setTipo] = useState(0);
    const [ativaPesagemGrupo, setAtivaPesagemGrupo] = useState(false);
    const [descontoMaximo, setDescontoMaximo] = useState(0);
    const [ativaControleDeLotesAcabados, setAtivaControleDeLotesAcabados] = useState(false);
    const [fatorReferenciaGrupo, setFatorReferenciaGrupo] = useState(0);
    const [ativaControleLotesDrogaria, setAtivaControleLotesDrogaria] = useState(false);
    const [codigoGrupoLp, setCodigoGrupoLp] = useState("");

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
                                setComissao(MaxLengthNumber(2,10,parseFloat(e.target.value)))
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
                    {tipo == 5 &&
                        <>
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
                            <div className="col-2">
                                <CustomInput
                                    label="Markup (%)"
                                    type="number"
                                    placeholder="Digite o Markup"
                                    value={fatorReferenciaGrupo}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setFatorReferenciaGrupo(parseFloat(e.target.value))
                                    }
                                />
                            </div>
                        </>
                    }

                </div>
                <div className="row">
                    <div className="col-4">
                        <RadioCustom
                            name="tipo"
                            options={["Matéria-Prima", "Semi-Acabado", "Acabado", "Embalagem", "Cápsula", "Drogaria", "Homeopatia", "Floral"]}
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
                        {tipo == 5 &&
                            <CheckboxCustom
                                options={["Ativa Controle de Lotes"]}
                                check={ativaControleLotesDrogaria}
                                onClickOptions={(e) => setAtivaControleLotesDrogaria(e.target.checked)}
                            />
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}
