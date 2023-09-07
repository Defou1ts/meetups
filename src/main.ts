import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ClassValidationPipe } from './pipes/class-validation.pipe';

async function start() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Meetups API')
		.setDescription('REST API documentation')
		.setVersion('1.0.0')
		.addTag('Defou1t')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	app.useGlobalPipes(new ClassValidationPipe());

	await app.listen(PORT, () => {
		console.log(`Server started on port = ${PORT}`);
	});
}

void start();
