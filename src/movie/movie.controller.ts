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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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
  postMovie(@Body() body: CreateMovieDto) {
    console.log(body);
    return this.appService.createMovie(body);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.appService.updateMovie(+id, body);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.appService.deleteMovie(+id);
  }
}
