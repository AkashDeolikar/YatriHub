// export class CreateBookingDto {
//   userId!: string;
//   roomId!: string;
//   checkIn!: string;
//   checkOut!: string;
// }
import { IsUUID, IsDateString } from "class-validator";

export class CreateBookingDto {

  @IsUUID()
  roomId!: string;

  @IsDateString()
  checkIn!: string;

  @IsDateString()
  checkOut!: string;
}
