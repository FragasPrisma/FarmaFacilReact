import { ChangeEvent, useEffect, useState } from "react";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";
import { getAll } from "../../../Services/Api";
import { INcmGeral, NcmGeral } from "../NcmGeral";
import { Container } from "../styles";

interface Data {
    NcmGeralModel: INcmGeral;
}

interface Error {
    error: { erro: boolean, index: number, erroNome: string }
}

export function NcmEditGeral({NcmGeralModel}: Data, {error}: Error) {
    const [tributosPisCofins, setTributosPisCofins] = useState([]);

    const [produtoServico, setProdutoServico] = useState(true);
    const [descricao, setDescricao] = useState("");
    const [codigoNcm, setCodigoNcm] = useState("");
    const [codigoNcmEx, setCodigoNcmEx] = useState(0);
    const [percentualMva, setPercentualMva] = useState(0);
    const [aliquotaNacional, setAliquotaNacional] = useState(0);
    const [aliquotaImportacao, setAliquotaImportacao] = useState(0);
    const [aliquotaCofins, setAliquotaCofins] = useState(0);
    const [aliquotaIcmsProduto, setAliquotaIcmsProduto] = useState(0);
    const [aliquotaPis, setAliquotaPis] = useState(0);
    const [tributoCstCofinsEntradaId, setTributoCstCofinsEntradaId] = useState(null);
    const [tributoCstCofinsSaidaId, setTributoCstCofinsSaidaId] = useState(null);
    const [tributoCstPisEntradaId, setTributoCstPisEntradaId] = useState(null);
    const [tributoCstPisSaidaId, setTributoCstPisSaidaId] = useState(null);

    NcmGeral.produtoServico = produtoServico;
    NcmGeral.descricao = descricao;
    NcmGeral.codigoNcm = codigoNcm;
    NcmGeral.codigoNcmEx = codigoNcmEx;
    NcmGeral.percentualMva = percentualMva;
    NcmGeral.aliquotaNacional = aliquotaNacional;
    NcmGeral.aliquotaImportacao = aliquotaImportacao;
    NcmGeral.aliquotaCofins = aliquotaCofins;
    NcmGeral.aliquotaIcmsProduto = aliquotaIcmsProduto;
    NcmGeral.aliquotaPis = aliquotaPis;
    NcmGeral.tributoCstCofinsEntradaId = tributoCstCofinsEntradaId;
    NcmGeral.tributoCstCofinsSaidaId = tributoCstCofinsSaidaId;
    NcmGeral.tributoCstPisEntradaId = tributoCstPisEntradaId;
    NcmGeral.tributoCstPisSaidaId = tributoCstPisSaidaId;

    useEffect(() => {
        const loadDataTributos = async () => {
            const response = await getAll("ListaTributo");
            setTributosPisCofins(response.data.filter((x: { tipoTributo: number; }) => (x.tipoTributo == 4)));
        }
        loadDataTributos();

    }, [])
    
    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-4">
                        <CustomInput
                            label="descricao"
                            type="text"
                            value={NcmGeralModel.descricao}
                            maxLength={50}
                            erros={error}
                            index={1}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDescricao(e.target.value)
                            }
                            required={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Código Ncm"
                            type="text"
                            value={NcmGeralModel.codigoNcm}
                            maxLength={10}
                            erros={error}
                            index={2}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCodigoNcm(e.target.value)
                            }
                            required={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Percentual MVA %"
                            type="number"
                            value={NcmGeralModel.percentualMva}
                            erros={error}
                            index={3}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPercentualMva(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Código Ex"
                            type="number"
                            value={NcmGeralModel.codigoNcmEx}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCodigoNcmEx(parseFloat(e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Aliquota Nacional %"
                            type="number"
                            value={NcmGeralModel.aliquotaNacional}
                            erros={error}
                            index={4}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAliquotaNacional(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Aliquota Importação %"
                            type="number"
                            value={NcmGeralModel.aliquotaImportacao}
                            erros={error}
                            index={5}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAliquotaImportacao(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["NCM de Serviço"]}
                            check={NcmGeralModel.produtoServico}
                            onClickOptions={(e) => setProdutoServico(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomDropDown
                            data={tributosPisCofins}
                            title={NcmGeralModel.tributoCstPisEntrada?.descricao || ""}
                            filter="descricao"
                            label="Cst Pis Entrada"
                            Select={(tributoCstPisEntradaId) => setTributoCstPisEntradaId(tributoCstPisEntradaId)}
                        />
                    </div>
                    <div className="col-3">
                        <CustomDropDown
                            data={tributosPisCofins}
                            title={NcmGeralModel.tributoCstPisSaida?.descricao || ""}
                            filter="descricao"
                            label="Cst Pis Saída"
                            Select={(tributoCstPisSaidaId) => setTributoCstPisSaidaId(tributoCstPisSaidaId)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomDropDown
                            data={tributosPisCofins}
                            title={NcmGeralModel.tributoCstCofinsEntrada?.descricao || ""}
                            filter="descricao"
                            label="Cst Cofins Entrada"
                            Select={(tributoCstCofinsEntradaId) => setTributoCstCofinsEntradaId(tributoCstCofinsEntradaId)}
                        />
                    </div>
                    <div className="col-3">
                        <CustomDropDown
                            data={tributosPisCofins}
                            title={NcmGeralModel.tributoCstCofinsSaida?.descricao || ""}
                            filter="descricao"
                            label="Cst Cofins Saída"
                            Select={(tributoCstCofinsSaidaId) => setTributoCstCofinsSaidaId(tributoCstCofinsSaidaId)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <CustomInput
                            label="Aliquota Pis %"
                            type="number"
                            value={NcmGeralModel.aliquotaPis}
                            erros={error}
                            index={6}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAliquotaPis(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="col-1">
                        <CustomInput
                            label="Aliquota Cofins %"
                            type="number"
                            value={NcmGeralModel.aliquotaCofins}
                            erros={error}
                            index={7}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAliquotaCofins(parseFloat(e.target.value))
                            }
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}