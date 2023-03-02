import { useState, useRef, useEffect } from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container } from "./styles";

export let contentEditor = {};

export function EditorCustom() {

    const [content, setContent] = useState({ops : []} as any);
    const editorRef = useRef(null);

    contentEditor = content;

    useEffect(() => {
        contentEditor = content;
    },[content])

    useEffect(() => {
        if (editorRef.current) {
            const editor = new Quill(editorRef.current, {
                theme: 'snow'
            });
            editor.on('text-change', () => {
                return setContent(editor.getContents());
            });
        }

    }, []);

    return (
        <Container>
            <div ref={editorRef}></div>
        </Container>
    )
}