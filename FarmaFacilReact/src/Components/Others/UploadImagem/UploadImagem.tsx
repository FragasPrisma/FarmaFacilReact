import { useState, ChangeEvent, useEffect } from 'react';
import { Container } from './styles';

interface IData {
    img?: string | ArrayBuffer;
    onUpdate?: (value: string | ArrayBuffer | null) => void;
    onButton?: boolean
    text: string
}

export function UploadImagem({ img, onUpdate, onButton = true, text }: IData) {

    const [imagemModel, setImagemModel] = useState(img);

    const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault();

        if (event.target.files) {

            const input = event.target.files[0];
            const reader = new FileReader();

            console.log(input)

            reader.onload = () => {
                if (typeof (reader.result) == "string") {
                    var index = reader.result.indexOf(',') + 1;
                    
                    var base64 = reader.result.slice(index);
                    setImagemModel(reader.result)

                    if (onUpdate) {
                        onUpdate(base64);
                    }
                }
            };

            var teste = reader.readAsDataURL(input);
            console.log(teste)
        }
    }

    return (
        <>
            <Container>
                <div className="row mt-3">
                    <div className="col-auto">
                        <span className="span">{text}</span>
                    </div>
                    {onButton &&


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
                    }
                </div>
                <div className="row container-img border mt-2 mb-2">
                    <img src={typeof imagemModel == "string" ? imagemModel : ""}/>
                </div>
            </Container>
        </>
    )

}

