import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponseDto {
	@ApiProperty({
		example: 'CI6ImFkbWluMUBtYWlsLnJ1IiwiaW',
		description: 'access token that used in Authorization header in format `Bearer {token}`',
	})
	@IsString()
	readonly accessToken: string;

	@ApiProperty({
		example: 'CI6ImFkbWluMUBtYWlsLnJ1IiwiaW',
		description: 'refresh token that used to update deprecated access token`',
	})
	@IsString()
	readonly refreshToken: string;
}
