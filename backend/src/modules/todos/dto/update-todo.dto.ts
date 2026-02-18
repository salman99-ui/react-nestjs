import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

enum TodoStatus {
  CREATED = 'created',
  COMPLETED = 'completed',
  ON_GOING = 'on_going',
  PROBLEM = 'problem',
}

const msg: any = {
  message: 'Status harus salah satu dari created, completed, on_going, problem',
};

export class UpdateTodoDto {
  @IsEnum(TodoStatus, msg)
  @MaxLength(255)
  status: string;

  @IsOptional()
  problem_desc?: string;
}
