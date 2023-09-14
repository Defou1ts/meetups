import { createParamDecorator } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';

export const UserParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	return request.user;
});
