import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JwtRefreshTokenDto {
	@ApiProperty({ example: 'JlbWFpbCI6ImFkbWluMUBtY', description: 'refresh token used to update access token' })
	@IsString()
	refreshToken: string;
}
