import express from "express";
import { requireAuth } from "../middlewares/require-auth.js";
import { validationCapture } from "../middlewares/validation-capture.js";
import { Post } from "../models/post-model.js";
import { NotFoundError } from "../errors/error-export.js";
import {
  createPostValidationCriteria,
  updatePostValidationCriteria,
  deletePostValidationCriteria,
} from "../helpers/vaidation-criterias.js";
import { currentUser } from "../middlewares/current-user.js";

/*
    router implementations

    post-create
    post-update
    post-delete
    posts-get (get posts other than the current user's)
    posts-getAll
    Allows authenticated clients to create posts, upadate their posts, delete their posts, and fetch posts
*/

const postsRouter = express.Router();

// <----------------------------------------------------create post---------------------------------------------------------------------->
postsRouter.post(
  "/api/v1/posts/",
  createPostValidationCriteria,
  currentUser,
  validationCapture,
  requireAuth,
  async (req, res, next) => {
    /*
    by this point, the validation criteria and validation capture middlewares would've checked for request sanity and would've throw an error if necessary
    and currentUser  middleware would've set the currentUser if the jwt in the session cookie is valid and present,
    requieAuth middleware would've  thrown an Auth error if currentUser was undefined, making this an auth secured route
    */

    const { _id } = req.currentUser;
    const { title, description } = req.body;

    const post = new Post({ author: _id, title, description });

    try {
      const savedPost = await post.save();
      return res.status(201).send(savedPost);
    } catch (err) {
      throw err;
    }
  }
);

// <----------------------------------------------------update post---------------------------------------------------------------------->
postsRouter.put(
  "/api/v1/posts/",
  updatePostValidationCriteria,
  validationCapture,
  currentUser,
  requireAuth,
  async (req, res, next) => {
    /*
      by this point, the validation criteria and validation capture middlewares would've check for request sanity and would've throw an error if necessary
      and currentUser  middleware would've set the currentUser if the jwt in the session cookie is valid and present
      requieAuth would've  thrown an Auth error if currentUser was undefined, making this an auth secured route
      */

    const { _id } = req.currentUser;

    //At this point from the validation criteria above, we know that we will definitely have a valid title or description or both
    //which is present and which is absent or if both are present, will be checked after author match
    const { postId, title, description } = req.body;

    try {
      const post = await Post.findById(postId);
      if (!post) throw new NotFoundError("Post not found");

      //check if the token authenticated user is the owner of the postId under question
      if (post.author.toString() === _id) {
        //if it's a match then we go ahead and update the fields that are defined
        if (description && title) {
          post.set({
            title,
            description,
          });
        } else if (title) {
          post.set({
            title,
          });
        } else {
          post.set({
            description,
          });
        }

        //save and responsd
        await post.save();
        res.send(post);
      }
    } catch (err) {
      throw err;
    }
  }
);

// <----------------------------------------------------delete post---------------------------------------------------------------------->
postsRouter.delete(
  "/api/v1/posts/",
  deletePostValidationCriteria,
  validationCapture,
  currentUser,
  requireAuth,
  async (req, res, next) => {
    /*
      by this point, the validation criteria and validation capture middlewares would've check for request sanity and would've throw an error if necessary
      and currentUser  middleware would've set the currentUser if the jwt in the session cookie is valid and present
      requieAuth would've  thrown an Auth error if currentUser was undefined, because this is an auth secured route
      */

    const { _id } = req.currentUser;
    const { postId } = req.body;
    try {
      const post = await Post.findById(postId);
      if (!post) throw new NotFoundError("Post not found");

      //check if the token authenticated user is the owner of the postId under question
      if (post.author.toString() === _id) {
        //if it's a match then we go ahead and delete the post

        //delete and respond with deletion status
        const deleted = await post.deleteOne();
        return res.send({ deleted });
      }
    } catch (err) {
      throw err;
    }
  }
);

//// <----------------------------------------------------get posts---------------------------------------------------------------------->
/*
the user shall be authenticated for this as we are retrieving posts created only by other users 
*/
postsRouter.get(
  "/api/v1/posts/",
  currentUser,
  requireAuth,
  async (req, res) => {
    //extracting the authenticated user Id
    const { _id } = req.currentUser;
    try {
      //fetching  posts of others  but limiting the user population to only _id and username from the User document with populate options
      const posts = await Post.find({ author: { $ne: _id } })
        .limit(100)
        .populate({ path: "author", select: "_id username" })
        .exec();

      if (posts.length === 0) return res.send({ posts: [] });
      else return res.send({ posts });
    } catch (err) {
      throw err;
    }
  }
);

// <----------------------------------------------------get all posts---------------------------------------------------------------------->
postsRouter.get("/api/v1/posts/global", async (req, res) => {
  //retrieving all posts
  try {
    //fetching all posts but limiting the user population to only _id and username from the User document with populate options
    const posts = await Post.find({})
      .limit(100)
      .populate({ path: "author", select: "_id username" })
      .exec();

    // posts will either be an empty array or array of posts
    return res.send({ posts });
  } catch (err) {
    throw err;
  }
});
export { postsRouter };
