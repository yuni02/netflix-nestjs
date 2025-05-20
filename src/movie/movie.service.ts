import { Injectable, NotFoundException } from '@nestjs/common';
export interface Movie {
  id: number;
  title: string;
}
@Injectable()
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Avengers',
    },
    {
      id: 2,
      title: 'The Dark Knight',
    },
  ];
  private idCounter = 3;

  getManyMovies(title?: string): Movie[] {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((movie) => movie.title.startsWith(title));
  }

  getMovieId(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    return movie;
  }

  createMovie(title: string): Movie {
    console.log(title);
    const movie: Movie = {
      id: this.idCounter++,
      title,
    };
    this.movies.push(movie);
    return movie;
  }

  updateMovie(id: number, title: string): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    Object.assign(movie, { title });
    return movie;
  }

  deleteMovie(id: number): boolean {
    const movieIndex = this.movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    this.movies.splice(movieIndex, 1);
    return true;
  }
}
