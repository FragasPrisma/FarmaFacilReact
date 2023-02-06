import { UploadImagem } from "../../../Components/Others/UploadImagem/UploadImagem";
import { IFormaFarmaceuticaImagem } from "../IFormaFarmaceuticaImagem";
import { useEffect, useState } from "react";
import { IFormaFarmaceutica } from "../IFormaFarmaceutica";

export let FormaFarmaceuticaImagemModel: IFormaFarmaceuticaImagem = {
    imagem: "",
    imagemByte: null
}

interface IData {
    model: IFormaFarmaceutica;
}

export function FormaFarmaceuticaDetailsImagem({ model }: IData) {

    const [imgModel, setImgModel] = useState<string | ArrayBuffer | null>("data:image/png;base64," + model.imagem);

    useEffect(() => {
        FormaFarmaceuticaImagemModel.imagem = imgModel;
    }, [imgModel]);

    const updateImgModel = (value: string | ArrayBuffer | null) => {
        setImgModel(value);
    };

    return (
        <UploadImagem onUpdate={updateImgModel} img={imgModel ? imgModel : ""} onButton={false} text="Imagem da Forma Farmacêutica"/>
    )

}
