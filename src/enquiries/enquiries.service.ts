import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry, EnquiryDocument, toEnquiry } from './enquiry.schema';
import { CreateEnquiryDto } from './dto/enquiry.dto';

@Injectable()
export class EnquiriesService {
  constructor(
    @InjectModel(Enquiry.name) private enquiryModel: Model<EnquiryDocument>,
  ) {}

  async create(dto: CreateEnquiryDto) {
    const doc = await this.enquiryModel.create(dto);
    return toEnquiry(doc);
  }

  async findAll(type?: string, unreadOnly?: boolean) {
    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    if (unreadOnly) filter.read = false;
    const docs = await this.enquiryModel.find(filter).sort({ createdAt: -1 }).exec();
    return docs.map(toEnquiry);
  }

  async setRead(id: string, read: boolean) {
    const doc = await this.enquiryModel
      .findByIdAndUpdate(id, { read }, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Enquiry not found');
    return toEnquiry(doc);
  }

  async remove(id: string) {
    const doc = await this.enquiryModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Enquiry not found');
    return { ok: true };
  }

  unreadCount() {
    return this.enquiryModel.countDocuments({ read: false }).exec();
  }
}
