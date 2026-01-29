
import { isAxiosError } from 'axios';
import axiosClient from '../common/axiosClient';
import type { IResponse, Options } from '../common/interfaces';
import type { ILoginParams, IRegisterParams, IUser } from '../interfaces';


const AUTH_PATHS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
};





interface IAuthService {
  login: (params: ILoginParams, options?: Options) => Promise<IResponse<{ user: IUser, accessToken: string }>>;
  register: (params: IRegisterParams, options?: Options) => Promise<IResponse>;
}

class AuthService implements IAuthService {

  private errorHandler(error: unknown, defaultMessage: string = 'Unknown Error occurred'): never {

    if (isAxiosError(error)) {
      const message = error.response?.data?.message || defaultMessage;
      throw new Error(message);    
    }

    throw new Error(defaultMessage);
  }


  async login(params: ILoginParams, options?: Options): Promise<IResponse<{ user: IUser, accessToken: string }>> {
    try {


      const result = await axiosClient.post(AUTH_PATHS.LOGIN, params);

      return result.data;

    } catch (error) {
      this.errorHandler(error);
    }
  };

  async register(params: IRegisterParams, options?: Options): Promise<IResponse> {
    try {
 
      const result = await axiosClient.post(AUTH_PATHS.REGISTER, params);

      return result.data;

    } catch (error) {
      this.errorHandler(error);

    }
  };

}

export default new AuthService();

