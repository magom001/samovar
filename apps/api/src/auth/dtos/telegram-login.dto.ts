import { IsNotEmpty } from 'class-validator';

export class TelegramLoginDto {
  @IsNotEmpty()
  initData: string;
}
