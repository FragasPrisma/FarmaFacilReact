import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { MaskCpf, MaskCnpj, MaskIe, MaskCep, MaskTelefone } from "../../../Mask/Mask";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";

interface IData {
    fornecedorModel: IFornecedor,
    nomeEstado: string,
    nomeCidade: string,
    nomeBairro: string
}

export function FornecedorDetailsGeral({ fornecedorModel, nomeBairro, nomeCidade, nomeEstado }: IData) {

    return (
        <Container>
            <div className="row">
                <div className="col-5">
                    <CustomInput
                        label="Nome"
                        type="text"
                        value={fornecedorModel.nomeFornecedor}
                        readonly={true}
                        required={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome Fantasia"
                        type="text"
                        value={fornecedorModel.nomeFantasia}
                        readonly={true}
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <CustomInput
                        label="CPF"
                        type="text"
                        value={MaskCpf(fornecedorModel.cpf)}
                        readonly={true}
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="CNPJ"
                        type="text"
                        value={MaskCnpj(fornecedorModel.cnpj)}
                        readonly={true}
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Inscrição estadual"
                        type="text"
                        value={MaskIe(fornecedorModel.inscricaoEstadual)}
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
                        value={fornecedorModel.cep ? MaskCep(fornecedorModel.cep) : ""}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        value={fornecedorModel.endereco}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Número"
                        type="text"
                        value={fornecedorModel.numeroEndereco}
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
                        value={nomeEstado}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Cidade"
                        type="text"
                        value={nomeCidade}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Bairro"
                        type="text"
                        value={nomeBairro}
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
                        value={fornecedorModel.ddd}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        value={fornecedorModel.telefone}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        value={fornecedorModel.dddCelular}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Celular"
                        type="text"
                        value={fornecedorModel.celular}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        value={fornecedorModel.complemento}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="E-mail"
                        type="text"
                        value={fornecedorModel.email}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Home-Page"
                        type="text"
                        value={fornecedorModel.homePage}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Contato"
                        type="text"
                        value={fornecedorModel.contato}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Telefone Contato"
                        type="text"
                        value={fornecedorModel.telefoneContato}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <RadioCustom
                        options={["Contribuinte do ICMS", "Contribui isento de inscrição", "Não contribuinte"]}
                        name="contribuinte"
                        value={fornecedorModel.contribuinte ? fornecedorModel.contribuinte : -1}
                        readonly={true}
                    />
                </div>
            </div>

        </Container>
    )
}