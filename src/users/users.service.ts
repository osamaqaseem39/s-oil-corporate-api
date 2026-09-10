import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { PublicUser, User, UserDocument, toUser } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  create(email: string, passwordHash: string) {
    return this.userModel.create({ email: email.toLowerCase(), passwordHash });
  }

  count() {
    return this.userModel.countDocuments().exec();
  }

  async findAll(q?: string): Promise<PublicUser[]> {
    const filter: Record<string, unknown> = {};
    if (q) {
      filter.email = { $regex: q, $options: 'i' };
    }
    const docs = await this.userModel.find(filter).sort({ createdAt: -1 }).exec();
    return docs.map(toUser);
  }

  async findOne(id: string): Promise<PublicUser> {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) throw new NotFoundException('User not found');
    return toUser(doc);
  }

  async createUser(dto: CreateUserDto): Promise<PublicUser> {
    const email = dto.email.toLowerCase();
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException('Email already in use');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const doc = await this.userModel.create({
      email,
      passwordHash,
      role: dto.role ?? 'admin',
    });
    return toUser(doc);
  }

  async update(id: string, dto: UpdateUserDto): Promise<PublicUser> {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) throw new NotFoundException('User not found');

    if (dto.email !== undefined) {
      const email = dto.email.toLowerCase();
      const taken = await this.userModel
        .findOne({ email, _id: { $ne: id } })
        .exec();
      if (taken) throw new ConflictException('Email already in use');
      doc.email = email;
    }

    if (dto.password !== undefined) {
      doc.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role !== undefined) {
      doc.role = dto.role;
    }

    await doc.save();
    return toUser(doc);
  }

  async remove(id: string, actingUserId?: string) {
    if (actingUserId && id === actingUserId) {
      throw new BadRequestException('You cannot delete your own account');
    }
    const doc = await this.userModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('User not found');
    return { ok: true };
  }
}
