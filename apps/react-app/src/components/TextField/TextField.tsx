import { TextField as TextFieldMui } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
interface TextFieldProps<T>{
    id: string, 
    label: string,
    type: string, 
    value: string | null,
    keyName: string,
    error?: boolean,
    comparePasswords?: (password: string | null, confirmPassword: string | null) => void; 
    setState: Dispatch<SetStateAction<T>>
}

function TextField<T>({id, label, type, value, keyName, error, comparePasswords, setState}: TextFieldProps<T>){

    function handleChange(keyName: string, value: string):void{
        setState((oldValue) => {
            console.log({...oldValue, [keyName]: value});
            return {...oldValue, [keyName]: value}
        });
    }

    function handleChangePasswords(keyName: string, value: string): void {
        setState((oldValue) => {
          const updatedFields = { ...oldValue, [keyName]: value };
      
          // Aquí llamamos a comparePasswords con los valores actualizados
          if (comparePasswords && (keyName === "inputValuePassword" || keyName === "inputValueConfirmPassword")) {
            comparePasswords(updatedFields.inputValuePassword, updatedFields.inputValueConfirmPassword);
          }
      
          return updatedFields;
        });
      }

    return (
        <>
            {!id.includes("password") ? (<TextFieldMui
                variant="outlined"
                fullWidth
                required
                id={id}
                label={label}
                type={type}
                value={value}
                onChange={(event) => handleChange(keyName, event.target.value)}
                sx={{pb:2}}
            />) : (<TextFieldMui
                variant="outlined"
                fullWidth
                required
                id={id}
                label={label}
                type={type}
                value={value}
                onChange={(event) => handleChangePasswords(keyName, event.target.value)}
                error={error}
                sx={{pb:2}}
            />)}
        </>
        
    )
}

export default TextField;