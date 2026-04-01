export class CreateBookingDto {
  busId!: number;
  seats!: number[];
  passengerName!: string;
  passengerAge!: number;
  passengerGender!: string;
  totalAmount!: number;
}