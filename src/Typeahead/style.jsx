import styled from 'styled-components';
import { COLORS } from './constants';

const List = styled.ul`
  list-style: none; 
  padding: 0;
  margin: 0;
  padding: 0;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.greyLight};
  border-top: none;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #e6e6e6;
  max-height: 300px;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 300px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 1px solid ${COLORS.greyLight};
  color: ${COLORS.primary};
`;

const Button = styled.button`
  background:white;
  border:none;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  right: 6px;
  top: 4px;
  cursor: pointer;
  color: ${COLORS.secondaryFont};
`;

const Li = styled.li`
  padding: 16px 8px;
  margin: 0;
  color: ${COLORS.primary};
  cursor: pointer;
`;

const style = {
  highlightStyle: {
    color: COLORS.secondaryFont,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
};

export {
  List,
  Container,
  InputContainer,
  Input,
  Button,
  Li,
  style,
};
