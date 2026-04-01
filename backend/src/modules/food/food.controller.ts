import { Body, Controller, Get, Post } from "@nestjs/common";
import { FoodService } from "./food.service";
import { CreateFoodOrderDto } from "./dto/create-food-order.dto";

@Controller("food")
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post("order")
  create(@Body() dto: CreateFoodOrderDto) {
    return this.foodService.createOrder(dto);
  }

  @Get("orders")
  getAll() {
    return this.foodService.getOrders();
  }
}