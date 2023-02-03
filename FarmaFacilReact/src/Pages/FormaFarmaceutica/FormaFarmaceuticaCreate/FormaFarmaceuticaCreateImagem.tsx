import { Container } from "../styles";
import { useState, ChangeEvent } from "react"
import { IFormaFarmaceuticaImagem } from "../IFormaFarmaceuticaImagem";
import { uploadDeImg } from "../../../helper/uploadeDeImg";

export let FormaFarmaceuticaImagemModel: IFormaFarmaceuticaImagem = {
    imagem: "",
    imagemByte: null
}

export function FormaFarmaceuticaCreateImagem() {

    const [imagemModel, setImagemModel] = useState("");
    const [imagem, setImagem] = useState("");
    
    FormaFarmaceuticaImagemModel.imagem = imagem;

    function openFile(e: ChangeEvent<HTMLInputElement>) {
        let teste = ""
        var result = uploadDeImg(e,teste);
        console.log(teste)
        return;
        // var index = result.indexOf(',') + 1;
        // var base64 = result.slice(index);
        // setImagemModel(result)
        // setImagem(base64)

        // e.preventDefault();

        // if (e.target.files) {

        //     var input = e.target.files[0];
        //     var reader = new FileReader();

        //     reader.onload = function () {

        //         var dataURL = reader.result;

        //         if (typeof (dataURL) === "string") {
        //             var index = dataURL.indexOf(',') + 1;
        //             var base64 = dataURL.slice(index);
        //             setImagemModel(dataURL)
        //             setImagem(base64)
        //         }
        //     };

        //     reader.readAsDataURL(input);
        // }
    }
    return (
        <>
            <Container>
                <div className="row mt-3">
                    <div className="col-auto">
                        <span className="span">Selecione a Imagem</span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="arquivo" className="imgLabel">Clique Aqui!</label>
                        <input
                            style={{ display: "none" }}
                            type='file'
                            className="imgInput"
                            accept='image/*'
                            id="arquivo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => openFile(e)}
                        />
                    </div>
                </div>
                <div className="row container-img border mt-2 mb-2">
                    <img src={imagemModel} />
                </div>
            </Container>
        </>
    )

}