export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Social Media API",
    version: "1.0.0",
    description: "A simple social media API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/v1/users/signup": {
      post: {
        summary: "User Signup",
        description: "Creates a new user account.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                  username: { type: "string" },
                },
                required: ["email", "password", "username"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Invalid input",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/users/login": {
      post: {
        summary: "User Login",
        description: "Authenticates a user and returns a JWT token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful login",
          },
          401: {
            description: "Authentication failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/posts/": {
      post: {
        summary: "Create Post",
        description: "Creates a new post.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                },
                required: ["title", "description"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Post created successfully",
          },
          400: {
            description: "Invalid input",
          },
          401: {
            description: "Authentication failed",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      put: {
        summary: "Update Post",
        description: "Updates an existing post.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  postId: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                },
                required: ["postId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Post updated successfully",
          },
          400: {
            description: "Invalid input",
          },
          401: {
            description: "Authentication failed",
          },
          404: {
            description: "Post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      delete: {
        summary: "Delete Post",
        description: "Deletes an existing post.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  postId: { type: "string" },
                },
                required: ["postId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Post deleted successfully",
          },
          400: {
            description: "Invalid input",
          },
          401: {
            description: "Authentication failed",
          },
          404: {
            description: "Post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/users/follow": {
      post: {
        summary: "Follow User",
        description: "Follows another user.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                },
                required: ["userId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Followed successfully",
          },
          400: {
            description: "Invalid input",
          },
          401: {
            description: "Authentication failed",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/v1/users/unfollow": {
      // Specify the custom route path for Unfollow User
      delete: {
        summary: "Unfollow User",
        description: "Unfollows a user.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                },
                required: ["userId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Unfollowed successfully",
          },
          400: {
            description: "Invalid input",
          },
          401: {
            description: "Authentication failed",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
};
