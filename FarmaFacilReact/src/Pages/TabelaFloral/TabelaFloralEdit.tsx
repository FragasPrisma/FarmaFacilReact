import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { ITabelaFloralVolume , ITabelaFloral } from "./ITabelaFloral";

export function TabelaFloralEdit() {

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTabelaFloralPorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setVolume(response.data.volume);
                if (response.data.tabelasFlorais) {
                    setTabelaFlorais([...response.data.tabelasFlorais, ...tabelasFlorais])
                }
            }
        }

        Init()
    }, [])

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [idTabelaFloral, setId] = useState(0)
    const [volume, setVolume] = useState(0);
    const [tabelasFlorais, setTabelaFlorais] = useState([{ id: 0, quantidadeInicial: 0, quantidadeFinal: 0, valorVenda: 0, VolumeTabelaFloralId: 0 }] as ITabelaFloral[])
    const [erroVolume, setErroVolume] = useState("");
    const [erroQtds, setErroQtds] = useState("");

    const [tabelaFloralVolumes, setTabelaFloralVolumes] = useState([] as ITabelaFloralVolume[])
    const [tabelasFloraisExcluir, setTabelasFloraisExcluir] = useState([] as ITabelaFloral[])

    useEffect(() => {

        async function Init() {
            const response = await getAll("ListaVolumeTabelaFloral");
            if (response.status == 200) {
                setTabelaFloralVolumes(response.data);
            }
        }
        Init()
    }, [])


    let data: ITabelaFloralVolume = {
        id: idTabelaFloral,
        volume: volume,
        tabelasFlorais: tabelasFlorais.filter(x => x.quantidadeFinal > 0 && x.quantidadeInicial > 0 && x.valorVenda > 0)
    }

    async function submit() {

        setErroVolume("");
        setIsLoading(true);

        if (volume < 0 || erroVolume) {
            setErroVolume("Volume inválido !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarVolumeTabelaFloral", data);

        if (resp.status == 200) {

            if (tabelasFloraisExcluir.length > 0) {
                const response = await postFormAll("ExcluirListaTabelaFloral", tabelasFloraisExcluir)
            }

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/tabelafloral");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function AdicionarQtdInicial(index: number, qtdInicial: number) {
        tabelasFlorais[index].quantidadeInicial = qtdInicial;
        setTabelaFlorais([...tabelasFlorais])
    }

    function AdicionarQtdFinal(index: number, qtdFinal: number) {
        tabelasFlorais[index].quantidadeFinal = qtdFinal;
        setTabelaFlorais([...tabelasFlorais])
    }
    function AdicionarValorDeVenda(index: number, valorDeVenda: number) {

        if (tabelasFlorais[index].quantidadeInicial > tabelasFlorais[index].quantidadeFinal) {
            setErroQtds("Quantidade Inicial não pode ser maior que Quantidade Final !");
            return;
        }
        if (tabelasFlorais[index].quantidadeInicial == 0 || tabelasFlorais[index].quantidadeFinal == 0) {
            setErroQtds("Quantidade Inicial ou Quantidade Final inválidos !");
            return;
        }

        if (tabelasFlorais[index].quantidadeInicial == 0 || tabelasFlorais[index].quantidadeFinal == 0) {
            return;
        }

        tabelasFlorais[index].valorVenda = valorDeVenda;
        setTabelaFlorais([...tabelasFlorais])

        const tabelasFilter = tabelasFlorais.filter(x => x.quantidadeFinal == 0 || x.quantidadeInicial == 0 || x.valorVenda == 0)

        if (tabelasFilter.length > 0) return;

        tabelasFlorais.push({ id: 0, quantidadeInicial: 0, quantidadeFinal: 0, valorVenda: 0, VolumeTabelaFloralId: 0 })
        setTabelaFlorais([...tabelasFlorais])
    }

    function ValidVolume(volume: number) {

        setVolume(volume)

        const filter = tabelaFloralVolumes.filter(x => x.volume == volume && x.id != idTabelaFloral)

        if (filter.length > 0) {
            setErroVolume("Volume já cadastrado !")
        } else {
            setErroVolume("")
        }
    }
    function ExcluirTabelaFloral(index: number, item: ITabelaFloral) {

        tabelasFlorais.splice(index, 1);
        if(item.id > 0){ tabelasFloraisExcluir.push(item)}

        if (tabelasFlorais.length == 0) {
            tabelasFlorais.push({ id: 0, quantidadeFinal: 0, quantidadeInicial: 0, valorVenda: 0, VolumeTabelaFloralId: 0 });
        }
        setTabelasFloraisExcluir([...tabelasFloraisExcluir])
        setTabelaFlorais([...tabelasFlorais]);
    }

    return (
        <>
            <HeaderMainContent title="EDITAR TABELA FLORAL" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idTabelaFloral > 0 &&
                    <Container>
                        <div className="row mb-4">
                            <div className="col-3">
                                <CustomInput
                                    label="Volume"
                                    type="number"
                                    placeholder="Digite o volume"
                                    value={volume}
                                    erro={erroVolume}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        ValidVolume(parseInt(e.target.value))
                                    }
                                    required={true}
                                />
                            </div>
                        </div>

                        <FieldsetCustom legend="Intervalo de Gotas" numberCols={8}>
                            {tabelasFlorais.map((item, index) => (
                                <div key={item.id} className="row">

                                    <div className="row">
                                        <div className="col-3">
                                            <CustomInput
                                                label="Quantidade Inicial"
                                                type="number"
                                                placeholder="Digite a qtd inicial"
                                                value={item.quantidadeInicial}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    AdicionarQtdInicial(index, parseInt(e.target.value))
                                                }
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <CustomInput
                                                label="Quantidade Final"
                                                type="number"
                                                placeholder="Digite a qtd final"
                                                value={item.quantidadeFinal}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    AdicionarQtdFinal(index, parseInt(e.target.value))
                                                }
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <CustomInput
                                                label="Valor de Venda"
                                                type="number"
                                                placeholder="Digite o valor de venda"
                                                value={item.valorVenda}
                                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    AdicionarValorDeVenda(index, parseFloat(e.target.value))
                                                }
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-2 mt-3">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => ExcluirTabelaFloral(index, item)}
                                            >Excluir</button>
                                        </div>
                                    </div>
                                    <p className="text-danger">{erroQtds}</p>
                                </div>
                            ))

                            }

                        </FieldsetCustom>

                        <div className="row">
                            <div className="col-6">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="tabelafloral" />
                            </div>
                        </div>
                    </Container>

                }
                <SuccessModal show={isOpenSuccess} textCustom="Tabela Floral editada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
