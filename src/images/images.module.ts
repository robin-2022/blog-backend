import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [MongooseModule.forFeature([
    {name:'Image', schema: ImageSchema}
  ])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
