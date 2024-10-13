import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET || jwtConstants.secret,
    //   signOptions: { expiresIn: "1d" },
    // }),
   JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET") || jwtConstants.secret,
        signOptions: { expiresIn: "1d" },
        global: true,
      }),
     inject: [ConfigService],
   }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}