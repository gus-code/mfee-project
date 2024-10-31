import { ChangeEvent, FormEvent, useState, Dispatch, SetStateAction, useRef } from "react";
import TextField from '@mui/material/TextField';
import { Button, FormControl } from "@mui/material";
import { useFormControlContext } from '@mui/base/FormControl';
import { CommentProp } from "../CommentCard/CommentCard";
import { CommentResponse } from "../../types";
import { AxiosError } from "axios";
import { createComment } from "../../api";

interface AddCommentFormProps {
    setCommentsState: Dispatch<SetStateAction<CommentProp[]>>;
    postId: string;
}

function AddCommentForm({setCommentsState, postId}: AddCommentFormProps){

    const [inputValue, setInputValue] = useState<string | null>(null);
    const ref = useRef<HTMLButtonElement>();

    const createCommentApi = async (newComment: CommentProp) => {
        const onSuccess = (data: CommentResponse) => {};
        const onError = (error: AxiosError) => {};
        const onLoading = () => {};
        createComment({postID: postId, newComment: newComment, onSuccess, onError, onLoading});
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>):void{
        event.preventDefault();
        if(inputValue?.length <= 15){
            const newComment: CommentProp = {
                author: "José Valenzuela",
                content: inputValue || "",
            }
            setCommentsState((oldValue: CommentProp[]) => {
                return [...oldValue, newComment];
            });
            setInputValue(null);
            if(ref.current){
                ref.current.value = "";
            }
            createCommentApi(newComment);
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>):void{
        setInputValue(event.target.value);
        console.log(inputValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant="standard"
                fullWidth
                required
                id="comment-id"
                label="Write a comment"
                type="text"
                value={inputValue}
                error={inputValue?.length > 15}
                onChange={handleChange}
                inputRef={ref}
                sx={{pb:2}}
            />
            <Button type="submit" variant="contained" style={{maxWidth: "250px"}}>Add</Button>
        </form>
    );
}

export default AddCommentForm;