import React, {useEffect, useState} from 'react';
import {calculate, compare} from 'specificity';

import styled from 'styled-components';

const SelectItem = styled.li`

    border: ${({color}) => color ? `1px solid ${color}`: 'none'};
    padding: 2px 5px;
    border-radius: 5px;
    box-sizing: border-box;
    color: black;   
    margin-bottom: 5px;
    
`;


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
    /* margin-top: 10px;
    margin-right: 5px; */
    margin: 10px 5px;
    /* flex:1; */
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
`;

const UnusedList = styled.ul`
    margin-top: 10px;
    text-align: left;
    strong{
        font-size: 12px;
        color: red;
    }
    li{
        margin-bottom: 5px;
        text-align:center;
    }
`;

const PrintTextContainer = styled.div`  
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    border-top: 1px solid #e4e4e4;
`;

const PrintTextHeader = styled.div`
    flex: 1;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    :nth-child(1){
        border-right: 1px solid #e4e4e4;
    }
    h4{
        font-size: 13px;
        text-align: center;
        color:#1b56cf;
        padding: 5px 0;
    }
`;


const PrintTextForm = styled.pre`
    width: 100%;
    font-size: 10px;
    overflow-y: scroll;
    height: 300px;
    padding : 10px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;

    &::-webkit-scrollbar{
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        height: 10%;
        background-color: rgba(33, 133, 133, 1);
        border-radius: 10px;
    }   
    &::-webkit-scrollbar-track {
        background-color: rgba(33,133, 33, 0.2);
    }
`;

const ReturnBtnContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RemoveBtn = styled.button`
    border: 1px solid #1b56cf;
    background-color: #1b56cf;
    color: white;
    border-radius: 10px;
    width: 50px;
    font-size: 13px;
    height: 30px;
   :hover{
       transition: 0.3s;
       background-color: white;
       color: black;
   }
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
    const [UnusedSelector, SetUnusedSelector] = useState([]);

    const [HTML, SetHTML] = useState(HTMLText);
    const [CSS, SetCSS] = useState(CSSText);
    const [ResultCSS, SetResultCSS] = useState('없음');


    const handleRemoveSelector = (id) => {
        let arr = [...UnusedSelector];
        let css = ResultCSS;
        let query = arr[id];
        css = css.split(query);
        css[1] = css[1].replace('}',']');
        css = css[0].concat(css[1].split(']')[1].replace(/\s+/, ''));

        console.log(css)
        SetResultCSS(css);
        arr.splice(id, 1);
        SetUnusedSelector(arr);
    }


    // 선택자 Filter
    const handleSelector = () => {
        let TempArray = []
        let ScoreArray = []
        let ID = [];
        let Class = [];
        let Default = [];
        let Unused = [];
        // HTML Filter

        SetResultCSS(CSSText);
        let RemarkSplit_HTML = HTMLText.replace(/<!--[^>](.*?)-->/g,"");
        // RemarkSplit_HTML = RemarkSplit_HTML.replace(/\n/gi,"");
        // RemarkSplit_HTML = RemarkSplit_HTML.replace(/\s+/gi,"");
        let FilterClasses = RemarkSplit_HTML.match(/class=".*"/gi);

        FilterClasses = FilterClasses.map(value => {
            value = value.replace('class=', '');
            value = value.replace(/"/gi, '');
            return `.${value}`
        })


        let FilterId = RemarkSplit_HTML.match(/id=".*"/gi);
        if (FilterId !== undefined) {
            FilterId = FilterId.filter(value => !value.includes(' '));
            FilterId = FilterId.map(value => {
                value = value.replace('id=', '');
                value = value.replace(/"/gi, '');
                return `#${value}`
            })
        }

        RemarkSplit_HTML =  FilterClasses.concat([...FilterId]);
        const set = new Set(RemarkSplit_HTML);
        RemarkSplit_HTML = [...set];

        
        SetHTML(RemarkSplit_HTML);
 
        // CSS Filter
        // CSS 주석제 완료
        // 문자열 중, } 값 전부 {로 변경 - split 사용하려고
        // 줄바꿈 제거
        // 공백 제거
        let RemarkSplit_CSS = CSSText.replace(/(\/\*)[^(\*\/)]*(\*\/)/g, "");

        console.log(RemarkSplit_CSS)
        SetCSS(RemarkSplit_CSS); // 주석제거 CSS
        console.log(RemarkSplit_HTML)
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
        console.log(TempArray)
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

        
        ID.map(value => {
            if (!HTML.includes(value))
                Unused.push(value)
        })

        Class.map(value => {
            if (!HTML.includes(value))
                Unused.push(value)
        })


        SetUnusedSelector(Unused);

        // 스코어점수 계산
        SelectorArray.map(item => {
            let result = calculate(item)
            ScoreArray.push(result[0].specificityArray);
        })
        SetSelectorScore(ScoreArray);
        console.log(SelectorScore)
    }

    const renderIDlist = () => IDSelector.length > 0 && IDSelector.map((item,key) => <SelectItem color={'red'} key={key} >{item}</SelectItem>);
    const renderClasslist = () => ClassSelector.length > 0 && ClassSelector.map((item,key) => <SelectItem color={'red'} key={key} >{item}</SelectItem>);
    const renderDefaultlist = () => DefaultSelector.length > 0 && DefaultSelector.map((item,key) => <SelectItem color={'red'} key={key} >{item}</SelectItem>);
    const renderUnusedlist = () => UnusedSelector.length > 0 && UnusedSelector.map((item, key) => <SelectItem onClick={() => handleRemoveSelector(key)} key={key}><strong>{item}</strong> <RemoveBtn className="remove-button">삭제</RemoveBtn> </SelectItem>);
    useEffect(()=>{
        // CASECADE LIST RENDER
        renderIDlist();
        renderClasslist();
        renderDefaultlist();
        renderUnusedlist();
    }, [IDSelector,ClassSelector,DefaultSelector, UnusedSelector])


    return (
        <>
        <PrintContainer>
            <PrintDescriptionContainer>
                <PrintDescription>
                <h4>CSS 적용 순서</h4>
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
                    <UnusedList>
                        {renderUnusedlist()}
                    </UnusedList>
                </PrintDescription>
            </PrintDescriptionContainer>
            <PrintTextContainer>
                <PrintTextHeader>
                    <h4>CSS</h4>
                    <PrintTextForm>{CSS}</PrintTextForm>
                </PrintTextHeader>
                <PrintTextHeader>
                    <h4>Result CSS</h4>
                    <PrintTextForm>{ResultCSS}</PrintTextForm>
                </PrintTextHeader>
            </PrintTextContainer>
        </PrintContainer>
        <ReturnBtnContainer>
            <ReturnBtn onClick={handleSelector}>새로고침</ReturnBtn>
        </ReturnBtnContainer>
        </>
    );
}

export default PrintData;
