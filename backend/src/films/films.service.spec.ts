import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { filmsDTO } from './dto/films.dto';
import { filmsScheduleDTO } from './dto/schedule.dto';

describe('FilmsService', () => {
  let filmService: FilmsService;
  let filmRepository: { findAll: jest.Mock; findById: jest.Mock };

  beforeEach(async () => {
    filmRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsRepository, useValue: filmRepository },
      ],
    }).compile();

    filmService = module.get<FilmsService>(FilmsService);
  });

  it('Тестирование возврата списка фильмов', async () => {
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
      {
        id: '2',
        rating: 4.6,
        director: 'Джон Смитc',
        tags: ['драма', 'ужасы'],
        image: 'image2.jpg',
        cover: 'cover2.jpg',
        title: 'ЗВезды',
        about: 'Описание фильма',
        description: 'Полное описание фильма Звезды',
        schedule: [],
      },
    ];

    filmRepository.findAll.mockResolvedValue(mockFilms);

    const result = await filmService.findAll();

    expect(result).toEqual({
      total: 2,
      items: mockFilms,
    });
    expect(filmRepository.findAll).toHaveBeenCalled();
  });

  it('Тестирование поиска фильма по айди', async () => {
    const mockSchedule: filmsScheduleDTO[] = [
      {
        id: '1',
        daytime: '2023-10-01T12:00:00Z',
        hall: 1,
        rows: 10,
        seats: 100,
        price: 10,
        taken: '2023-10-01T12:00:00Z',
      },
    ];
    const mockFilms: filmsDTO = {
      id: '1',
      rating: 4.5,
      director: 'Джон Смит',
      tags: ['драма', 'приключения'],
      image: 'image1.jpg',
      cover: 'cover1.jpg',
      title: 'Созвездие',
      about: 'Описание фильма',
      description: 'Полное описание фильма Созвездие',
      schedule: mockSchedule,
    };
    filmRepository.findById.mockResolvedValue(mockFilms);
    const result = await filmService.findById('1');
    expect(result).toEqual({
      total: 1,
      items: mockSchedule,
    });
    expect(filmRepository.findById).toHaveBeenCalledWith('1');
  });
});
