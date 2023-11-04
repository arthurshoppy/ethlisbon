import { Exclude } from 'class-transformer';

export class UserProfileDto {
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserProfileDto>) {
    Object.assign(this, partial);
  }
}