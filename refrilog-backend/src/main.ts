import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `✅ Proyecto de Refrigeración corriendo en: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(`🚀 ¡Vamos Marcos! El backend está listo para recibir trabajos.`);
}
bootstrap().catch((err) => {
  console.error('❌ Error al iniciar la aplicación:', err);
});
