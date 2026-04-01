import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Hotel Booking API")
    .setDescription("API documentation for Hotel Booking System")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.use(
    express.json({
      verify: (
        req: Request & { rawBody?: Buffer },
        _res: Response,
        buf: Buffer
      ) => {
        req.rawBody = buf;
      },
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    "/payments/webhook/stripe",
    express.raw({ type: "application/json" }),
  );

  await app.listen(3000);
}
bootstrap();
