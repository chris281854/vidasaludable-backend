import { Module } from '@nestjs/common';
import { CitaPacService } from './cita-pac.service';
import { CitaPacController } from './cita-pac.controller';

@Module({
  controllers: [CitaPacController],
  providers: [CitaPacService],
})
export class CitaPacModule {}
