import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Movie, MovieService } from './movie.service';
import { log } from 'console';

@Controller('movie')
export class MovieController {
  constructor(private readonly appService: MovieService) {}

  @Get()
  getManyMovies(@Query('title') title?: string): Movie[] {
    return this.appService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.appService.getMovieId(+id);
  }

  @Post()
  postMovie(@Body('title') title: string) {
    console.log(title);
    return this.appService.createMovie(title);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('title') title: string) {
    return this.appService.updateMovie(+id, title);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.appService.deleteMovie(+id);
  }
}
