import React, {useRef, useState} from 'react';
import styled from 'styled-components';

const FileBox = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 450px;
    justify-content: center;
    align-items: center;
`;

const FileContainer = styled.div`
    display: flex;
    width: 500px;
    height: 450px;
    justify-content: center;
    align-items: center;
`;

const Markup_File = styled.input`
    /* blind */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`;

const Markup_Label = styled.label`
   cursor: pointer;
`;

const CheckButton = styled.button`
`;

const InputData = (props) => {

    const HTMLRef = useRef(null);
    const CSSRef = useRef(null);

    const [HTMLText, SetHTMLText] = useState("");
    const [CSSText, SetCSSText] = useState("");

    // HTML FILE 읽기
    const handleChangeHTMLFile = (e) => {
        let reader = new FileReader();

        if (e.target.files[0]){
            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = () => {
                SetHTMLText(reader.result);
            }
        }
    }

    // CSS FILE 읽기
    const handleChangeCSSFile = (e) => {
        let reader = new FileReader();
        if (e.target.files[0]){
            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = () => {
                SetCSSText(reader.result);
            }
        }
    }
    
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(HTMLText !== "" || CSSText !== ""){
            alert("파일이 입력되지 않았습니다.");
            return;
        }
        props.GetText(HTMLText, CSSText);
    }

    return (
            <>
                <FileContainer>
                    <Markup_Label htmlFor="HTML_file">HTML 업로드</Markup_Label>
                    <Markup_Label htmlFor="CSS_file">CSS 업로드</Markup_Label>
                    <Markup_File ref={HTMLRef} onChange={handleChangeHTMLFile} type="file" accept="text/html" id="HTML_file" />
                    <Markup_File ref={CSSRef} onChange={handleChangeCSSFile} type="file" accept="text/css"  id="CSS_file" />
                </FileContainer>
                <CheckButton type="submit" onClick={handleSubmitFile}>체크하기</CheckButton>
           </>
    );
}

export default InputData;
