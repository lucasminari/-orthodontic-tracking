import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'https://orthodontic-tracking.vercel.app'],
  credentials: true,
});

  const config = new DocumentBuilder()
    .setTitle('OrthoDontic Tracking API')
    .setDescription('Sistema de Acompanhamento para Clínicas OrthoDontic')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || process.env.API_PORT || 3001;
  const isProduction = process.env.NODE_ENV === 'production';

  await app.listen(port, isProduction ? '0.0.0.0' : 'localhost', () => {
    console.log(`✓ API rodando em http://localhost:${port}`);
    console.log(`✓ Swagger disponível em http://localhost:${port}/api/docs`);
  });
}

// CORS configured for Vercel production deployment
bootstrap();