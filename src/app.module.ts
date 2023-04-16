import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ 
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),  
  MongooseModule.forRoot("mongodb+srv://robinlaor:HFvSvb5ATH48p_8@cluster0.r3oayja.mongodb.net/blogs"),
  ImagesModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
