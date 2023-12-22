import { body, oneOf } from "express-validator";

/// input validation criterias for routes in the routehandlers

export const loginValidatonCriteria = [
  body("email").isEmail().withMessage("Email invalid"),
  body("password").not().isEmpty(),
];

export const createPostValidationCriteria = [
  body("title").trim().isLength({ min: 4, max: 30 }),
  body("description").trim().isLength({ min: 5, max: 100 }),
];

export const updatePostValidationCriteria = [
  //either title or description should be present for updation of the post
  oneOf(
    [
      body("title").trim().isLength({ min: 4, max: 30 }),
      body("description").trim().isLength({ min: 5, max: 100 }),
    ],
    "Either title or description must be provided"
  ),
  body("postId")
    .isString()
    .withMessage("Invalid postId")
    .trim()
    .isLength({ min: 12 }),
];

export const deletePostValidationCriteria = [
  body("postId")
    .isString()
    .withMessage("Invalid postId")
    .trim()
    .isLength({ min: 12 }),
];

export const singupValidatonCriteria = [
  body("email").isEmail().withMessage("Email invalid"),
  body("password").isLength({ min: 4, max: 12 }),
  body("username").isLength({ min: 3, max: 12 }),
];

export const followValidationCriteria = [
  body("userId").not().isEmpty().withMessage("Invalid userId"),
];
