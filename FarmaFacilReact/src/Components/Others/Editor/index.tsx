export {}

// import { useState, useRef } from "react"
// import JoditEditor from "jodit-react";

// interface EditorProps {
//     OnChange?: (text: string) => void;
//     width?: number;
// }

// export function Editor({ OnChange, width }: EditorProps) {

//     const widthConfig = width ? width : 600;
//     const editor = useRef(null);
//     const [content, setContent] = useState('');
//     const config = {
//         width: widthConfig
//     }

//     const handleChange = (text: string) => {
//         setContent(text)
//         if (OnChange) {
//             OnChange(text)
//         }
//     }

//     return (
//         <JoditEditor
//             ref={editor}
//             value={content}
//             config={config}
//             onBlur={newContent => handleChange(newContent)}
//         />
//     );
// }