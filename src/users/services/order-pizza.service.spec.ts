import { Test, TestingModule } from '@nestjs/testing';
import { OrderPizzaService } from './order-pizza.service';

describe('OrderPizzaService', () => {
  let service: OrderPizzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPizzaService],
    }).compile();

    service = module.get<OrderPizzaService>(OrderPizzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
