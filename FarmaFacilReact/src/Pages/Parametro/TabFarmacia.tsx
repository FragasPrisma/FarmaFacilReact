import { ChangeEvent, useState } from "react";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { Container } from "./styles";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export const TabFarmacia = () => {
  const [razaoSocial, setRazaoSocial] = useState(String);
  const [nomeFantasia, setNomeFantasia] = useState(String);
  const [modalidade, setModalidade] = useState(String);
  const [cnpj, setCnpj] = useState(String);
  const [inscricaoEstadual, setInscricaoEstadual] = useState(String);
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState(String);
  const [endereco, setEndereco] = useState(String);
  const [numero, setNumero] = useState(String);
  const [cep, setCep] = useState(String);
  const [complemento, setComplemento] = useState(String);
  const [bairro, setBairro] = useState(String);
  const [cidade, setCidade] = useState(String);
  const [estado, setEstado] = useState(String);
  const [ddd, setDdd] = useState(String);
  const [telefone, setTelefone] = useState(String);
  const [fax, setFax] = useState(String);
  const [contatoWhats, setContatoWhats] = useState(String);
  const [farmaceutico, setFarmaceutico] = useState(String);
  const [cpfSNGPC, setCpfSNGPC] = useState(String);
  const [usuarioSNGPC, setUsuarioSNGPC] = useState(String);
  const [senhaSNGPC, setSenhaSNGPC] = useState(String);
  const [email, setEmail] = useState(String);
  const [crf, setCrf] = useState(String);
  const [licencaFunc, setLicencaFunc] = useState(String);
  const [licencaMapa, setLicencaMapa] = useState(String);
  const [autoridadeSanitaria, setAutoridadeSanitaria] = useState(String);
  const [fornecedorInterno, setFornecedorInterno] = useState(String);


  return (
    <Container>
      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Razão social"
            type="string"
            value={razaoSocial}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRazaoSocial(e.target.value)
            }
          />
        </div>
        <div className="col-4">
          <CustomInput
            label="Nome Fantasia"
            value={nomeFantasia}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNomeFantasia(e.target.value)
            }
            type="string"
            required={false}
          />
        </div>

        <div className="col-2">
          {/* <RadioCustom
            check={modalidade}
            onClickOptions={(e: ChangeEvent<HTMLInputElement>) =>
              setModalidade(e.target.value)
            }
            options={[
              "Simples nacional",
              "Simples nac. SubLimite",
              "Regime Normal",
            ]}
          /> */}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CNPJ"
            type="string"
            required={false}
            value={cnpj}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCnpj(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Est."
            type="string"
            required={false}
            value={inscricaoEstadual}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInscricaoEstadual(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Mun."
            type="string"
            required={false}
            value={inscricaoMunicipal}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInscricaoMunicipal(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Endereço"
            type="string"
            required={false}
            value={endereco}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEndereco(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Numero"
            type="string"
            required={false}
            value={numero}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNumero(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="CEP"
            type="string"
            required={false}
            value={cep}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCep(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Complemento"
            type="string"
            required={false}
            value={complemento}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setComplemento(e.target.value)
            }
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Bairro"
            type="string"
            required={false}
            value={bairro}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBairro(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Cidade"
            type="string"
            required={false}
            value={cidade}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCidade(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Estado"
            type="string"
            required={false}
            value={estado}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstado(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="string"
            required={false}
            value={ddd}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDdd(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Telefone"
            type="string"
            required={false}
            value={telefone}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTelefone(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Fax"
            type="string"
            required={false}
            value={fax}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFax(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput
            label="E-Mail"
            type="string"
            required={false}
            value={email}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Contato Whats"
            type="string"
            required={false}
            value={contatoWhats}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContatoWhats(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput
            label="Farmacêutico(a)"
            type="string"
            required={false}
            value={farmaceutico}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFarmaceutico(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="CRF"
            type="string"
            required={false}
            value={crf}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCrf(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CPF Resp. SNGPC"
            type="string"
            required={false}
            value={cpfSNGPC}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCpfSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Usuário SNGPC"
            type="string"
            required={false}
            value={usuarioSNGPC}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsuarioSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Senha SNGPC"
            type="string"
            required={false}
            value={senhaSNGPC}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenhaSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Func"
            type="string"
            required={false}
            value={licencaFunc}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLicencaFunc(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <CustomInput
            label="Autoridade Sanitária"
            type="string"
            required={false}
            value={autoridadeSanitaria}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAutoridadeSanitaria(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Mapa"
            type="string"
            required={false}
            value={licencaMapa}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLicencaMapa(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Fornecedor Interno"
            type="string"
            required={false}
            value={fornecedorInterno}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFornecedorInterno(e.target.value)
            }
          />
        </div>
      </div>
    </Container>
  );
};
