import React from 'react';
import styled from 'styled-components';

import InputData from './MarkupPanel/InputData';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


const Main = () => {
    return (
        <InputContainer>
            <InputData />
        </InputContainer>
    );
}

export default Main;
