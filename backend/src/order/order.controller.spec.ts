import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let app: INestApplication;
  const orderService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: orderService }],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('отрабатывается создание поста', async () => {
    const mockOrder: OrderDto = {
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

    const result = { total: 1, items: mockOrder.tickets };

    orderService.create.mockResolvedValue(result);

    const response = await request(app.getHttpServer())
      .post('/order')
      .send(mockOrder)
      .expect(201);

    expect(response.body).toEqual(result);
    expect(orderService.create).toHaveBeenCalledWith(mockOrder);
  });
});
