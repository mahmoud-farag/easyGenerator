import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Easy Generator API')
    .setDescription('The Easy Generator API description')
    .setVersion('1.0')
    .addTag('Easy Generator')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  //enable helmet for api securities in production only, for easy development
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  } else {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    );
  }

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://production-domain.com', 'https://testing-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}
bootstrap();
