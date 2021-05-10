import React,{useState} from 'react';
import styled from 'styled-components';

import InputData from './MarkupPanel/InputData';
import PrintData from './MarkupPanel/PrintData';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


const Main = () => {

    const [HTMLText, SetHTMLText] = useState("");
    const [CSSText, SetCSSText] = useState("");
    
    const GetText = (HTML, CSS) => {
        SetHTMLText(HTML);
        SetCSSText(CSS);
    }



    return (
        <InputContainer>
            <InputData GetText={GetText}/>
            <PrintData />
        </InputContainer>
    );
}

export default Main;
