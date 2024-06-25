import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IPost } from './interfaces/IPosts';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // json place holder
  @Get('jph-filter-posts')
  getFilterPost(): Observable<IPost[]> {
    return this.appService.getFilteredPostsJsonPlaceHolder();
  }


  @Get('rm-characters-locations')
  getAllCharacteresAndLocations():Observable<any> {
    return this.appService.getAllCharacteresAndLocations();
  }


  // http://localhost:3000/api/rm-characters-locations
}
