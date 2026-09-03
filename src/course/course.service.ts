import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    return await this.courseModel.create({
      ...createCourseDto,
    });
  }

  async findAll() {
    const allCourses = await this.courseModel.find();
    return allCourses;
  }

  async findOne(id: string) {
    const findCourse = await this.courseModel.findById(id);
    return findCourse;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
