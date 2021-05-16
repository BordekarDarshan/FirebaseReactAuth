import styled, { css } from "styled-components";

const CustomButton = css`
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.primary};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.slider};
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin: 0 5px;
  > p {
    font-size: 13px;
    letter-spacing: 3px;
    font-weight: 600;
    margin: 0;
    text-indent: 4px;
    text-align: center;
    font-family: ilisarniq, sans-serif;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    :hover {
      transform: scale(1.1);
    }
  }
`;

const GetButtonStyles = (props) => {
  if (props.custom) {
    return CustomButton;
  }
};

export const CustomButtonContainer = styled.button`
  ${GetButtonStyles};
`;
