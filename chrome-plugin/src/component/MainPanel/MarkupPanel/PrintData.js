import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


const PrintTextForm = styled.pre`
    width: 300px;
    font-size: 10px;
    overflow-y: scroll;
    height: 600px;
    border: 1px solid grey;
    border-radius : 5px;
    padding : 10px;
`;

const PrintData = ({HTMLText, CSSText}) => {

    return (
        <div>
            <PrintTextForm>{HTMLText}</PrintTextForm>
        </div>
    );
}

export default PrintData;
