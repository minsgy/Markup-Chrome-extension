import React, {useEffect, useState} from 'react';
import {calculate} from 'specificity';
import styled from 'styled-components';


const PrintContainer = styled.div`
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PrintDescriptionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

const PrintDescription = styled.p`
    font-size: 10px;
`;

const PrintTextContainer = styled.div`  
    width: 100%;
    display: flex;
    justify-content: center;
`;


const PrintTextForm = styled.pre`
    width: 100%;
    font-size: 10px;
    overflow-y: scroll;
    height: 300px;
    padding : 10px;
    border-bottom: 1px solid #e4e4e4;
    :nth-child(1){
        border-right: 1px solid #e4e4e4;
    }
`;

const ReturnBtnContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ReturnBtn = styled.button`
    border: 1px solid #1b56cf;
    background-color: #1b56cf;
    color: white;
    border-radius: 30px;
    width: 100px;
    font-size: 13px;
    height: 30px;
   :hover{
       transition: 0.3s;
       background-color: white;
       color: black;
   }
`;

const PrintData = ({HTMLText, CSSText}) => {

    const [SelectorArray, SetSelectorArray] = useState([]);
    const [SelectorScore, SetSelectorScore] = useState([]);

    // 선택자 Filter
    const handleSelector = () => {
        let TempArray = []
        let ScoreArray = []
        // 문자열 중, } 값 전부 {로 변경 - split 사용하려고
        // 줄바꿈 제거
        // 공백 제거
        let SplitText = CSSText.replace(/}/gi, "{");
        let temp1 = SplitText.replace(/\n/gi, "");
        let TextSplit = temp1.split('{');
        // 홀수 번 배열값을 빼서 저장. 
        for(let i=0;i<TextSplit.length;i=i+2){ 
            if(TextSplit[i] !== ""){
                TempArray = ([...TempArray, TextSplit[i]]);
            }
        }
        SetSelectorArray(TempArray);
        console.log(SelectorArray)
        SelectorArray.map(async item => {
            let result = await calculate(item)
            ScoreArray.push(result[0].specificityArray);
            // console.log(result[0].specificityArray);
        })
        ScoreArray.sort((a, b)=>{return a[0][1] - b[0][1]});
        SetSelectorScore(ScoreArray);
        
        console.log(SelectorScore);
        // console.log(ScoreArray);
    }


    return (
        <>
        <PrintContainer>
            <PrintTextContainer>
                <PrintTextForm>{HTMLText}</PrintTextForm>
                <PrintTextForm>{CSSText}</PrintTextForm>
            </PrintTextContainer>
        </PrintContainer>
        <ReturnBtnContainer>
            <ReturnBtn onClick={handleSelector}>뒤로 가기</ReturnBtn>
        </ReturnBtnContainer>
        </>
    );
}

export default PrintData;
