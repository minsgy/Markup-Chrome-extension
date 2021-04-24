import React, {useRef} from 'react';
import styled from 'styled-components';

const FileBox = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 450px;
    justify-content: center;
    align-items: center;
`;

const FileContainer = styled.div`
    display: flex;
    width: 500px;
    height: 450px;
    justify-content: center;
    align-items: center;
`;

const Markup_File = styled.input`
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

const Markup_Label = styled.label`
   cursor: pointer;
`;

const CheckButton = styled.button`
`;

const InputData = () => {
    const HTMLRef = useRef(null);
    const CSSRef = useRef(null);

    

    return (
            <>
                <FileContainer>
                    <Markup_Label for="HTML_file">HTML 업로드</Markup_Label>
                    <Markup_Label for="CSS_file">CSS 업로드</Markup_Label>
                    <Markup_File ref={HTMLRef} type="file" id="HTML_file" />
                    <Markup_File ref={CSSRef} type="file" id="CSS_file" />
                </FileContainer>
                <CheckButton type="submit" onClick="">체크하기</CheckButton>
           </>
        // <Form>
        //     <FormContainer>
        //         <Form.Group>
        //             <Form.Label>HTML Code</Form.Label>
        //             <Form.Control as="textarea" rows={3} required/>
        //             <Form.Text>
        //                 CSS가 적용 될 HTML을 입력해주세요.
        //             </Form.Text>
        //         </Form.Group>
        //         <Form.Group>
        //             <Form.Label>CSS Code</Form.Label>
        //             <Form.Control as="textarea" rows={3} required/>
        //             <Form.Text>
        //                 CSS가 적용 될 HTML을 입력해주세요.
        //             </Form.Text>
        //         </Form.Group>
        //     </FormContainer>
        //     <Button variant="primary" type="submit">검사하기</Button>
        // </Form>
    );
}

export default InputData;
