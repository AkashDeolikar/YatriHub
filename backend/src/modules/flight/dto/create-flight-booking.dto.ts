import { IsString, IsDateString, IsArray, IsNumber } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  title!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  gender!: string;

  @IsDateString()
  dob!: string;

  @IsString()
  mealPref?: string;

  @IsString()
  baggage?: string;
}

export class CreateFlightBookingDto {
  @IsString()
  flightNo!: string;

  @IsString()
  airline!: string;

  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsDateString()
  departure!: string;

  @IsDateString()
  arrival!: string;

  @IsNumber()
  totalAmount!: number;

  @IsArray()
  passengers!: CreatePassengerDto[];

  @IsArray()
  seatNumbers!: string[];
}