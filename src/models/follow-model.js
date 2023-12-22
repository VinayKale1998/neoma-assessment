import mongoose from "mongoose";
const Schema = mongoose.Schema;

/*
userSchema amounting to a document structure as below
        {
            _id:"documentid" //unrelated to any user
            follower:"Vinay",
            following:"Hikaru Nakamura"
        }
*/
const followSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User" },
  follwing: { type: Schema.Types.ObjectId, ref: "User" },
});

const Follow = monogoose.model("Follow", followSchema);

export { Follow };
