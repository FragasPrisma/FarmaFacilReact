import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState } from "react";
import { postFormAll } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { PrescritorCreateGeral } from "./PrescritorCreateGeral";
import { PrescritorCreateComplemento } from "./PrescritorCreateComplemento";
import { PrescritorGeral } from "../PrescritorGeral";
import { prescritor } from "../Prescritor";
import { PrescritorComplemento } from "../PrescritorComplemento";

export function PrescritorCreate() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error,setErros] = useState({erro: true, index: 0, erroNome:""})

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.unshift(
        <PrescritorCreateGeral
            error={error}
        />
    );
    arrayTab.push(
        <PrescritorCreateComplemento/>
    );

    async function submit() {

        if (!PrescritorGeral.data_Nascimento) { PrescritorGeral.data_Nascimento = null }

        if(!ValidString(PrescritorGeral.nome,1)
        || (PrescritorGeral.tipoCr == 3 && !ValidString(PrescritorGeral.crmTipo,3) 
        || !ValidString(PrescritorGeral.crmEstado,4) 
        || !ValidString(PrescritorGeral.crmNumero,5))
        ){
            setIsLoading(false);
            return;
        }

        if(!ValidNumber(PrescritorGeral.tipoCr,1)){
            setIsLoading(false);
            return;
        }

        prescritor.bairroId= PrescritorGeral.bairroId,
        prescritor.cidadeId= PrescritorGeral.cidadeId,
        prescritor.estadoId= PrescritorGeral.estadoId,
        prescritor.nome= PrescritorGeral.nome,
        prescritor.cep= PrescritorGeral.cep,
        prescritor.data_Nascimento= PrescritorGeral.data_Nascimento,
        prescritor.endereco= PrescritorGeral.endereco,
        prescritor.numero= PrescritorGeral.numero,
        prescritor.complemento= PrescritorGeral.complemento,
        prescritor.cpfCnpj= PrescritorGeral.cpfCnpj,
        prescritor.ddd= PrescritorGeral.ddd,
        prescritor.dddCelular= PrescritorGeral.dddCelular,
        prescritor.telefone= PrescritorGeral.telefone,
        prescritor.celular= PrescritorGeral.celular,
        prescritor.ativo= PrescritorGeral.ativo,
        prescritor.genero= PrescritorGeral.genero,
        prescritor.tipoCr= PrescritorGeral.tipoCr,
        prescritor.crmNumero= PrescritorGeral.crmNumero,
        prescritor.crmEstado= PrescritorGeral.crmEstado,
        prescritor.crmTipo= PrescritorGeral.crmTipo,
        prescritor.email= PrescritorComplemento.email,
        prescritor.secretaria= PrescritorComplemento.secretaria,
        prescritor.nomeRotulo= PrescritorComplemento.nomeRotulo,
        prescritor.aniversario= PrescritorComplemento.aniversario,
        prescritor.enderecoRes= PrescritorComplemento.enderecoRes,
        prescritor.numeroRes= PrescritorComplemento.numeroRes,
        prescritor.cepRes= PrescritorComplemento.cepRes,
        prescritor.dddRes= PrescritorComplemento.dddRes,
        prescritor.telefoneRes= PrescritorComplemento.telefoneRes,
        prescritor.proximidade= PrescritorComplemento.proximidade,
        prescritor.visitadorId= PrescritorComplemento.visitadorId,
        prescritor.observacaoVenda= PrescritorComplemento.observacaoVenda,
        prescritor.cedh= PrescritorComplemento.cedh,
        prescritor.registroMapa= PrescritorComplemento.registroMapa,
        prescritor.especialidadePrescritores= PrescritorGeral.especialidadePrescritores

        const resp = await postFormAll("AdicionarPrescritor", prescritor);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/prescritor");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function ValidString(texto : string, index : number){
        if(!texto.trim()){
            setErros({erro:true,index:index,erroNome:"Campo obrigatório !",})
            return false;
        }else{
            return true;
        }
    }

    function ValidNumber(numero : number, index : number){
        if(numero < 0){
            setErros({erro:true,index:index,erroNome:"Campo Tipo CR obrigatório !",})
            return false;
        }else{
            return true;
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR PRESCRITOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="prescritor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Prescritor adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}