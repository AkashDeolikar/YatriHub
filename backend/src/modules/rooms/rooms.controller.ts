// import { Controller, Get, Param, Query } from "@nestjs/common";
// import { BookingService } from "../booking/booking.service";

// @Controller("rooms")
// export class RoomsController {
//   constructor(private readonly bookingService: BookingService) {}

//   @Get(":roomId/availability")
//   async checkAvailability(
//     @Param("roomId") roomId: string,
//     @Query("checkIn") checkIn: string,
//     @Query("checkOut") checkOut: string
//   ) {
//     const available = await this.bookingService.isRoomAvailable(
//       roomId,
//       new Date(checkIn),
//       new Date(checkOut)
//     );

//     return { available };
//   }
// }
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  create(@Body() body: any) {
    return this.roomsService.create(body);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

}
