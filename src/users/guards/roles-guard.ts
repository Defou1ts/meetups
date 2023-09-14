import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles-auth.decorator';

import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
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

			return user.role.value === requiredRole;
		} catch (e) {
			throw new HttpException('No access', HttpStatus.FORBIDDEN);
		}
	}
}
