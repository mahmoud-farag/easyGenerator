import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // Pre-save hook to hash password
          schema.pre('save', async function () {
            if (!this.isModified('password')) {
              return;
            }
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
