import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ClassValidationPipe } from './pipes/class-validation.pipe';
import { appConfigRegister } from './config/app.config';

import type { AppConfig } from './config/app.config';

async function start() {
	const app = await NestFactory.create(AppModule);

	const { port }: AppConfig = app.get(appConfigRegister.KEY);

	const config = new DocumentBuilder()
		.setTitle('Meetups API')
		.setDescription('REST API documentation')
		.setVersion('1.0.0')
		.addTag('Defou1t')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	app.useGlobalPipes(new ClassValidationPipe());

	await app.listen(port, () => {
		console.log(`Server started on port = ${port}`);
	});
}

void start();
