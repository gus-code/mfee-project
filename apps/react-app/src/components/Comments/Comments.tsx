import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from '../CommentCard/CommentCard';
import { CommentResponse } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form"

import "../FormStyles/styles.css";

//✅ ACT 3 - Receive comments prop
interface Props {
  comments: CommentResponse[];
}

type Inputs = {
  userName: string;
  comment: string;
}

function Comments( { comments }: Props ) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/*✅ ACT 1 = Render CommentCard component */}
      {/*✅ ACT 3 - Send one comment (comments[0]) as prop to CommentCard component */}
      {/*✅ ACT 5 - Iterate comments to render CommentCard component for each comment */}
      {
        comments.map((comment:CommentResponse) => (
          <CommentCard key={ comment._id } comment={ comment } />
        ))
      }
      <FormContainer item sm={8}>
        {/*✅ ACT 8 - Create a form to add comments */}
        <form onSubmit={ handleSubmit(onSubmit) }>

          <div>
            <label htmlFor="userName"> User Name </label>
            <input id="userName" {...register("userName", { required : true })} />
            {errors.userName && <span> User name field required </span>}
          </div>

          <div>
            <label htmlFor="comment"> Comment </label>
            <textarea id="comment" {...register("comment", { required: true })} />
            {errors.comment && <span> Comments field required </span>}
          </div>

          <input type="submit" />

        </form>
      </FormContainer>
    </Container>
  );
}

export default Comments;
