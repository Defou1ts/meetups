import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { UserParam } from './decrorators/user.decorator';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiResponse({ status: 200, type: LoginResponseDto })
	@HttpCode(200)
	@Post('/login')
	async login(@Body() userDto: CreateUserDto) {
		return await this.authService.login(userDto);
	}

	@ApiOperation({ summary: 'Register user' })
	@ApiResponse({ status: 201, type: LoginResponseDto })
	@HttpCode(201)
	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto) {
		return await this.authService.registration(userDto);
	}

	@ApiOperation({ summary: 'Update user access token' })
	@ApiResponse({ status: 200, type: LoginResponseDto })
	@UseGuards(JwtRefreshTokenGuard)
	@HttpCode(200)
	@Post('/updateAccess')
	async updateAccess(@UserParam() user) {
		return await this.authService.getNewAccessAndRefreshToken({ email: user.email });
	}
}
