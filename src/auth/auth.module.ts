import { Inject, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService, JwtStrategy],
})
export class AuthModule {}
