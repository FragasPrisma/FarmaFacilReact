import { UploadImagem } from "../../../Components/Others/UploadImagem/UploadImagem";
import { IFormaFarmaceuticaImagem } from "../IFormaFarmaceuticaImagem";
import { useEffect , useState} from "react";

export let FormaFarmaceuticaImagemModel: IFormaFarmaceuticaImagem = {
    imagem: "",
    imagemByte: null
}

export function FormaFarmaceuticaCreateImagem() {
    
    const [imgModel, setImgModel] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        FormaFarmaceuticaImagemModel.imagem = imgModel;
    }, [imgModel]);

    const updateImgModel = (value: string | ArrayBuffer | null) => {
        setImgModel(value);
    };

    return (
        <UploadImagem onUpdate={updateImgModel} text="Selecione a Imagem"/>
    )

}
