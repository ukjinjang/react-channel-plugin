import styled from '@emotion/styled';

const Button = styled.button`
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

export default Button;
