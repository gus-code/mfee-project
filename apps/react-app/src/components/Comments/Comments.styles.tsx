import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)`
  flex-grow: 1;
  justify-content: center;
`;

export const Title = styled(Grid)`
  flex-grow: 1;
`;

export const FormContainer = styled(Grid)`
  flex-grow: 1;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  label {
    display: block;
    margin-top: 4px;
    font-weight: bold;
  }

  textarea {
    padding-top:6px;
    padding-left:3px;
    width: 100%;
    max-width: 100%;
    font-family: Arial, sans-serif;
    resize: none;
    border-radius: 6px;
    font-weight: 300;
    font-size:14px;
    border: 2px solid #e0e0e0;
    height: 100px;
  }

  button {
    width: 300px;
    height: 30px;
    margin-top: 6px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    color: #fff;
    background-color: #1976d2;
    border-radius: 8px;
    align-self: center;

    &:hover{
      background-color: #1565c0;
      box-shadow: 0 2px 8px rgba(25,118,210,0.3);
      transform: translateY(-2px);
    }
  }

  input{ width: 100%;
    padding-left: 3px;
    max-width: 100%;
    height: 25px;
    font-family: Arial, sans-serif;
    font-weight: 300;
    font-size:14px;
    resize: none;
    border-radius: 4px;
    border: 2px solid #e0e0e0;}
`;
