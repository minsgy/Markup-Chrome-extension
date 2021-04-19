import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
`;



const InputData = () => {
    return (
        <Form>
            <FormContainer>
                <Form.Group>
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </FormContainer>
            <Button variant="primary">검사하기</Button>
        </Form>
    );
}

export default InputData;
