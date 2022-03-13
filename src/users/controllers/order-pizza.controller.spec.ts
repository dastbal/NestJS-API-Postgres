import { Test, TestingModule } from '@nestjs/testing';
import { OrderPizzaController } from './order-pizza.controller';

describe('OrderPizzaController', () => {
  let controller: OrderPizzaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPizzaController],
    }).compile();

    controller = module.get<OrderPizzaController>(OrderPizzaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
