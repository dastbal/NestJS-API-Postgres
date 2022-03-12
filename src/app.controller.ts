import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('/')
  home() {
    return this.appService.getHello();
  }
  @Get('/tasks')
  task() {
    return this.appService.task();
  }
}
