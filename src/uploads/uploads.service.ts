import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

type MediaUploadResponse = {
  success: boolean;
  message?: string;
  data?: { url: string };
};

@Injectable()
export class UploadsService {
  constructor(private config: ConfigService) {}

  async uploadBuffer(buffer: Buffer, originalName: string, mimeType?: string) {
    const mediaUploadUrl = this.config.get<string>('MEDIA_UPLOAD_URL')?.trim();

    if (mediaUploadUrl) {
      return this.uploadToMediaServer(
        buffer,
        originalName,
        mimeType,
        mediaUploadUrl,
      );
    }

    return this.uploadLocally(buffer, originalName);
  }

  private async uploadToMediaServer(
    buffer: Buffer,
    originalName: string,
    mimeType: string | undefined,
    uploadUrl: string,
  ) {
    const form = new FormData();
    form.append(
      'file',
      new Blob([new Uint8Array(buffer)], {
        type: mimeType ?? 'application/octet-stream',
      }),
      originalName,
    );

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: form,
    });

    let payload: MediaUploadResponse;
    try {
      payload = (await response.json()) as MediaUploadResponse;
    } catch {
      throw new BadRequestException('Media server returned an invalid response');
    }

    if (!response.ok || !payload.success || !payload.data?.url) {
      throw new BadRequestException(
        payload.message ?? 'Media server rejected the upload',
      );
    }

    return { url: payload.data.url };
  }

  private async uploadLocally(buffer: Buffer, originalName: string) {
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
