import { Schema } from "mongoose";

export const ImageSchema = new Schema({
    title: String,
    description: String,
    filename: String,
});
