import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.services";

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) { }

  async findById(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  create(data: any) {
    return this.prisma.room.create({ data });
  }

  findAll() {
    return this.prisma.room.findMany();
  }
}
