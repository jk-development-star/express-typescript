import { Document, model, Schema } from "mongoose";
import * as validator from "validator";

export type TAuthor = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  age: number;
};
export interface IAuthor extends TAuthor, Document {}

const AuthorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [4, "First name contains atleast 4 characters"],
      maxlength: 30,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [3, "Last name contains atleast 3 characters"],
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email, Please try with correct one.");
        }
      },
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      minlength: [10, "Contact number must have 10 digits"],
      maxlength: [12, "Contact number can not contains more than 12 digits"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Author = model<IAuthor>("Author", AuthorSchema);
export default Author;
