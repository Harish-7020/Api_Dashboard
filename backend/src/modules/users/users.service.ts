import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.find({
      select: ['id', 'username'],
    });
  }

  async findOne(id: number): Promise<Partial<Users>> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username'],
    });
  }

  async findById(id: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { id } });
  }

}
