import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.services";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { MailService } from "../mail/mail.service";
import { EmailService } from "../mail/email.service";
import { UnauthorizedException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        // private mailService: MailService,
        private emailService: EmailService,
    ) { }

    async register(data: { email: string; password: string }) {
        const email = data.email.toLowerCase().trim();
        const password = data.password.trim();
        const hashed = await bcrypt.hash(password, 10);
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new BadRequestException("Email already exists");
        }
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashed,
                role: 'USER',
            },
        });
        return this.generateToken(user.id, user.role);
    }


    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: "15m",
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: "7d",
        });

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefreshToken },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user || !user.refreshToken) {
                throw new Error("Access Denied");
            }
            const isMatch = await bcrypt.compare(
                refreshToken,
                user.refreshToken
            );
            if (!isMatch) {
                throw new Error("Invalid refresh token");
            }
            const newAccessToken = this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                },
                { expiresIn: "15m" }
            );
            return {
                accessToken: newAccessToken,
            };
        } catch {
            throw new Error("Invalid refresh token");
        }
    }

    async logout(userId: string) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return { message: "Logged out successfully" };
    }

    async validateUser(email: string, password: string) {
        email = email.toLowerCase().trim();
        password = password.trim();
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return user;
    }

    async forgotPassword(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return { message: "If email exists, reset link sent" };
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const expiry = new Date(Date.now() + 60 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: hashedToken,
                resetTokenExpiry: expiry,
            },
        });
        // await this.emailService.sendResetEmail(user.email, resetToken);

        return { message: "Reset token generated (check console)" };
    }

    async resetPassword(token: string, newPassword: string) {
        const users = await this.prisma.user.findMany({
            where: {
                resetToken: { not: null },
                resetTokenExpiry: { gt: new Date() },
            },
        });
        for (const user of users) {
            const isMatch = await bcrypt.compare(
                token,
                user.resetToken!
            );
            if (isMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        password: hashedPassword,
                        resetToken: null,
                        resetTokenExpiry: null,
                    },
                });
                return { message: "Password reset successful" };
            }
        }
        throw new Error("Invalid or expired token");
    }

    private generateToken(userId: string, role: string) {
        const payload = { sub: userId, role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
