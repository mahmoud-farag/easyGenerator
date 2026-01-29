import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

// Mock generateAccessToken module
jest.mock('../../common', () => ({
  generateAccessToken: jest.fn().mockReturnValue('mockAccessToken'),
}));

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

const mockUser = {
  _id: 'someId',
  username: 'testuser',
  email: 'test@example.com',
  password: 'hashedPassword',
};

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);
      mockUserService.create.mockResolvedValue(mockUser);

      const registerDto = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const result = await service.register(registerDto);

      expect(result).toEqual({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: mockUser._id,
            username: mockUser.username,
            email: mockUser.email,
          },
        },
      });
      expect(mockUserService.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email already registered', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser);
      const registerDto = { username: 'testuser', email: 'test@example.com', password: 'password123' };

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return access token and user data for valid credentials', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const loginDto = { email: 'test@example.com', password: 'password123' };
      const result = await service.login(loginDto);

      expect(result).toEqual({
        success: true,
        message: 'User logged in successfully',
        data: {
          user: {
            id: mockUser._id,
            username: mockUser.username,
            email: mockUser.email,
          },
          accessToken: 'mockAccessToken',
        },
      });
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);
      const loginDto = { email: 'wrong@example.com', password: 'password123' };
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
