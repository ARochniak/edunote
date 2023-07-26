import { Body, Controller, Get, Headers, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { CourseService } from './course.service'
import { JwtTokenPayload } from 'src/auth/types'
import { CourseDto } from './dto'

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  getCourses(@Headers('user') tokenPayload: JwtTokenPayload) {
    return this.courseService.getCourses(tokenPayload.sub)
  }

  @Post()
  createCourse(@Body() courseDto: CourseDto, @Headers('user') tokenPayload: JwtTokenPayload) {
    return this.courseService.createCourse(tokenPayload.sub, courseDto)
  }

  @Patch(':id')
  patchCourse(
    @Body() courseDto: CourseDto,
    @Headers('user') tokenPayload: JwtTokenPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.courseService.patchCourse(tokenPayload.sub, id, courseDto)
  }
}
