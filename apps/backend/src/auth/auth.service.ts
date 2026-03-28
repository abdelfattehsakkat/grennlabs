import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.actif) {
      throw new UnauthorizedException('Identifiants invalides ou compte désactivé');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Identifiants invalides ou compte désactivé');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: payload.sub, email: user.email, role: user.role, nom: user.nom, prenom: user.prenom },
    };
  }

  async me(userId: string) {
    return this.usersService.findById(userId);
  }
}
