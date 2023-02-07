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
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function CategoriaCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [categoriaPaiId, setCategoriaPaiId] = useState();
    const [categoriaAtivo, setCategoriaAtivo] = useState(false);
    const [erroNome, setErroNome] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await getAll("ListaCategoria");
            setCategorias(response.data);
        }

        loadData()
    }, []);

    const data = {
        id: 0, //id 0 é default
        nome: nome.trim(),
        categoriaPaiId: categoriaPaiId,
        categoriaAtivo: categoriaAtivo,
        //Propriedades não estão sendo utilizadas no momento
        categoriaMagentoId: null,
        integrados: false,
        excluidos: false,
        alteradoPais: false
    };

    async function submit() {

        setErroNome("");
        setIsLoading(true);

        if (!nome.trim()) {
            setIsOpenFail(true);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome("Campo nome é obrigatório !")
            }, 2000)
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarCategoria", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/categoria");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR CATEGORIA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome"
                                value={nome}
                                maxLength={50}
                                erro={erroNome}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNome(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={categorias}
                                title="Selecione a Categoria Pai"
                                filter="nome"
                                label="Categoria Pai"
                                Select={(categoriaPaiId) => setCategoriaPaiId(categoriaPaiId)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CheckboxCustom options={[
                                "Categoria Ativa"
                            ]}
                                check={categoriaAtivo}
                                onClickOptions={(e) => setCategoriaAtivo(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="categoria" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Categoria adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
