// import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
// import { TravelService } from "./travel.service";
// import { CreateTravelDto } from "./dto/create-travel.dto";
// import { JwtStrategy } from "../auth/jwt.strategy";
// import { Request } from "express";

// interface AuthRequest extends Request {
//   user: { id: string };
// }

// @Controller("travel")
// export class TravelController {
//   constructor(private travelService: TravelService) {}

//   @UseGuards(JwtStrategy)
//   @Post()
//   create(@Req() req: AuthRequest, @Body() dto: CreateTravelDto) {
//     return this.travelService.create(req.user.id, dto);
//   }

//   @UseGuards(JwtStrategy)
//   @Get("my")
//   getMy(@Req() req: AuthRequest) {
//     return this.travelService.getMyBookings(req.user.id);
//   }
// }