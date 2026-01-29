import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUser = {
  _id: 'someId',
  username: 'testuser',
  email: 'test@example.com',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findById: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const req = { user: { _id: 'someId' } };
      const result = await controller.getUserProfile(req as any);
      
      expect(result).toEqual({
        success: true,
        message: 'User profile successfully retrieved',
        data: {
          user: mockUser,
        },
      });
      expect(service.findById).toHaveBeenCalledWith('someId');
    });
  });
});
