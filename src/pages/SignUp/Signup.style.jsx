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
`;

export const FirstRow = styled.div`
  display: flex;
  column-gap: 25px;
  @media screen and (max-width: 468px) {
    flex-flow: column;
  }
`;

export const Field = styled(TextField)``;

export const SubmitWrapper = styled.div`
  display: flex;
`;
