import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  it('/auth/register (POST)', async () => {
    const uniqueSuffix = Date.now();
    const newUser = {
      username: `testuser_${uniqueSuffix}`,
      email: `test_${uniqueSuffix}@example.com`,
      password: 'password123!',
    };

    interface SignupResponse {
      success: boolean;
      data: {
        user: {
          id: string;
          email: string;
          username: string;
        };
      };
    }

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(newUser)
      .expect(201)
      .expect((res) => {
        const body = res.body as SignupResponse;
        expect(body.success).toBe(true);
        expect(body.data.user.email).toBe(newUser.email);
        expect(body.data.user.id).toBeDefined();
      });
  });

  it('/auth/login (POST)', async () => {
    const uniqueSuffix = Date.now();
    const password = 'password123!';
    const user = {
      username: `loginuser_${uniqueSuffix}`,
      email: `login_${uniqueSuffix}@example.com`,
      password: password,
    };

    // First register the user
    await request(app.getHttpServer()).post('/auth/register').send(user).expect(201);

    interface LoginResponse {
      success: boolean;
      data: {
        accessToken: string;
        user: {
          id: string;
          email: string;
          username: string;
        };
      };
    }

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: password,
      })
      .expect(201)
      .expect((res) => {
        const body = res.body as LoginResponse;
        expect(body.success).toBe(true);
        expect(body.data.accessToken).toBeDefined();
        expect(body.data.user.email).toBe(user.email);
        expect(body.data.user.id).toBeDefined();
      });
  });
});
