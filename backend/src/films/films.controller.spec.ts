import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from '../films/films.service';
import { filmsDTO } from './dto/films.dto';
import { ScheduleResponseDto } from './dto/schedule.dto';

describe('FilmsController', () => {
  let filmController: FilmsController;

  const mockFilmsService = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmController = module.get<FilmsController>(FilmsController);
  });

  describe('getFilms', () => {
    it('Получение всех фильмов', async () => {
      const mockFilms: filmsDTO[] = [
        {
          id: '1',
          rating: 4.5,
          director: 'Джон Смит',
          tags: ['драма', 'приключения'],
          image: 'image1.jpg',
          cover: 'cover1.jpg',
          title: 'Созвездие',
          about: 'Описание фильма',
          description: 'Полное описание фильма Созвездие',
          schedule: [],
        },
      ];

      mockFilmsService.findAll.mockResolvedValue({
        total: mockFilms.length,
        items: mockFilms,
      });

      const result = await filmController.getFilms();
      expect(result).toEqual({
        total: mockFilms.length,
        items: mockFilms,
      });
      expect(mockFilmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return schedule for a given film by id', async () => {
      const mockSchedule = [
        {
          id: '1',
          daytime: '2025-05-01T12:00:00Z',
          hall: 1,
          rows: 10,
          seats: 100,
          price: 10,
          taken: '2025-05-01T12:00:00Z',
        },
      ];

      const mockFilm: ScheduleResponseDto = {
        total: mockSchedule.length,
        items: mockSchedule,
      };

      mockFilmsService.findById.mockResolvedValue(mockFilm);

      const result = await filmController.find('1');
      expect(result).toEqual(mockFilm);
      expect(mockFilmsService.findById).toHaveBeenCalledWith('1');
    });
  });
});
