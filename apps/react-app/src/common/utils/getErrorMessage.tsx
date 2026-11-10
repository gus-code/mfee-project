export const errorMessage = (type: string | undefined) => {
  let error: string = "";
  if (type === "required") error = "This field is required";
  if (type === "minLength") error = "Please, write more than 10 characters";
  if (type === "maxLength") error = "Comment cannot exceed 20 characters";
  return <p style={{ height: "4vh", margin: 0, color: "red" }}>{error}</p>;
};

