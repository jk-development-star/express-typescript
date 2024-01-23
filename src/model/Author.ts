import mongoose, { Document, Schema } from 'mongoose';
export interface IAuthor extends Document {
  name: string;
}

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    minlength: [4, 'Author name contains atleast 4 characters'],
    maxlength: 30,
  },
});

export default mongoose.model<IAuthor>('Author', AuthorSchema);
