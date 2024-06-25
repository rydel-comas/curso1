import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserPostModule } from './modules/user-post.module';




@Module({
  imports: [HttpModule, UserPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
