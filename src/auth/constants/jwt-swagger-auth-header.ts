import type { ApiHeaderOptions } from '@nestjs/swagger';

export const jwtSwaggerAuthApiHeader: ApiHeaderOptions = {
	name: 'Authorization',
	description: 'Put access token for access to routes require authorization',
	required: true,
	schema: {
		type: 'string',
		example: 'Bearer JlbWFpbCI6ImFkbWluMUBtYWlsLnJ',
	},
};
