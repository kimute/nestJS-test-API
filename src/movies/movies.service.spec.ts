import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{

    it("return an array", ()=>{

      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () =>{

    it("return a movie", () =>{
      service.create({
        title: 'test title',
        genres: ['test genre'],
        year: 2022,
      });
      const result = service.getOne(1);

      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
      expect(result.title).toEqual("test title");
    });

    it("check 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })

  });

  describe('deleteOne', ()=>{

    it('delete movie', () =>{
      service.create({
        title: 'test moovie',
        genres:['test genres'],
        year:2022
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });

    it('return 404', ()=>{
      try {
        service.deleteOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create', ()=>{

    it('create movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test moovie',
        genres:['test genres'],
        year:2022
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', ()=>{

    it('update movie', () => {
      service.create({
        title: 'test moovie',
        genres:['test genres'],
        year:2022
      });
      service.update(1, {title:"Update test movie"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update test movie');
    });

    it('return 404', ()=>{
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });


});
