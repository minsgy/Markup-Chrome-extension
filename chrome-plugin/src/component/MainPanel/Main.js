import React,{useState} from 'react';
import styled from 'styled-components';

import InputData from './MarkupPanel/InputData';
import PrintData from './MarkupPanel/PrintData';
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
`;



const Main = () => {

    const [HTMLText, SetHTMLText] = useState("");
    const [CSSText, SetCSSText] = useState("");
    const [isLoading, SetisLoading] = useState(false);

    const GetText = (HTML, CSS) => {
        SetHTMLText(HTML);
        SetCSSText(CSS);
        SetisLoading(true);
    }

    return (
        <>
        <InputContainer>
            { isLoading ? <PrintData HTMLText={HTMLText} CSSText={CSSText} /> : <InputData GetText={GetText}/>}
        </InputContainer>
        </>
    );
}

export default Main;
