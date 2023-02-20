import { ChangeEvent, useState, useEffect } from "react";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "../../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../../Components/Others/GenericTable";
import { getAll } from "../../../Services/Api";
import { IPrescritorGeral } from "../../../Interfaces/Prescritor/IPrescritorGeral";
import { Container } from "../styles";

interface Data {
    PrescritorGeralModel: IPrescritorGeral;
    nomes: { nomeEstado: string, nomeCidade: string, nomeBairro: string }
}

export function PrescritorDetailsGeral({ PrescritorGeralModel, nomes }: Data) {

    const [especialidades, setEspecialidades] = useState([] as any[]);
    const [especialidadesSelecionadasView, setEspecialidadesSelecionadasView] = useState([] as any[]);

    useEffect(() => {

        const loadDataEspecialidade = async () => {
            const response = await getAll("ListaEspecialidade");
            setEspecialidades(response.data);
        }
        loadDataEspecialidade()
    }, []);

    useEffect(() => {

        if (especialidades) {

            const especialidadesSelecionadas = especialidades.filter(item =>
                PrescritorGeralModel.especialidadePrescritores.some(
                    especialidadePrescritor =>
                        especialidadePrescritor.especialidadeId === item.id
                )
            );

            const especialidadesSelecionadasView = especialidadesSelecionadas.map(
                item => ({ id: item.id, descricao: item.descricao })
            );

            setEspecialidadesSelecionadasView(especialidadesSelecionadasView);
        }

    }, [especialidades]);

    return (
        <Container>
            <div className="row">
                <div className="col-5">
                    <CustomInput
                        label="Nome"
                        type="text"
                        value={PrescritorGeralModel.nome}
                        readonly={true}
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="CPF/CNPJ"
                        type="text"
                        value={PrescritorGeralModel.cpfCnpj}
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <RadioCustom
                        name="tipoCr"
                        options={["CRM", "CRMV", "CRO", "Outro"]}
                        titleComponet="Tipo CR"
                        value={PrescritorGeralModel.tipoCr}
                        readonly={true}
                    />
                </div>
                {PrescritorGeralModel.tipoCr == 3 &&
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tipo CRM"
                            type="text"
                            value={PrescritorGeralModel.crmTipo}
                            readonly={true}
                            required={true}
                        />
                    </div>
                }
                <div className="col-2 mt-4">
                    <CustomInput
                        label="Estado do Médico"
                        type="text"
                        value={PrescritorGeralModel.crmEstado}
                        readonly={true}
                        required={true}
                    />
                </div>
                <div className="col-2 mt-4">
                    <CustomInput
                        label="Número do CRM"
                        type="text"
                        value={PrescritorGeralModel.crmNumero}
                        readonly={true}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        value={PrescritorGeralModel.cep}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        value={PrescritorGeralModel.endereco}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        value={PrescritorGeralModel.numero}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        value={PrescritorGeralModel.complemento}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Data de Nascimento"
                        type="text"
                        value={PrescritorGeralModel.data_Nascimento}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Estado"
                        type="text"
                        value={nomes.nomeEstado}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Cidade"
                        type="text"
                        value={nomes.nomeCidade}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Bairro"
                        type="text"
                        value={nomes.nomeBairro}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        value={PrescritorGeralModel.ddd}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        value={PrescritorGeralModel.telefone}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        value={PrescritorGeralModel.dddCelular}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Celular"
                        type="text"
                        value={PrescritorGeralModel.celular}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <RadioCustom
                        name="genero"
                        options={["Masculino", "Feminino"]}
                        titleComponet="Gênero"
                        readonly={true}
                        value={PrescritorGeralModel.genero}
                    />
                </div>
                <div className="col-3 mt-4">
                    <CheckboxCustom
                        options={["Ativo"]}
                        check={PrescritorGeralModel.ativo}
                        readOnly={true}
                    />
                </div>
            </div>

            <div className="mt-3">
                <FieldsetCustom legend="Especialidades do Prescritor" numberCols={8}>
                    <div className="row mt-3">
                        <div className="col-8">
                            <GenericTable
                                data={especialidadesSelecionadasView}
                                header={["id", "descricao"]}
                                deleteButton={false}
                            />
                        </div>
                    </div>
                </FieldsetCustom>
            </div>


        </Container>
    )
}