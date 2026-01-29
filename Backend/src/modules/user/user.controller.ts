import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { RequestWithUser } from 'src/common/interfaces';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'A protected route to get user profile' })
  @ApiResponse({
    status: 200,
    description: 'A protected route to get user profile',
    schema: {
      example: {
        success: true,
        message: 'User profile successfully retrieved',
        data: {
          user: {
            _id: '507f1f77bcf86cd799439011',
            username: 'farag',
            email: 'farag@example.com',
          },
        },
      },
    },
  })
  @Get('profile')
  async getUserProfile(@Req() req: RequestWithUser) {
    const userId = req.user._id;
    const user = await this.userService.findById(userId);

    return {
      success: true,
      message: 'User profile successfully retrieved',
      data: {
        user,
      },
    };
  }
}
