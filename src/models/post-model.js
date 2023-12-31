import mongoose from "mongoose";
const Schema = mongoose.Schema;

/*
posts schema amounting to a document structure as below
        {
            _id:"vsff11232vsdf112",//postId
            title:"Social Media",
            author:"fsvsfsf12323" //userId
            description: "The most influential tool in the world",
            createdAt:"123233",
            updatedAt:"232323"
        }
*/
const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "title  must be provided"] },

    description: {
      type: String,
      required: [true, "description  must be provided"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
