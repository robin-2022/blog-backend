import { Controller, Get, Post, Body, Put, Param, Req, Res, UploadedFile, HttpStatus, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BlogDto } from './dto/create-image.dto';
import { fileFilter, renameImage } from './helpers/images.helper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
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

  async uploadImage( @UploadedFile() file: Express.Multer.File,@Req() req,@Res() res,@Body() imageDto: BlogDto,) {
    const newImage = await this.imagesService.createImage(imageDto);
    return res.status(200).json({
      message: 'Blog register successfully',
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

    @Get('/:blogID')
    async getImagesID(@Res() res, @Param('blogID') imadeID: string){
        const blogsID = await this.imagesService.getImagesID(imadeID);
        return res.status(HttpStatus.OK).json({
          blogsID
        })
    }

    @Put('/update/:blogID')
    async updateImage(@Res() res, @Body() blogDto: BlogDto, @Param('blogID') blogID:string){
        const updateImage = await this.imagesService.updateImage(blogID, blogDto);
        if(!updateImage) throw new NotFoundException('update Product Does Not exists ');
        return res.status(HttpStatus.OK).json({
            message:'Product Updated successfully',
            updateImage
        })
    }  



  @Delete('/delete/:blogID')
  async deleteImage(@Res() res, @Param('blogID') blogID: string){
      const BlogDelete = await this.imagesService.deleteImage(blogID);
      if(!BlogDelete) throw new NotFoundException('Image do no exist');
      return res.status(HttpStatus.OK).json({
          message:'Image Deleted succesfully',
          BlogDelete
      })
    }
  }
