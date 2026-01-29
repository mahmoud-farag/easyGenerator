import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

const mockUser = {
  _id: 'someId',
  username: 'testuser',
  email: 'test@example.com',
  password: 'hashedPassword',
  save: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  // const mockUserModel = {
  //   new: jest.fn().mockResolvedValue(mockUser),
  //   constructor: jest.fn().mockResolvedValue(mockUser),
  //   findOne: jest.fn(),
  //   findById: jest.fn(),
  //   create: jest.fn(),
  // };

  // Needed for "new this.userModel"
  class MockUserModel {
    constructor(private data: any) {
      Object.assign(this, data);
    }
    save = jest.fn().mockResolvedValue(mockUser);
    static findOne = jest.fn();
    static findById = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const registerDto = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const result = await service.create(registerDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      jest.spyOn(MockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any); // Mocking exec

      // The actual service implementation might await findOne directly if not using exec(),
      // but findById usually uses exec(). Let's check service implementation.
      // UserService: return await this.userModel.findOne({ email }); -> returns Query/Promise
      // If it doesn't use .exec(), we mock resolving value directly if it's thenable, or just return mockUser
      // But mongoose queries are thenable
      // Let's adjust mock if service uses .exec() or not.
      // Service code: return await this.userModel.findOne({ email }); (no exec explicitly shown in previous view, likely awaitable query)
      // Actually, standard mongoose queries are awaitable.
      jest.spyOn(MockUserModel, 'findOne').mockResolvedValueOnce(mockUser as any);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(MockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('getUserProfile', () => {
    it('should return a user profile', async () => {
      jest.spyOn(MockUserModel, 'findOne').mockResolvedValueOnce(mockUser as any);
      const result = await service.getUserProfile({ email: 'test@example.com' });
      expect(result).toEqual(mockUser);
      expect(MockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(MockUserModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const result = await service.findById('someId');
      expect(result).toEqual(mockUser);
      expect(MockUserModel.findById).toHaveBeenCalledWith('someId');
    });
  });

  describe('findOne', () => {
    it('should return a user by query', async () => {
      const query = { email: 'test@example.com' };
      jest.spyOn(MockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const result = await service.findOne(query);
      expect(result).toEqual(mockUser);
      expect(MockUserModel.findOne).toHaveBeenCalledWith(query);
    });
  });
});
