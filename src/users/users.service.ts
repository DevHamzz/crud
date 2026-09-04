import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
  
  

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const delUser = await this.userRepository.delete(id)
    if (delUser.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }
}
