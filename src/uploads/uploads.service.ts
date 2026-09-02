import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

@Injectable()
export class UploadsService {
  constructor(private config: ConfigService) {}

  async uploadBuffer(buffer: Buffer, originalName: string) {
    const uploadDir = this.config.get<string>('UPLOAD_DIR') ?? 'uploads';
    const dir = join(process.cwd(), uploadDir);
    await mkdir(dir, { recursive: true });
    const filename = `${randomUUID()}${extname(originalName).toLowerCase()}`;
    await writeFile(join(dir, filename), buffer);
    const base = (
      this.config.get<string>('PUBLIC_UPLOAD_URL') ??
      `http://localhost:${this.config.get<string>('PORT') ?? 4000}/uploads`
    ).replace(/\/$/, '');
    return { url: `${base}/${filename}` };
  }
}
