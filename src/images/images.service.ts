import { Injectable } from '@nestjs/common';
import {  BlogDto } from './dto/create-image.dto';
import { Image } from './interfaces/image.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {

  }
  async createImage(imageDto: BlogDto): Promise<Image>{
    const NewImage =  new this.imageModel(imageDto);
    return await NewImage.save();
  }

  async getImages():Promise<Image[]>{
    const image = await this.imageModel.find()
    return image;
  }

  async getImagesID(imageID: string):Promise<Image>{
    const getImageID = await this.imageModel.findById(imageID)
    return getImageID;
  }


  async deleteImage(imageID: string): Promise<Image>{
    const deleteImage = await this.imageModel.findByIdAndDelete(imageID)
    return deleteImage;
  }

  async updateImage(imageID: string, imageDto: BlogDto): Promise<Image>{
    const updateBlog = await this.imageModel.findByIdAndUpdate(imageID, imageDto, {new:true});
    return updateBlog;
  }
 
}
