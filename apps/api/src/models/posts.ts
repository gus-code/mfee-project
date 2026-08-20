export type Comment = {
    id: string;
    author: string;
    content: string
};

export type Post= { 
    id: string;
    title: string; 
    image: string;
    description: string;
    category: string;
    comments: Comment[]
};