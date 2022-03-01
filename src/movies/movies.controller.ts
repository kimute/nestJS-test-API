import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    //how to access to service ? like below
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll() : Movie[]{
        //thanks to constructor up can write this
        return this.moviesService.getAll();
    }

    @Get('search')  //?year
    search(@Query('year') searchingYear: string){
        return `search ${searchingYear}`;
    }

    @Get(':id')
    getOne(@Param('id') movieId: number): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete(':id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    patch(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }
}
