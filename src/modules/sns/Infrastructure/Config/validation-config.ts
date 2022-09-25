import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export function validateConfigValues(configService: ConfigService) {
  validateValues(configService.get(`AppConfiguration`));
}

const validateValues = (object: any, parent = '') => {
  for (const prop in object) {
    const key = `${parent ? `${parent}.` : ``}${prop}`;
    const value = object[prop];
    if (typeof value === 'object' && !Array.isArray(value)) {
      validateValues(value, key);
    } else {
      if (value === undefined || value === '') {
        Logger.error(`${key}: has no value in config`);
        throw new Error(`the ${prop} has no value`);
      }
      Logger.verbose(value, key);
    }
  }
};
