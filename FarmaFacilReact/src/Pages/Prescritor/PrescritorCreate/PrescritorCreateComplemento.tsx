import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState, ChangeEvent, useEffect } from 'react'
import { getAll } from "../../../Services/Api";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";

export let PrescritorComplemento = {
    email: "",
    aniversario: "",
    enderecoRes: "",
    numeroRes: "",
    cepRes: "",
    dddRes: "",
    telefoneRes: "",
    proximidade: "",
    visitadorId: undefined,
    observacaoVenda: "",
    cedh: true,
    registroMapa: "",
}

export function PrescritorCreateComplemento() {

    const [email, setEmail] = useState("");
    const [aniversario, setAniversario] = useState("");
    const [enderecoRes, setEnderecoRes] = useState("");
    const [numeroRes, setNumeroRes] = useState("");
    const [cepRes, setCepRes] = useState("");
    const [dddRes, setDddRes] = useState("");
    const [telefoneRes, setTelefoneRes] = useState("");
    const [proximidade, setProximidade] = useState("");
    const [visitadorId, setVisitadorId] = useState()
    const [observacaoVenda, setObservacaoVenda] = useState("");
    const [cedh, setCedh] = useState(false);
    const [registroMapa, setRegistroMapa] = useState("");

    const [visitadores, setVisitadores] = useState([]);

    useEffect(() => {
        const loadDataVisitador = async () => {
            const response = await getAll("ListaVisitador");
            setVisitadores(response.data);
        }

        loadDataVisitador()
    }, []);

    return (
        <Container>

            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="E-mail"
                        type="text"
                        placeholder="Digite o e-mail"
                        value={email}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        placeholder="Digite o CEP"
                        value={cepRes}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCepRes(e.target.value)
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        placeholder="Digite o número"
                        value={numeroRes}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNumeroRes(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        placeholder="Digite o endereço"
                        value={enderecoRes}
                        maxLength={100}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEnderecoRes(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Aniversário (dia/mês)"
                        type="text"
                        placeholder="Digite o aniversário"
                        value={aniversario}
                        maxLength={5}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAniversario(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        placeholder="(99)"
                        value={dddRes}
                        maxLength={2}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDddRes(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        placeholder="9999-9999"
                        value={telefoneRes}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTelefoneRes(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Proximidade"
                        type="text"
                        placeholder="Digite a proximidade"
                        value={proximidade}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setProximidade(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomDropDown
                        data={visitadores}
                        title="Selecione o Visitador"
                        filter="nome" label="Visitador"
                        Select={(visitadorId) => setVisitadorId(visitadorId)} />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Observação de Venda"
                        type="text"
                        placeholder="Digite a observação"
                        value={observacaoVenda}
                        maxLength={150}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setObservacaoVenda(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Registro MAPA"
                        type="text"
                        placeholder="Digite o registro"
                        value={registroMapa}
                        maxLength={150}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRegistroMapa(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-3">
                    <CheckboxCustom
                        options={["CEDH"]}
                        check={cedh}
                        onClickOptions={(e) => setCedh(e.target.checked)}
                    />
                </div>
            </div>

        </Container>
    )
}