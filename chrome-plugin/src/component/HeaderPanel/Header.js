import React from 'react';
import styled from 'styled-components';
import {ReactComponent as LogoImg} from '../assets/Images/Source Code.svg';
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #0C3B45;
`;

const TitleText = styled.p`
    font-size: 10px;
    color: #fff;
    strong{
        display: block;
        font-size: 18px;
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <LogoImg width={40}/>
            <TitleText><strong>Markup Checker</strong>당신의 코드를 한 눈에</TitleText>
        </HeaderContainer>
    );
}

export default Header;
