import React from 'react';
import styled from 'styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  display: inline-block;
  padding: 8px 20px 8px 20px;
  line-height: 1.54;
  border: none;
  border-radius: 5px;
  background-color: #5e56f0;
  color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;

  &:disabled {
    background-color: #d5dcf9;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = props => {
  return <StyledButton {...props} />;
};

export default Button;
