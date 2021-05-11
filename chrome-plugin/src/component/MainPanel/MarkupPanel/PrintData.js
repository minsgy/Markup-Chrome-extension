import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


const PrintContainer = styled.div`
    width: 550px;
    display: flex;
    justify-content: center;

`;

const PrintTextForm = styled.pre`
    width: 300px;
    font-size: 10px;
    overflow-y: scroll;
    height: 400px;
    border: 1px solid #e4e4e4;
    border-radius : 5px;
    padding : 10px;
`;

const PrintData = ({HTMLText, CSSText}) => {

    return (
        <PrintContainer>
            <PrintTextForm>{HTMLText}</PrintTextForm>
        </PrintContainer>
    );
}

export default PrintData;
