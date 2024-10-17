import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Limite les méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization',  // En-têtes autorisés
    maxAge: 600,  // Définit la durée pendant laquelle les pré-requêtes sont mises en cache
  });

  await app.listen(3000);
}
bootstrap();
