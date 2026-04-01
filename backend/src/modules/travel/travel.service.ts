// // import { Injectable } from "@nestjs/common";
// // import { PrismaService } from "src/prisma/prisma.services";
// // import { CreateTravelDto } from "./dto/create-travel.dto";

// // @Injectable()
// // export class TravelService {
// //   constructor(private prisma: PrismaService) {}

// //   async create(userId: string, dto: CreateTravelDto) {
// //     const basePrice = 500; // basic dummy logic
// //     const price = basePrice * dto.passengers;

// //     return this.prisma.travelBooking.create({
// //       data: {
// //         userId,
// //         type: dto.type,
// //         from: dto.from,
// //         to: dto.to,
// //         travelDate: new Date(dto.travelDate),
// //         passengers: dto.passengers,
// //         price,
// //       },
// //     });
// //   }

// //   async getMyBookings(userId: string) {
// //     return this.prisma.travelBooking.findMany({
// //       where: { userId },
// //       orderBy: { createdAt: "desc" },
// //     });
// //   }
// // }


// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/prisma/prisma.services";
// import { CreateTravelDto } from "./dto/create-travel.dto";

// @Injectable()
// export class TravelService {
//   constructor(private prisma: PrismaService) {}

//   async create(userId: string, dto: CreateTravelDto) {
//     const price = 500 * dto.passengers; // simple price logic
//     return this.prisma.travelBooking.create({
//       data: {
//         userId,
//         type: dto.type,
//         from: dto.from,
//         to: dto.to,
//         travelDate: new Date(dto.travelDate),
//         passengers: dto.passengers,
//         price,
//       },
//     });
//   }

//   async getMyBookings(userId: string) {
//     return this.prisma.travelBooking.findMany({
//       where: { userId },
//       orderBy: { createdAt: "desc" },
//     });
//   }
// }