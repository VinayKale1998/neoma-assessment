import mongoose from "mongoose";
import { Password } from "../services/password.js";
import { InternalServerError } from "../errors/error-export.js";
const Schema = mongoose.Schema;

/*
userSchema amounting to a document structure as below
        {
            _id:"",
            email:"",
            password:"",
            userName: "",
            joined:"",
        }
*/
const userSchema = new Schema({
  email: { type: String, required: [true, "email must be provided"] },
  password: { type: String, required: [true, "password must be provided"] },
  username: { type: String, required: [true, "Username  must be provided"] },
  joined: { type: Date, default: Date.now },
});

/*
 pre hook used to hash the password before saving upon first creation 
 or modification of the password 
 */
userSchema.pre("save", async function (done) {
  //first creation will also be considered as modification
  if (this.isModified("password")) {
    try {
      const hashedPassword = Password.toHash(this.get("password"));
      this.set("password", hashedPassword);
    } catch (error) {
      throw new InternalServerError("Error hashing password");
    }
  }

  done();
});
const User = mongoose.model("User", userSchema);

export { User };
