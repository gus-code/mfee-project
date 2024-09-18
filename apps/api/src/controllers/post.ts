import Post from '../models/post';
import Comment from '../models/comment';

//get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

// Get post by id
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
      // const post = await Post.findById(id).populate({
      //     path: "Comment",
      //     options: {strictPopulate: false},
      //     match: { post_id: id },
      //   });
      const post = (await Post.findById(id).populate('comments'));

      if (!post) {
        return res.status(404).json({ message: 'Ups, Post not found' });
      }
      // Return the post with a 200 status code
      res.status(200).json(post);
    } catch (error) {
      const { message } = error;
      res.status(500).json({ message });
    }
}

// Get posts by category
const getPostsByCategory = async (req, res) => {
    const { category } = req.params;
   // const postsByCategory = posts.filter((post) => post.category == category );

   try {
    const posts = await Post.find({category: category});
    console.log(posts)
    res.status(200).json(posts);
   } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
   }
}

//create post 
const createPost = async (req, res) => {
    // Retrieve the name from the request body
    const { title, image, description, category } = req.body;
  
    /*if (!title || !image || !description || !category) {
      // If body values are empty or undefined return a 400 status code with a message
      return res.status(400).json({ message: 'all fields are required.' });
    }*/
  
    // Generate a new post
    const newPost = {
   //   id: Date.now().toString(),
      title: title,
          image: image,
          description: description,
          category: category,
          comments: []
    };

    try {
      const post = await Post.create(newPost);
      // Return the created post with a 201 status code
      res.status(201).json(post);
    } catch (error) {
      const { message } = error;
      res.status(500).json({ message });
    }

};


//create post comment
const createComment = async (req, res) => {
	const { id } = req.params;
  const { author, content} = req.body;
  try {
    const newComment = {
      author: author,
      content: content,
      post_id: id,
    } 
    const comment = await Comment.create(
      newComment
    );
    const posts = await Post.findById(id);
    await Post.findByIdAndUpdate(id, {comments:[...posts.comments, comment._id]});
    // Return the created comment with a 201 status code
    res.status(201).json(comment);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
}

//update post
const updatePost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {new: true})

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    // Return the updated post with a 200 status code
    res.status(200).json(post);
  } catch (error) {
        const { message } = error;
    res.status(500).json({ message });
  }
};

//delete post
const deletePost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    // If we don't find the post return a 404 status code with a message
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Return a 200 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }


};

export default {
    getPosts,
    getPostById,
    getPostsByCategory,
    createPost,
    createComment,
    deletePost,
    updatePost
}



