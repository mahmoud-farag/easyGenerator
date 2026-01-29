import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ username, email, password }: RegisterDto): Promise<UserDocument> {
    const newUser = new this.userModel({ username, email, password });
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }

  async getUserProfile({ email }: { email: string }): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  async findOne(query: QueryFilter<UserDocument>): Promise<UserDocument | null> {
    return await this.userModel.findOne(query).exec();
  }
}
