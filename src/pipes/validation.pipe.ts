import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validations.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata) {
		const obj = plainToClass(metadata.metatype, value);
		const errors = await validate(obj);

		if (errors.length) {
			const errorsObj = {};

			errors.forEach((err) => {
				errorsObj[err.property] = Object.values(err.constraints).join(', ');
			});

			throw new ValidationException(errorsObj);
		}

		return value;
	}
}
