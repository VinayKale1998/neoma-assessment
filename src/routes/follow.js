import express from "express";
import { requireAuth } from "../middlewares/require-auth.js";
import { Follow } from "../models/follow-model.js";
import { validationCapture } from "../middlewares/validation-capture.js";
import { followValidationCriteria } from "../helpers/vaidation-criterias.js";
import { NotFoundError } from "../errors/not-found-error.js";
import { currentUser } from "../middlewares/current-user.js";
const followRouter = express.Router();

/*
route implementations

follow-user
unfollow-user
get-followers
get-following

*/

//auth will be required for all the methods, hence requireAuth middleware will be wired up

//<-----------------------------------follow----------------------------------------------------------->

followRouter.post(
  "/api/v1/users/follow",
  currentUser,
  requireAuth,
  followValidationCriteria,
  validationCapture,
  async (req, res) => {
    //authenticated user
    const { _id } = req.currentUser;

    //user to be followed
    const { userId } = req.body;

    try {
      const follow = new Follow({ follower: _id, following: userId });
      await follow.save();

      return res.send({ message: "Followed" });
    } catch (err) {
      //will be caught by error handler middleware
      throw err;
    }
  }
);

//<-----------------------------------unfollow----------------------------------------------------------->

followRouter.delete(
  "/api/v1/users/unfollow",
  currentUser,
  requireAuth,
  followValidationCriteria,
  validationCapture,
  async (req, res) => {
    //authenticated user
    const { _id } = req.currentUser;

    //user to be followed
    const { userId } = req.body;

    try {
      const follow = await Follow.findOne({ follower: _id, following: userId });

      //check if no document was returned ,follow will be null in this case
      if (!follow) throw new NotFoundError("User not found");

      //if follow is not null, delete and send the status to the client
      const deleteStatus = await follow.deleteOne();

      return res.send({
        message: deleteStatus?.acknowledged
          ? "Unfollow successfull"
          : "Unfollow failed",
      });
    } catch (err) {
      //will be caught by error handler middleware
      throw err;
    }
  }
);

//<-----------------------------------followers----------------------------------------------------------->
followRouter.get(
  "/api/v1/users/followers",
  currentUser,
  requireAuth,
  async (req, res) => {
    // Find Follow documents where the current user is being followed

    //authenticated user
    const { _id } = req.currentUser;

    try {
      //serach for followers and populating with appropriate data to be returned
      const followers = await Follow.find({ following: _id })
        .populate({
          path: "follower",
          select: "_id username",
        })
        .select("follower -_id") // Select only the follower field and exclude the _id of the Follow document
        .limit(100);

      if (!followers || followers.length === 0) throw new NotFoundError();

      //else send the followers array to the client
      return res.send({ followers: followers });
    } catch (err) {
      //will be caught by error handler middleware
      throw err;
    }
  }
);

//<-----------------------------------following----------------------------------------------------------->

followRouter.get(
  "/api/v1/users/following",
  currentUser,
  requireAuth,
  async (req, res) => {
    // Find Follow documents where the current user is the follower

    // Authenticated user
    const { _id } = req.currentUser;

    try {
      //serach for following and populating with appropriate data to be returned
      const following = await Follow.find({ follower: _id })
        .populate({
          path: "following",
          select: "_id username",
        })
        .select("following -_id")
        .limit(100);

      if (!following || following.length === 0) throw new NotFoundError();

      // Send the following array to the client
      return res.send({ following: following });
    } catch (err) {
      // Will be caught by error handler middleware
      throw err;
    }
  }
);

export { followRouter };
