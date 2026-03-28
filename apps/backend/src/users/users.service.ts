import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument, UserRole } from './user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) throw new ConflictException('Un utilisateur avec cet email existe déjà');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.userModel.create({
      ...dto,
      passwordHash,
      role: dto.role || UserRole.STAGIAIRE,
    });

    const { passwordHash: _, ...result } = user.toObject();
    return result;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({}, { passwordHash: 0 }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id, { passwordHash: 0 }).exec();
  }

  async setActif(id: string, actif: boolean): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, { actif }, { new: true, projection: { passwordHash: 0 } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }
}
