import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { UserParam } from './decrorators/user.decorator';
import { User } from 'src/users/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto);
	}

	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}

	@UseGuards(JwtRefreshTokenGuard)
	@Post('/updateAccess')
	updateAccess(@UserParam() user) {
		return this.authService.getNewAccessAndRefreshToken({ email: user.email });
	}
}
