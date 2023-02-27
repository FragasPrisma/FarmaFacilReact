import { NotePencil, PlusCircle, Trash } from 'phosphor-react';
import { useState, ChangeEvent, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Container } from './styles';

interface IData {
    img?: string | ArrayBuffer;
    onUpdate?: (value: string | ArrayBuffer | null) => void;
    onButton?: boolean
    text: string
    requerid?: boolean
    onDelete?:() => void
}

export function UploadImagem({ img, onUpdate, onButton = true, text, requerid , onDelete}: IData) {

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
        }else{
            DeleteImagem()
        }
    }, [img])

    function DeleteImagem(){
        setImagemModel("")
        setWidth(0)
        setHeight(0)
        if(onDelete){
            onDelete()
        }
    }

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
                <div className="row mt-3 container-btn">
                    <div className="col-auto div-span-banner">
                        <span className="span-banner">{text}</span>
                        {requerid &&
                            <span className='col-auto text-erro'>*</span>
                        }
                    </div>

                    {onButton &&


                        <div className="col-auto">
                            
                            <OverlayTrigger
                                key={1}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Incluir
                                    </Tooltip>
                                }
                            >
                                <Button variant=""><label htmlFor="arquivo" className="imgLabel"><PlusCircle size={22} color="#cf0209" /></label></Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                key={2}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Editar
                                    </Tooltip>
                                }
                            >
                                <Button variant=""><label htmlFor="arquivo" className="imgLabel"><NotePencil size={20} color="#cf0209" /></label></Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                key={3}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Excluir
                                    </Tooltip>
                                }
                            >
                                <Button variant="" onClick={DeleteImagem}><Trash size={20} color="#cf0209" /></Button>
                            </OverlayTrigger>
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

