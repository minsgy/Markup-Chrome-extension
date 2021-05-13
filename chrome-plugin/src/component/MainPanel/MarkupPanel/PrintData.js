import React, {useEffect, useState} from 'react';
import {calculate, compare} from 'specificity';
import styled from 'styled-components';


const PrintContainer = styled.div`
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PrintDescriptionContainer = styled.div`
    width: 550px;
    margin-top: 10px;
    /* height: 100px; */
    display: flex;
`;

const PrintDescription = styled.div`
    font-size: 10px;
    flex:1;
    flex-basis: 50%;
    text-align: center;
    h4{
        font-size: 15px;
    }
`;

const CasecadingContainer = styled.div`
    display: flex;
    width: 100%;
`;

const CASECADING_LIST = styled.ul`
    margin-top: 10px;
    margin-right: 5px;
    flex:1;
    flex-basis: 33%;
    text-align: center;
    h4{
        font-size: 10px;
        text-align: center;
        margin-bottom: 5px;
        color: #1b56cf;
        display:inline-block;
        border-bottom: 1px solid #e4e4e4;
    }
    li{
        margin-bottom: 5px;
    }
`;

const Unused_List = styled.ul`
    margin-top: 10px;
    text-align: left;
    li{
        margin-bottom: 5px;
        strong{
            display: inline-block;
            margin-right: 5px;
            font-size: 12px;
            color: #1b56cf;
        }
    }
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
    border-top: 1px solid #e4e4e4;
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

    const [IDSelector, SetIDSelector] = useState([]);
    const [ClassSelector, SetClassSelector] = useState([]);
    const [DefaultSelector, SetDefaultSelector] = useState([]);

  
    const [HTML, SetHTML] = useState("");
    const [CSS, SetCSS] = useState("");

    // 선택자 Filter
    const handleSelector = () => {
        let TempArray = []
        let ScoreArray = []
        let ID = [];
        let Class = [];
        let Default = [];

        // HTML Filter
        let RemarkSplit_HTML = HTMLText.replace(/<!--[^>](.*?)-->/g,"");
        SetHTML(RemarkSplit_HTML);

        // CSS Filter
        // CSS 주석제거 완료
        // 문자열 중, } 값 전부 {로 변경 - split 사용하려고
        // 줄바꿈 제거
        // 공백 제거
        let RemarkSplit_CSS = CSSText.replace(/(\/\*)[^(\*\/)]*(\*\/)/g, "");
        SetCSS(RemarkSplit_CSS); // 주석제거 CSS
        let SplitText = RemarkSplit_CSS.replace(/}/gi, "{");
        let temp1 = SplitText.replace(/\n/gi, "");
        let TextSplit = temp1.split('{');
        // 홀수 번 배열값을 빼서 저장. 
        for(let i=0;i<TextSplit.length;i=i+2){ 
            if(TextSplit[i] !== ""){
                TempArray = ([...TempArray, TextSplit[i].trim()]);
            }
        }
        // 내림차순으로 정렬
        TempArray = TempArray.sort(compare).reverse();
        SetSelectorArray(TempArray);

        // 아이디 선택자 저장
        SelectorArray.map(item => {
            if(item.includes('#')){
                ID.push(item);
            }
        })
        SetIDSelector(ID);
        console.log(IDSelector);

        // Class 선택자 저장
        SelectorArray.map(item => {
            if(item.includes('.')){
                Class.push(item);
            }
        })
        SetClassSelector(Class);
        console.log(ClassSelector);

         // Default 선택자 저장
         SelectorArray.map(item => {
            if(!item.includes('.') && !item.includes('#')){
                Default.push(item);
            }
        })
        SetDefaultSelector(Default);
        console.log(DefaultSelector);


        SelectorArray.map(item => {
            let result = calculate(item)
            ScoreArray.push(result[0].specificityArray);
        })
        SetSelectorScore(ScoreArray);
    }

    const renderIDlist = () => IDSelector.length > 0 && IDSelector.map((item,key) => <li key={key}>{item}</li>);
    const renderClasslist = () => ClassSelector.length > 0 && ClassSelector.map((item,key) => <li key={key}>{item}</li>);
    const renderDefaultlist = () => DefaultSelector.length > 0 && DefaultSelector.map((item,key) => <li key={key}>{item}</li>);
    useEffect(()=>{
        renderIDlist();
        renderClasslist();
        renderDefaultlist();
    }, [IDSelector,ClassSelector,DefaultSelector])
    return (
        <>
        <PrintContainer>
            <PrintDescriptionContainer>
                <PrintDescription>
                <h4>CSS CASECADE 적용 순서</h4>
                    <CasecadingContainer>
                        <CASECADING_LIST>
                            <h4>ID Selector Rank</h4>
                            {renderIDlist()}
                        </CASECADING_LIST>
                        <CASECADING_LIST>
                            <h4>Class Selector Rank</h4>
                            {renderClasslist()}
                        </CASECADING_LIST>
                        <CASECADING_LIST>
                            <h4>Default Selector</h4>
                            {renderDefaultlist()}
                        </CASECADING_LIST>
                    </CasecadingContainer>
                </PrintDescription>
                <PrintDescription>
                    <h4>적용되지 않은 Selector</h4>
                    <Unused_List>
                        <li><strong></strong></li>
                        <li><strong></strong></li>
                        <li><strong></strong></li>
                        <li><strong></strong></li>
                        <li><strong></strong></li>
                    </Unused_List>
                </PrintDescription>
            </PrintDescriptionContainer>
            <PrintTextContainer>
                <PrintTextForm>{HTML}</PrintTextForm>
                <PrintTextForm>{CSS}</PrintTextForm>
            </PrintTextContainer>
        </PrintContainer>
        <ReturnBtnContainer>
            <ReturnBtn onClick={handleSelector}>새로고침</ReturnBtn>
        </ReturnBtnContainer>
        </>
    );
}

export default PrintData;
