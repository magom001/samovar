import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../config/configuration';
import { InitData, parse, validate } from '@tma.js/init-data-node';

@Injectable()
export class TelegramAuthenticationService {
  constructor(private readonly configService: ConfigService<Configuration>) {}
  /**
   * @param initData initial data set by telegram
   * @throws — {TypeError} "hash" should be string.
   * @throws — {Error} "hash" is empty or not found.
   * @throws — {TypeError} "auth_date" should be string.
   * @throws — {TypeError} "auth_date" does not represent integer.
   * @throws — {Error} "auth_date" is empty or not found.
   * @throws — {Error} Init data expired.
   * @throws — {Error} Sign invalid.
   * @returns {InitData} - parsed init data.
   */
  verifyInitData(initData: string): InitData['user'] {
    const token = this.configService.get('telegramBotToken');

    validate(initData, token);

    const userData = parse(initData);

    return userData.user;
  }
}
