import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
@ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body);
    }

    @Post("login")
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(
            body.email,
            body.password
        );
        return this.authService.login(user);
    }

    @Post("logout")
    @UseGuards(AuthGuard("jwt"))
    logout(@Req() req: any) {
        return this.authService.logout(req.user.sub);
    }

    @Post("refresh")
    async refresh(
        @Body("refreshToken") refreshToken: string
    ) {
        return this.authService.refreshToken(refreshToken);
    }

    @Post("forgot-password")
    forgot(@Body("email") email: string) {
        return this.authService.forgotPassword(email);
    }

    @Post("reset-password")
    reset(
        @Body("token") token: string,
        @Body("newPassword") newPassword: string
    ) {
        return this.authService.resetPassword(token, newPassword);
    }

}
