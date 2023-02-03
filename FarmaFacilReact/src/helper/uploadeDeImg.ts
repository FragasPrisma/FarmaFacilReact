import { ChangeEvent } from "react"

export async  function uploadDeImg(e: ChangeEvent<HTMLInputElement>, teste : string | ArrayBuffer | null ){
    e.preventDefault();

        let dataURL : string | ArrayBuffer | null;
        dataURL = ""

        if (e.target.files) {

            var input = e.target.files[0];
            var reader = new FileReader();

            reader.onload = () => {
                teste = reader.result;
            };

            reader.readAsDataURL(input);
        }

        return dataURL;
}