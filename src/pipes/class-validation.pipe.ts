import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validations.exception';

import type { ClassConstructor } from 'class-transformer';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'body') {
			return value;
		}

		const obj = plainToInstance(metadata.metatype as ClassConstructor<any>, value);
		const errors = await validate(obj);

		if (errors.length) {
			const errorsObj = {};

			errors.forEach((err) => {
				if (err.constraints) {
					errorsObj[err.property] = Object.values(err.constraints).join(', ');
				}
			});

			throw new ValidationException(errorsObj);
		}

		return value;
	}
}
