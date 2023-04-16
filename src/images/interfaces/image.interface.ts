import { Document } from "mongoose";
 
export interface Image extends Document {
   readonly title: string;
   readonly description: string;
   readonly filename: string;
}