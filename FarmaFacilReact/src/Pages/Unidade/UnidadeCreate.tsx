import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { Console } from "console";

export function UnidadeCreate() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [erroSigla, setErroSigla] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");

    const [sigla, setSigla] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [fator, setFator] = useState(0);

    const [unidadesConversao, setUnidadesConversao] = useState([{id:0,sigla:"",descricao:"",fator:0,unidadeId:0}]);
    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        const loadDataUnidade = async () => {
            const response = await getAll("ListaUnidade");
            setUnidades(response.data);
        }

        loadDataUnidade()
    }, []);

    let unidadeConversaoModel = {
        id: 0,
        sigla: "",
        descricao:"",
        fator: 0,
        unidadeId: 0
    }

    const data = {
        id: 0,
        sigla: "st",
        descricao: "string",
        tipo: 0,
        fator: 0,
        unidadesConversao: [{id:0,sigla:"",descricao:"",fator:0,unidadeId:0}]
    };

    async function submit() {

        setErroSigla("");
        setErroDescricao("");
        setIsLoading(true);


        const response = await postFormAll("AdicionarUnidade", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/unidade");
            }, 2000);
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000);
        }
    }

    function AdicionarUnidadeConversao(idUnidade: number) {

        

        unidades.map((x: { id: Number, sigla: "", descricao: "", fator: 0 }) => {

            if (x.id == idUnidade) {

                unidadeConversaoModel.sigla = x.sigla;
                unidadeConversaoModel.descricao = x.descricao;
                unidadeConversaoModel.fator = x.fator
                unidadeConversaoModel.unidadeId = idUnidade;

                data.unidadesConversao.push(unidadeConversaoModel)
                console.log(unidadeConversaoModel)
            }

        });


    }

    return (
        <>
            <HeaderMainContent
                title="ADICIONAR UNIDADE"
                IncludeButton={false}
                ReturnButton={false}
            />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Sigla"
                                type="text"
                                placeholder="Digite a sigla"
                                value={sigla}
                                maxLength={2}
                                erro={erroSigla}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSigla(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
                                value={descricao}
                                maxLength={50}
                                erro={erroDescricao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <RadioCustom
                                titleComponet="Tipo"
                                options={[
                                    "Massa",
                                    "Volume"
                                ]}
                                name="tipo"
                                onClickOptions={(value, label) => setTipo(value)}
                                value={tipo}
                            />
                        </div>
                        <div className="col-3 mt-4">
                            <CustomInput
                                label="Fator Lactobacilos"
                                type="number"
                                placeholder="Digite o fator"
                                value={fator}
                                maxLength={16}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setFator(parseFloat(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={unidades}
                                title="Selecione a Unidade de Conversão"
                                filter="descricao"
                                label="Unidade de Conversão"
                                Select={(planoDeContaId) => AdicionarUnidadeConversao(planoDeContaId)}
                            />
                        </div>
                    </div>

                    {
                        data.unidadesConversao.map((item) => (
                            
                            <div key={item.id} className="row">
                                <div className="col-2">
                                    <CustomInput
                                        label="Sigla"
                                        type="text"
                                        value={item.sigla}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-4">
                                    <CustomInput
                                        label="Descrição"
                                        type="text"
                                        value={item.descricao}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-4">
                                    <CustomInput
                                        label="Fator de Conversão"
                                        type="number"
                                        value={item.fator}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            item.fator = parseFloat(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ))
                    }


                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="unidade" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Unidade adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
