import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}


  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto); 
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }

  findOneByName(name: string) {
    return this.userRepository.findOneBy({name});
  }

  findOneBynameWithPassword(name: string) {
    return this.userRepository.findOne({
      where: {name},
      select: ['id','name','role','password','email'],
    });
  
  }
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
        where: { id }
        
    });
    if (!user) {
      throw new NotFoundException(`User con id ${id} no encontrado.`);
  }

  return user;
}

  
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
