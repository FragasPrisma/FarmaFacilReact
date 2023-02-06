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
    const [widthImg, setWidth] = useState(0);
    const [heightImg, setHeight] = useState(0);

    useEffect(() => {
        if (img) {
            const image = new Image();
            image.src = img?.toString();

            image.onload = () => {
                setWidth(image.width)
                setHeight(image.height)
            };
        }
    }, [])



    const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault();

        if (event.target.files) {

            const input = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof (reader.result) == "string") {
                    var index = reader.result.indexOf(',') + 1;

                    var base64 = reader.result.slice(index);
                    setImagemModel(reader.result)

                    const image = new Image();
                    image.src = reader.result;

                    image.onload = () => {
                        setWidth(image.width)
                        setHeight(image.height)
                    };

                    if (onUpdate) {
                        onUpdate(base64);
                    }
                }
            };
            reader.readAsDataURL(input);

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

                <div style={{ padding: ".3rem" }}>
                    <img src={typeof imagemModel == "string" ? imagemModel : ""} style={{
                        width: widthImg,
                        height: heightImg,
                        maxWidth: "450px",
                        maxHeight: "450px",
                        border: "solid .5px",
                        borderRadius: "5px"
                    }}

                    />
                </div>
            </Container>
        </>
    )

}

