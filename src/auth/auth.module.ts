import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
	imports: [forwardRef(() => UsersModule), JwtModule.register({}), PassportModule.register({})],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
