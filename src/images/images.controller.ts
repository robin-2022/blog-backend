import { Controller, Get, Post, Body, Put, Param, Req, Res, UploadedFile, HttpStatus, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageDto } from './dto/create-image.dto';
import { fileFilter, renameImage } from './helpers/images.helper';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
          destination: './upload',
          filename: renameImage
      }),
      fileFilter: fileFilter
    }))

  async uploadImage( @UploadedFile() file: Express.Multer.File,@Req() req,@Res() res,@Body() imageDto: ImageDto,) {
    const newImage = await this.imagesService.createImage(imageDto);
    return res.status(200).json({
      message: 'Image uploaded successfully',
      newImage
    });
  }

  @Get('/')
    async getBlogs(@Res() res){
        const images = await this.imagesService.getImages();
        return res.status(HttpStatus.OK).json({
            images
        })
    }

    @Get('/:imadeID')
    async getImagesID(@Res() res, @Param('imadeID') imadeID: string){
        const imagesID = await this.imagesService.getImagesID(imadeID);
        return res.status(HttpStatus.OK).json({
            imagesID
        })
    }

    @Put('/update/:imageID')
    async updateImage(@Res() res, @Body() imageDto: ImageDto, @Param('imageID') imageID:string){
        const updateImage = await this.imagesService.updateImage(imageID, imageDto);
        if(!updateImage) throw new NotFoundException('update Product Does Not exists ');
        return res.status(HttpStatus.OK).json({
            message:'Product Updated successfully',
            updateImage
        })
    }  



  @Delete('/delete/:imageID')
  async deleteImage(@Res() res, @Param('imageID') imageID: string){
      const ImageDelete = await this.imagesService.deleteImage(imageID);
      if(!ImageDelete) throw new NotFoundException('Image do no exist');
      return res.status(HttpStatus.OK).json({
          message:'Image Deleted succesfully',
          ImageDelete
      })
    }
  }
