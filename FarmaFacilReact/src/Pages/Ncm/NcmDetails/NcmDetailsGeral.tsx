import { useEffect, useState } from "react";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";
import { INcmGeral } from "../NcmGeral";
import { Container } from "../styles";

interface Data {
    NcmGeralModel: INcmGeral;
}

export function NcmDetailsGeral({ NcmGeralModel }: Data) {
    const [descricaoPisEntrada, setDescricaoPisEntrada] = useState("");
    const [descricaoPisSaida, setDescricaoPisSaida] = useState("");
    const [descricaoCofinsEntrada, setDescricaoCofinsEntrada] = useState("");
    const [descricaoCofinsSaida, setDescricaoCofinsSaida] = useState("");

    useEffect(() => {
        if (NcmGeralModel.tributoCstCofinsEntrada) {
            setDescricaoCofinsEntrada(NcmGeralModel.tributoCstCofinsEntrada.descricao)
        }

        if (NcmGeralModel.tributoCstCofinsSaida) {
            setDescricaoCofinsSaida(NcmGeralModel.tributoCstCofinsSaida.descricao)
        }

        if (NcmGeralModel.tributoCstPisEntrada) {
            setDescricaoPisEntrada(NcmGeralModel.tributoCstPisEntrada.descricao)
        }

        if (NcmGeralModel.tributoCstPisSaida) {
            setDescricaoPisSaida(NcmGeralModel.tributoCstPisSaida.descricao)
        }
        
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
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Código Ncm"
                            type="text"
                            value={NcmGeralModel.codigoNcm}
                            maxLength={10}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Percentual MVA %"
                            type="number"
                            value={NcmGeralModel.percentualMva}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Código Ex"
                            type="number"
                            value={NcmGeralModel.codigoNcmEx}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Aliquota Nacional %"
                            type="number"
                            value={NcmGeralModel.aliquotaNacional}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Aliquota Importação %"
                            type="number"
                            value={NcmGeralModel.aliquotaImportacao}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["NCM de Serviço"]}
                            check={NcmGeralModel.produtoServico}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            value={descricaoPisEntrada}
                            label="Cst Pis Entrada"
                            type="text"
                            readonly={true}
                        />
                    </div>
                    <div className="col-3">
                        <CustomInput
                            value={descricaoPisSaida}
                            label="Cst Pis Saída"
                            type="text"
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <CustomInput
                            value={descricaoCofinsEntrada}
                            label="Cst Cofins Entrada"
                            type="text"
                            readonly={true}
                        />
                    </div>
                    <div className="col-3">
                        <CustomInput
                            value={descricaoCofinsSaida}
                            label="Cst Cofins Saída"
                            type="text"
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <CustomInput
                            label="Aliquota Pis %"
                            type="number"
                            value={NcmGeralModel.aliquotaPis}
                            readonly={true}
                        />
                    </div>
                    <div className="col-1">
                        <CustomInput
                            label="Aliquota Cofins %"
                            type="number"
                            value={NcmGeralModel.aliquotaCofins}
                            readonly={true}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}