import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetupDto } from './create-meetup.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {}
