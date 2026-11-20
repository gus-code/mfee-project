import Comment from "./Comment";

interface Post {
    id: string;
    title: string;
    image: string;
    description: string;
    category: string;
    comments: Comment[];
}

export default Post;