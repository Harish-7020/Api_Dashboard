import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Partial<Users>[]> {
    try {
      return await this.usersRepository.find({
        select: ['id', 'username'],
      });
    } catch (error) {
      throw new Error('Unable to fetch users');
    }
  }

  async findOne(id: number): Promise<Partial<Users>> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'username'],
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error('Unable to fetch user');
    }
  }

  async findById(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error('Unable to fetch user by ID');
    }
  }
}
