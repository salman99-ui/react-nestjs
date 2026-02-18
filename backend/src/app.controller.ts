import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HeaderAuthGuard } from './auth/header-auth.guard';

@Controller()
@UseGuards(HeaderAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
