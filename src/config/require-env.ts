import { ConfigService } from '@nestjs/config';

export function requireEnv(config: ConfigService, key: string): string {
  const value = config.get<string>(key)?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable "${key}". ` +
        'Set it in your host dashboard (Vercel → Settings → Environment Variables).',
    );
  }

  return value;
}
