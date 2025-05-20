import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.repository';
import { OrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: {
    addTaken: jest.Mock;
    findOccupiedSeats: jest.Mock;
  };

  beforeEach(async () => {
    orderRepository = {
      addTaken: jest.fn(),
      findOccupiedSeats: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: FilmsRepository, useValue: orderRepository },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('тестирование создания одного заказа', async () => {
    const mockCreate: OrderDto = {
      tickets: [
        {
          row: 1,
          seat: 1,
          session: '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b',
          film: '',
          daytime: '',
          price: 0,
        },
      ],
    };

    orderRepository.findOccupiedSeats.mockResolvedValue([]);
    orderRepository.addTaken.mockResolvedValue(undefined);

    const result = await orderService.create(mockCreate);

    expect(result).toEqual({
      total: 1,
      items: mockCreate.tickets,
    });
    expect(orderRepository.addTaken).toHaveBeenCalledWith('3f7ed030-230c-4b06-bfc7-eeaee7f3f79b', ['1:1']);
  });

  it('тестирование проверки занятых мест', async () => {
    const existingOrder: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b', film: '', daytime: '', price: 0 },
      ],
    };

    const mockCreate: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b', film: '', daytime: '', price: 0 },
      ],
    };

    (orderService as any).orders = [existingOrder];

    await expect(orderService.create(mockCreate)).rejects.toThrow(
      'Места: 1:1 уже заняты',
    );

    expect(orderRepository.addTaken).not.toHaveBeenCalled();
  });

  it('Тест занятых мест для сеанса', async () => {
    const mockOrder: OrderDto = {
      tickets: [
        { row: 1, seat: 1, session: '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b', film: '', daytime: '', price: 0 },
        { row: 2, seat: 2, session: '5beec101-acbb-4158-adc6-d855716b44a8', film: '', daytime: '', price: 0 },
      ],
    };

    (orderService as any).orders = [mockOrder];

    const result = await orderService.findOccupiedSeats('3f7ed030-230c-4b06-bfc7-eeaee7f3f79b');
    expect(result).toEqual(['1:1']);
  });
});
