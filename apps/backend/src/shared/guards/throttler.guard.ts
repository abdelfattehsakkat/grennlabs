import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Lire le vrai IP derrière nginx (X-Forwarded-For ou X-Real-IP)
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    if (forwarded) {
      return (forwarded as string).split(',')[0].trim();
    }
    if (realIp) {
      return realIp as string;
    }
    return req.ip ?? req.connection?.remoteAddress ?? 'unknown';
  }
}
