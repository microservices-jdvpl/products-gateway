import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create() {
    return 'This action adds a new product';
  }
  @Get()
  findAll() {
    return 'This action returns all products';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} product`;
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return `This action updates a #${id} product`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return `This action removes a #${id} ${body} product`;
  }
}
