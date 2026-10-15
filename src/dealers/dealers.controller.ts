import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DealersService } from './dealers.service';
import { CreateDealerDto, UpdateDealerDto } from './dto/dealer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dealers')
@UseGuards(JwtAuthGuard)
export class DealersController {
  constructor(private dealers: DealersService) {}

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    return this.dealers.findAll(q, type, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealers.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDealerDto) {
    return this.dealers.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDealerDto) {
    return this.dealers.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealers.remove(id);
  }
}
