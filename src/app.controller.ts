import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
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
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('title') title: string) {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((movie) => movie.title.startsWith(title));
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    return movie;
  }

  @Post()
  postMovie(@Body('title') title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title,
    };
    this.movies.push(movie);
    return movie;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('title') title: string) {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    Object.assign(movie, { title });
    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    const movieIndex = this.movies.findIndex(
      (movie) => movie.id === parseInt(id),
    );
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 영화의 id입니다.');
    }
    this.movies.splice(movieIndex, 1);
    return id;
  }
}
