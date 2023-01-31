import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function CidadeCreate() {

    const [nome,setNome] = useState("");
    const [codigoIbge, setCodigoIbge] = useState(Number);
    const [codigoCfpsId,setCodigoCfpsId] = useState();
    const [codigoSiafi,setCodigoSiafi] = useState(Number);
    const [isLoading,setIsloading] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [erro, setErro] = useState("");
    const [errorRequest, setErrorRequest] = useState("");
    const [tributos,setTributos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDataTributo = async () => {
            const response = await getAll("ListaTributo");
            let TributoFilter = response.data;
            setTributos(TributoFilter.filter((x: { tipoTributo: number; }) => x.tipoTributo == 6));
        }

        loadDataTributo()
    }, []);

    const cidade = {
        Id: 0,
        Nome: nome,
        CodigoIbge: codigoIbge,
        CodigoCfpsId: codigoCfpsId,
        CodigoSiafi: codigoSiafi
    };


    async function submit() {

        setErro("")
        setIsloading(true);

        if (!nome.trim()) {
            setErro("Campo nome é obrigatório !")
            setIsloading(false);
            return;
        }

        const resp = await postFormAll("AdicionarCidade", cidade);

        if(resp.status == 200){
            setIsOpenSuccess(true);
            setTimeout(() => {
              navigate("/cidade");
            }, 2000)
          }else{
            setIsOpenFail(true);
            setIsloading(false);
            setTimeout(() => {
              setIsOpenFail(false);
              setErrorRequest(resp.request.response)
            }, 2000)
          }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR CIDADE" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome "
                                value={nome}
                                maxLength={50}
                                erro={erro}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNome(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Código IBGE"
                                type="number"
                                placeholder="Digite o código IBGE"
                                value={codigoIbge}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoIbge(parseInt(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Código SIAFI"
                                type="number"
                                placeholder="Digite o código SIAFI"
                                value={codigoIbge}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoSiafi(parseInt(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CustomDropDown data={tributos} title="Selecione o Código CFPS" filter="descricao" label="Código CFPS" Select={(cidadeId) => setCodigoCfpsId(cidadeId)}/>
                        </div>
                    </div>
                    
                </Container>

                {errorRequest && <p className="text-danger">{errorRequest}</p>}

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="cidade" />
                    </div>
                </div>

                <SuccessModal show={isOpenSuccess} textCustom="Cidade adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
