import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../../prisma/prisma.module";
import { JwtStrategy } from "./jwt.strategy";
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from "../mail/mail.module";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        },),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                // limit: 10,.
                limit: process.env.NODE_ENV === 'production' ? 20 : 500,
            },
        ]),
        MailModule,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    controllers: [AuthController],
})
export class AuthModule { }
