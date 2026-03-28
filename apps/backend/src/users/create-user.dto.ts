import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from './user.schema';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
