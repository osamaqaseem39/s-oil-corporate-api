import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dealer, DealerDocument, toDealer } from './dealer.schema';
import { CreateDealerDto, UpdateDealerDto } from './dto/dealer.dto';

const SEARCH_FIELDS = [
  'name',
  'businessName',
  'ownerName',
  'phone',
  'address',
  'city',
  'country',
] as const;

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Every word must match at least one field, e.g. "auto lahore". */
function keywordFilter(q?: string) {
  const words = (q ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 8);
  if (!words.length) return {};
  return {
    $and: words.map((word) => ({
      $or: SEARCH_FIELDS.map((field) => ({
        [field]: { $regex: escapeRegex(word), $options: 'i' },
      })),
    })),
  };
}

@Injectable()
export class DealersService {
  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
  ) {}

  async findAll(q?: string, type?: string, status?: string) {
    const filter: Record<string, unknown> = keywordFilter(q);
    if (type) filter.type = type;
    if (status) filter.status = status;
    const docs = await this.dealerModel.find(filter).sort({ updatedAt: -1 }).exec();
    return docs.map(toDealer);
  }

  async findPublished(q?: string, type?: string, city?: string) {
    const filter: Record<string, unknown> = {
      ...keywordFilter(q),
      status: 'published',
    };
    if (type) filter.type = type;
    if (city) {
      filter.city = { $regex: `^${escapeRegex(city.trim())}$`, $options: 'i' };
    }
    const docs = await this.dealerModel.find(filter).sort({ city: 1, name: 1 }).exec();
    return docs.map(toDealer);
  }

  async findOne(id: string) {
    const doc = await this.dealerModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Dealer not found');
    return toDealer(doc);
  }

  async create(dto: CreateDealerDto) {
    const doc = await this.dealerModel.create({
      ...dto,
      status: dto.status ?? 'published',
    });
    return toDealer(doc);
  }

  async update(id: string, dto: UpdateDealerDto) {
    const doc = await this.dealerModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('Dealer not found');
    return toDealer(doc);
  }

  async remove(id: string) {
    const doc = await this.dealerModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Dealer not found');
    return { ok: true };
  }
}
