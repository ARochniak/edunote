import { Injectable } from '@nestjs/common'
import { CourseDto } from './dto'
import { DbService } from 'src/infrastructure/db/db.service'

@Injectable()
export class CourseService {
  constructor(private db: DbService) {}

  getCourses(userId: number) {
    return this.db.course.findMany({ where: { userId } })
  }

  createCourse(userId: number, { periods, ...courseDto }: CourseDto) {
    return this.db.course.create({
      data: { ...courseDto, periods: { create: periods }, userId },
    })
  }

  patchCourse(userId: number, courseId: number, { periods, ...courseDto }: CourseDto) {
    return this.db.course.update({
      where: { id: courseId },
      data: {
        ...courseDto,
        ...(periods && {
          periods: {
            deleteMany: { courseId },
            connectOrCreate: periods.map(({ periodId, dayOfWeek }) => ({
              where: {
                courseId_periodId: { courseId, periodId },
              },
              create: { periodId, dayOfWeek },
            })),
          },
        }),
        userId,
      },
    })
  }
}
