import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const PageContainer = styled(Grid)`
  display: flex;
  padding: 32px;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-height:100vh;
  background: linear-gradient(180deg, #fff 0%, #e8f1fc 100%);
`;

export const FormContainer = styled(Grid)`
  flex-grow: 1;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  padding:40px;
  width: 100%;
  max-width:400px;

  h2{
    text-align: center;
    margin-bottom:24px;
    color: #333;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }


  textarea {
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    font-family: Arial, sans-serif;
    resize: none;
  }

  button {
    padding: 12px 16px;
    margin-top: 8px;
    font-size:16px;
    font-weight:bold;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #1976d2;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover{
      background-color: #1565c0;
      box-shadow: 0 2px 8px rgba(25,118,210,0.3);
      transform: translateY(-2px);
    }

    
  }

  input{
    width: 100%;
    padding: 12px 14px;
    margin-top: 4px;
    box-sizing: border-box;
    font-weight: 300;
    font-size:14px;
    font-family: Arial, sans-serif;
    border: 2px solid #e0e0e0;
    border-radius: 8px;


    &:focus{
     outline: none;
     border-color: #1976d2;
     box-shadow: 0 0 0 3px rgba(25,118,210, 0.1);
    }

    &::placeholder{
    color: #999;
    }
  }

  a{
  text-align: center;
  color: #1976d2;
  font-size:14px;
  margin-top:8px;
  cursor:pointer;
  text-decoration: none;
  
  }
  
  label{
    display: block;
    font-weight: 500;
    font-size:14px;
    color:#333;
    margin-bottom:4px;
  
  }

  div{
    display:flex;
    flex-direction:column;
    gap:5px;

    &.row{
      flex-direction:row;
      gap:12px;

      > div{
        flex:1;
        flex-direction:column;
      
      }
    }
  }

`;

