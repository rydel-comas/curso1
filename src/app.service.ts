import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, filter, from, map, mergeMap, of, toArray, forkJoin} from 'rxjs';
import { IPost } from './interfaces/IPosts';
import { ICharacters } from './interfaces/ICharacters';
import { ILocation } from './interfaces/ILocation';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService){}

  getFilteredPostsJsonPlaceHolder(): Observable<IPost[]> {
    return this.httpService.get<IPost[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map(response => response.data),
      mergeMap(posts => from(posts)),
      filter((post:IPost) => post.userId === 1),
      toArray(),
      catchError(error => {
        console.error('Error fetching posts data:', error.message);
        return of([])
      })
    );
  }
  // https://rickandmortyapi.com/api/character
  // https://rickandmortyapi.com/api/location
  getAllCharacteresAndLocations():Observable<any> {

    const characters$ = this.httpService.get<ICharacters>('https://rickandmortyapi.com/api/character').pipe(
      map((response) => response.data.results),
      catchError(error => of({ error: 'Error fetching characters data', details: error.message }))
    );

    const location$ = this.httpService.get<ILocation>('https://rickandmortyapi.com/api/location').pipe(
      map((response) => response.data.results),
      catchError(error => of({ error: 'Error fetching locations data', details: error.message }))
    );

    return forkJoin({ characters: characters$, locations: location$ }).pipe(
      map(({ characters, locations}) => {
        return { 
          characters: characters,
          locations: locations 
        }
      })
    );

  }
}
