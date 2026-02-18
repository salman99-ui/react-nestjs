import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject('MYSQL_POOL') private connection: Pool) {}

  async findAll(limit: number, offset: number, search: string) {
    const [rows] = await this.connection.query(
      `select * from todos where title like ? limit ? offset ?`,
      [`%${search}%`, limit, offset],
    );
    return {
      status: 201,
      data: rows,
    };
  }

  async create(user: CreateTodoDto) {
    const [rows] = await this.connection.execute(
      'insert into todos(title) values(?)',
      [user.title],
    );

    return {
      status: 200,
      message: 'Created',
    };
  }

  async update(id: number, body: UpdateTodoDto) {
    const { status, problem_desc } = body;
    const [result] = await this.connection.execute(
      'UPDATE todos SET status = ? , problem_desc = ? WHERE id = ?',
      [status, problem_desc ?? '', id],
    );

    return {
      status: 200,
      message: 'Updated',
    };
  }

  async findOne(id: number) {
    const [rows] = await this.connection.query(
      'Select * from todos where id = ?',
      [id],
    );

    return {
      status: 200,
      data: rows[0],
    };
  }
}
