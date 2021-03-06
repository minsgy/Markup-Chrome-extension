import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Header from './component/HeaderPanel/Header';
import Main from './component/MainPanel/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 100%;

  border: 1px solid #e4e4e4;

`;


const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}

html{
  color: #4B5364;
}
`;


const App = () => {
  return (  
    <>
    <Container>
      <GlobalStyle />
      <Header />
      <Main />
    </Container>
    </>
  );
}

export default App;
