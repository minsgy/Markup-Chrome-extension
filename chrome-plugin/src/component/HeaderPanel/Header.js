import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50px;
    background-color: rgb(1,1,1,0.8);
    color: white;
`;

const Header = () => {
    return (
        <HeaderContainer>
            헤더부분
        </HeaderContainer>
    );
}

export default Header;
