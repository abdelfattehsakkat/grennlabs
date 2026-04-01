import { Controller, Get, Param, Res, NotFoundException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  private getDir(): string {
    return process.env.RESOURCES_DIR || '/app/resources';
  }

  @Get()
  listFiles() {
    const dir = this.getDir();
    if (!fs.existsSync(dir)) {
      return { files: [] };
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .sort();
    return { files };
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    // Sécurité : interdire le path traversal
    const safeName = path.basename(filename);
    const dir = this.getDir();
    const filePath = path.join(dir, safeName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fichier non trouvé');
    }

    return res.download(filePath, safeName);
  }
}
