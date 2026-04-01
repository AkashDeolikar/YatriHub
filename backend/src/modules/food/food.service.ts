// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/prisma/prisma.services";
// import { CreateFoodOrderDto } from "./dto/create-food-order.dto";

// @Injectable()
// export class FoodService {
//   constructor(private prisma: PrismaService) {}

//   async createOrder(dto: CreateFoodOrderDto) {
//     const total = dto.items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     return this.prisma.foodOrder.create({
//       data: {
//         userId: dto.userId,
//         total,
//         items: {
//           create: dto.items,
//         },
//       },
//       include: {
//         items: true,
//       },
//     });
//   }

//   async getOrders() {
//     return this.prisma.foodOrder.findMany({
//       include: { items: true },
//       orderBy: { createdAt: "desc" },
//     });
//   }
// }
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.services";
import { CreateFoodOrderDto } from "./dto/create-food-order.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: CreateFoodOrderDto) {
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      return await this.prisma.foodOrder.create({
        data: {
          userId: dto.userId,
          total,
          items: {
            create: dto.items,
          },
        },
        include: {
          items: true,
        },
      });
    } catch (err: unknown) {
      console.error("Failed to create order:", err);

      // Narrow err to PrismaClientKnownRequestError
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Foreign key violation
        if (err.code === 'P2003') {
          throw new BadRequestException({
            message: "Order failed: User does not exist",
            details: err.meta,
          });
        }

        // Other Prisma errors
        throw new BadRequestException({
          message: "Order failed: Invalid data",
          details: err.meta || err.message,
        });
      }

      // Non-Prisma unknown errors
      throw new BadRequestException({
        message: "Order failed: Unknown error",
        details: String(err),
      });
    }
  }

  async getOrders() {
    return this.prisma.foodOrder.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }
}