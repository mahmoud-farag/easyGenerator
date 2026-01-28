import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  username?: string;
}

export const generateAccessToken = (data: TokenPayload): string => {
  if (!data) {
    throw new BadRequestException('No data to generate the Auth token');
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new InternalServerErrorException('Missing JWT_SECRET in environment variables');
  }

  const expiresIn = process.env?.EXPIRES_IN || '7d';

  // @ts-expect-error - TypeScript has issues with expiresIn type but it works correctly at runtime
  const token = sign(data, jwtSecret, { expiresIn });

  return token;
};
