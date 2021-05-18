import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  @media (max-width: 967px) {
    width: 80%;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  column-gap: 25px;
  > div {
    flex: auto !important;
  }
  @media screen and (max-width: 468px) {
    flex-flow: column;
  }
`;

export const Field = styled(TextField)``;

export const SubmitWrapper = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin: 0 0 0 10px;
    > span {
      color: #1a73e8;
      font-weight: 600;
      cursor: pointer;
    }
  }
  > button {
    margin: 10px;
  }
  @media (max-width: 967px) {
    > span {
      margin: 1rem 0 0 0;
    }
  }
`;
