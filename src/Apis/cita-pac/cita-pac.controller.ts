import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitaPacService } from './cita-pac.service';
import { CreateCitaPacDto } from './dto/create-cita-pac.dto';
import { UpdateCitaPacDto } from './dto/update-cita-pac.dto';

@Controller('cita-pac')
export class CitaPacController {
  constructor(private readonly citaPacService: CitaPacService) {}

  @Post()
  create(@Body() createCitaPacDto: CreateCitaPacDto) {
    return this.citaPacService.create(createCitaPacDto);
  }

  @Get()
  findAll() {
    return this.citaPacService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaPacService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaPacDto: UpdateCitaPacDto) {
    return this.citaPacService.update(+id, updateCitaPacDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaPacService.remove(+id);
  }
}
