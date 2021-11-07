import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {ReactComponent as HTMLMark} from '../../assets/Images/logos_html-5.svg';
import {ReactComponent as CSSMark} from '../../assets/Images/logos_css-3.svg';
const FileContainer = styled.div`
    display: flex;
    width: 450px;
    height: 250px;
    justify-content: center;
    align-items: center;
`;

const MarkupFile = styled.input`
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

const MarkupBox = styled.div`
    width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    :nth-child(1){
        padding-right: 25px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    :nth-child(2){
        padding-left: 25px;
    }
    /* &:nth-child(1)::after{
       position: relative;
       top:0;
       bottom:0;
       left: 225px;
       width: 1px;
       height: 100%;
       content: '';
       background-color: rgba(0, 0, 0, 0.1);
   } */
`;

const MarkupTitleLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
    h3{
        font-size: 18px;
        font-weight: bold;
    }
`;

const MarkupContentLine = styled.div`
    display: flex;
    height: 80%;
    justify-content: space-between;
    align-items: center;
    p{
        margin-left: 5px;
        font-size: 11px;
        line-height: 15px;
    }  
    strong{
            font-size: 15px;
            margin-bottom: 10px;
            display: block;
    }
`;

const MarkupLabel = styled.label`  
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   font-size: 11px;
   background-color: #ccc;
   font-weight: bold;
   cursor: pointer;
   width: 50px;
   height: 24px;
   :hover{
        transition: 0.2s;
        background-color: #aaa;
   }
   span{
       font-size: 18px;
       text-shadow: 0px 1px 1px #000;
       margin-top: 8px;
   }
`;

const CheckBtnContainer = styled.div`
    width: 100%;
    height: 60px;
    text-align: center;
`;

const CheckButton = styled.button`
    color: #333;
    border: 1px solid #999;
    background-color: #fff;
    border-radius: 30px;
    width: 100px;
    font-size: 13px;
    height: 30px;
   :hover{
       transition: 0.3s;
       border-color: transparent;
       background-color: #0C3B45;
       color: white;
   }
`;


const InputData = (props) => {

    const HTMLRef = useRef(null);
    const CSSRef = useRef(null);

    const [HTMLFileName, SetHTMLFileName] = useState("");
    const [CSSFileName, SetCSSFileName] = useState("");
    const [HTMLText, SetHTMLText] = useState("");
    const [CSSText, SetCSSText] = useState("");

    // HTML FILE 읽기
    const handleChangeHTMLFile = (e) => {
        let reader = new FileReader();

        if (e.target.files[0]){
            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = () => {
                SetHTMLFileName(e.target.files[0].name);
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
                // 파일 명 뽑기
                SetCSSFileName(e.target.files[0].name);
                SetCSSText(reader.result);
            }
        }
    }
    
    const handleSubmitFile = (e) => {
        e.preventDefault();
        console.log(HTMLText, CSSText);
        if(HTMLText === "" || CSSText === ""){
            alert("파일이 입력되지 않았습니다.");
            return;
        }
        props.GetText(HTMLText, CSSText);
    }

    return (
            <>
                <FileContainer>
                    <MarkupBox>
                        <MarkupTitleLine>
                            <h3>HTML</h3>
                            <MarkupLabel htmlFor="HTML_file">
                                + 파일
                            </MarkupLabel>
                        </MarkupTitleLine>
                        <MarkupContentLine>
                            <HTMLMark width={40}/>
                            <p>
                                { HTMLText ==="" ? <>검사 할 HTML을 선택해주세요.</> : <>{HTMLFileName}을 선택했습니다.</> }
                            </p>
                        </MarkupContentLine>
                        
                    </MarkupBox>
                    <MarkupBox>
                        <MarkupTitleLine>
                            <h3>CSS</h3>
                            <MarkupLabel htmlFor="CSS_file">
                                + 파일
                            </MarkupLabel>
                        </MarkupTitleLine>
                        <MarkupContentLine>
                            <CSSMark width={40}/>
                            <p>
                                { CSSText ==="" ? <>검사 할 CSS를 선택해주세요.</> : <>{CSSFileName}을 선택했습니다.</> }
                            </p>
                        </MarkupContentLine>
                    </MarkupBox>
                    <MarkupFile ref={HTMLRef} onChange={handleChangeHTMLFile} type="file" accept="text/html" id="HTML_file" />
                    <MarkupFile ref={CSSRef} onChange={handleChangeCSSFile} type="file" accept="text/css"  id="CSS_file" />
                </FileContainer>
                <CheckBtnContainer>
                <CheckButton type="submit" onClick={handleSubmitFile}>체크하기</CheckButton>
                </CheckBtnContainer>
            </>
    );
}

export default InputData;
