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
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/enquiry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private enquiries: EnquiriesService) {}

  /** Public: the website's contact/partner/career forms submit here. */
  @Post()
  create(@Body() dto: CreateEnquiryDto) {
    return this.enquiries.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('type') type?: string, @Query('unread') unread?: string) {
    return this.enquiries.findAll(type, unread === 'true');
  }

  @UseGuards(JwtAuthGuard)
  @Get('unread-count')
  unreadCount() {
    return this.enquiries.unreadCount().then((count) => ({ count }));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markRead(@Param('id') id: string, @Body('read') read: boolean) {
    return this.enquiries.setRead(id, read !== false);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enquiries.remove(id);
  }
}
