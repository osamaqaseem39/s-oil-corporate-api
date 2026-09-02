import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ENQUIRY_TYPES } from '../enquiry.schema';

export class CreateEnquiryDto {
  @IsIn(ENQUIRY_TYPES)
  type: string;

  @IsString()
  @MaxLength(120)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  position?: string;

  @IsString()
  @MaxLength(4000)
  message: string;
}
