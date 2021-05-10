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

const InputData = () => {

    const HTMLRef = useRef(null);
    const CSSRef = useRef(null);

    const [HTMLText, SetHTMLText] = useState("");
    const [CSSText, SetCSSText] = useState("");

    // HTMLFILE 읽기
    const handleChangeFile = (e) => {
        let reader = new FileReader();

        if (e.target.files[0]){
            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = () => {
                console.log(reader.result);
            }
        }
    }
    

    return (
            <>
                <FileContainer>
                    <Markup_Label htmlFor="HTML_file">HTML 업로드</Markup_Label>
                    <Markup_Label htmlFor="CSS_file">CSS 업로드</Markup_Label>
                    <Markup_File ref={HTMLRef} onChange={handleChangeFile} type="file" accept="text/html" id="HTML_file" />
                    <Markup_File ref={CSSRef} onChange={handleChangeFile} type="file" accept="text/css"  id="CSS_file" />
                </FileContainer>
                <CheckButton type="submit">체크하기</CheckButton>
           </>
    );
}

export default InputData;
