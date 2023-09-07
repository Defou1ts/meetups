import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decrorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

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

			const request = context.switchToHttp().getRequest();

			const user = request.user;

			console.log(user);

			return user.role.value === requiredRole;
		} catch (e) {
			throw new HttpException('No access', HttpStatus.FORBIDDEN);
		}
	}
}
