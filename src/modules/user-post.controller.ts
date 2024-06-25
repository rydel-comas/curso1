import { Controller, Get } from '@nestjs/common';
import { UserPostService } from './user-post.service';


@Controller('api')

export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}

  @Get('user-post')
  getFilterPost() {
    return this.userPostService.getUserAndPost();
  }
}