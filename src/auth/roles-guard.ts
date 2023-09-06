import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();

		try {
			const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			]);

			if (!requiredRole) {
				return true;
			}

			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Not authorized' });
			}

			const user = this.jwtService.verify(token);
			req.user = user;

			return user.role.value === requiredRole;
		} catch (e) {
			throw new HttpException('No access', HttpStatus.FORBIDDEN);
		}
	}
}
