import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';

@Module({
	controllers: [JwtAuthController],
	providers: [JwtAuthService, JwtStrategy, JwtRefreshStrategy],
	imports: [forwardRef(() => UsersModule), JwtModule.register({}), PassportModule.register({})],
	exports: [JwtAuthService, JwtModule],
})
export class JwtAuthModule {}
