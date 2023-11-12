import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifyCsrf from "@fastify/csrf-protection";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true }
  );

  const config = new DocumentBuilder()
    .setTitle("Nest Rest API")
    .setDescription(
      "The Nest Rest API. API description the crud operation for user models"
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
      },
    },
  });
  await app.register(fastifyCsrf);
  await app.listen(3000);
}
bootstrap();
