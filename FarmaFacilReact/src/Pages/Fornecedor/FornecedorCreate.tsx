import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import TabsPage from "../../Components/Tabs";

export function FornecedorCreate() {

  const navigate = useNavigate();
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [erroNomeFornecedor, setErroNomeFornecedor] = useState("");
  const [email,setEmail] = useState("");
  const [erroEmail,serErroEmail] = useState("");


  let arrayTab :any = [];
  let titles  = [];

  titles.push("Geral")
  titles.push("Complemento")

  arrayTab.unshift(

    <Container>
        <div className="row">
            <div className="col-4">
                <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Fornecedor"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
            <div className="col-4">
                <CustomInput
                label="Nome Fantasia"
                type="text"
                placeholder="Digite o Nome Fantasia"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-4">
                <CustomInput
                label="CPF/CNPJ"
                type="text"
                placeholder="Digite o CPF ou CNPJ"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
            <div className="col-4">
                <CustomInput
                label="Inscrição estadual"
                type="text"
                placeholder="Digite a Inscrição estadual"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
        </div>

        <div className="row">
            <div className="col-2">
                <CustomInput
                label="CEP"
                type="text"
                placeholder="Digite o CEP"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
            <div className="col-4">
                <CustomInput
                label="RUA"
                type="text"
                placeholder="Digite a Rua"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
            <div className="col-2">
                <CustomInput
                label="Número"
                type="text"
                placeholder="Digite o número"
                value={nomeFornecedor}
                maxLength={50}
                erro={erroNomeFornecedor}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeFornecedor(e.target.value)
                }
                required={true}
                />
            </div>
        </div>
    </Container>

  );
  arrayTab.push(

    <Container>
        <div className="row">
            <div className="col-12">
                <CustomInput
                label="Email"
                type="text"
                placeholder="Digite o E-mail do fornecedor"
                value={email}
                maxLength={50}
                erro={erroEmail}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                required={true}
                />
            </div>
        </div>
    </Container>

  );

  const data = {
    id: 0, //id 0 é default
    nomeFornecedor: nomeFornecedor,
  };

  async function submit() {

    setErroNomeFornecedor("")

    if(!nomeFornecedor.trim()){
        setErroNomeFornecedor("Campo nome é obrigatório !")
      return;
    }

    const resp = await postFormAll("AdicionarFornecedor", data);

    if(resp.status == 200){
      navigate("/bairro")
    }else{
        setErroNomeFornecedor(resp.request.response)
      return;
    }
  }

  return (
    <>
      <HeaderMainContent title="ADICIONAR Fornecedor" IncludeButton={false} />
      <div className="form-group">

        <TabsPage Childrens={arrayTab} TabsQtd={2} titles={titles}/>
        
        <div className="row">
            <div className="col-6">
            <ButtonConfirm onCLick={submit}/>
            <ButtonCancel to="fornecedor" />
            </div>
        </div>
      </div>
    </>
  );
}
