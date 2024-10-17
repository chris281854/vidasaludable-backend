import { Injectable } from '@nestjs/common';
import { CreateCitaPacDto } from './dto/create-cita-pac.dto';
import { UpdateCitaPacDto } from './dto/update-cita-pac.dto';

@Injectable()
export class CitaPacService {
  create(createCitaPacDto: CreateCitaPacDto) {
    return 'This action adds a new citaPac';
  }

  findAll() {
    return `This action returns all citaPac`;
  }

  findOne(id: number) {
    return `This action returns a #${id} citaPac`;
  }

  update(id: number, updateCitaPacDto: UpdateCitaPacDto) {
    return `This action updates a #${id} citaPac`;
  }

  remove(id: number) {
    return `This action removes a #${id} citaPac`;
  }
}
