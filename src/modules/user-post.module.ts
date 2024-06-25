import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserPostController } from './user-post.controller';
import { UserPostService } from './user-post.service';

@Module({
  imports: [HttpModule],
  controllers: [UserPostController],
  providers: [UserPostService],
  exports: [UserPostService],
})
export class UserPostModule {}