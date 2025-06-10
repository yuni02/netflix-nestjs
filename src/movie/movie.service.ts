import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export interface Movie {
  id: number;
  title: string;
  genre: string;
}
@Injectable()
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Avengers',
      genre: 'Action',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      genre: 'Action',
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

  createMovie(createMovieDto: CreateMovieDto): Movie {
    const movie: Movie = {
      id: this.idCounter++,
      title: createMovieDto.title,
      genre: createMovieDto.genre,
    };
    this.movies.push(movie);
    return movie;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    Object.assign(movie, {
      title: updateMovieDto.title,
      genre: updateMovieDto.genre,
    });
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
