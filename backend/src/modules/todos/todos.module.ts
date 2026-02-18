import { Module } from '@nestjs/common';
import { UsersController } from './todos.controller';
import { TodoService } from './todos.service';
import { DatabaseModule } from 'src/database/database.modules';

@Module({
  imports : [DatabaseModule],
  controllers: [UsersController],
  providers: [TodoService]
})
export class TodoModule {}
