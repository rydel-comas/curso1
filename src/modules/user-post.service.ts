import { Injectable } from '@nestjs/common';
import { from, map, forkJoin } from 'rxjs';
import axios from 'axios';

@Injectable()
export class UserPostService {
  constructor() {}

  getUserAndPost() {
    const users$ = from(axios.get('https://jsonplaceholder.typicode.com/users')).pipe(map((response) => response.data));

    const posts$ = from(axios.get('https://jsonplaceholder.typicode.com/posts')).pipe(map((response) => response.data));

    return forkJoin([users$, posts$]).pipe(
      map(([users, posts]) => {
        return users.map((user) => ({
          users,
          posts: posts.filter((post) => post.userId === user.id),
        }));
      })
    );
  }
}