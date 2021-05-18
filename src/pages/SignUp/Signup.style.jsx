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
    flex-flow: column;
    > span {
      margin: 1rem 0;
    }
  }
`;

export const AvatarSection = styled.div`
  margin: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  > div[class="upload-section"] {
    display: flex;
    flex-flow: column;
    align-items: center;
    > label {
      background-color: #3f51b5;
      color: white;
      padding: 0.5rem;
      font-family: sans-serif;
      border-radius: 0.3rem;
      cursor: pointer;
      margin: 1rem;
      text-align: center;
    }
  }
`;

export const LogoutBTN = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 50px;
  > img {
    width: 80%;
    cursor: pointer;
  }
  background-color: white;
  border-radius: 5px;
  outline: none;
  border: 0px;
`;
