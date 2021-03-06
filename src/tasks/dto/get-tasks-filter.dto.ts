import { IsIn, IsOptional } from 'class-validator'

import { ETaskStatus } from '../models/task-status.enum'

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([ ETaskStatus.open, ETaskStatus.done, ETaskStatus.inProgress ])
  status?: ETaskStatus

  @IsOptional()
  search?: string
}
