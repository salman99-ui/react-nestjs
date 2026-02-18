import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class UsersController {
  constructor(private readonly usersService: TodoService) {}

  @Get()
  findAll(@Query() query: any) {
    const { limit, offset, search } = query;
    return this.usersService.findAll(
      Number(limit ?? 10),
      Number(offset ?? 0),
      search ?? '',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateTodoDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.usersService.update(Number(id), body);
  }
}
