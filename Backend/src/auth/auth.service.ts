import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import { UserService } from '../user/user.service';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register({ email, username, password }: RegisterDto) {
    try {
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      const newUser = await this.userService.create({ username, email, password });

      return {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user');
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate access token
    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
    });

    return {
      success: true,
      message: 'User logged in successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
      },
    };
  }
}
