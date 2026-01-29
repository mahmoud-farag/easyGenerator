import Axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './apiConfig';

class AxiosClient {
  public readonly client: AxiosInstance;

  constructor() {
    this.client = Axios.create({
      baseURL: BASE_URL,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Force logout and redirect to login page
   * Used when token expires or authentication fails
   */
  public forceLogout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Using window.location ensures a full page reload, clearing any stale React state
    window.location.href = '/login';
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<{ message: string }>) => {
        // Silently ignore cancelled requests
        if (Axios.isCancel(error)) {
          return Promise.reject(error);
        }

        // Get error message from response
        const errorMessage =
          error.response?.data?.message || error.message || '';
        const statusCode = error.response?.status;
        const requestUrl = error.config?.url || '';

        const isAuthEndpoint = 
          requestUrl.includes('/auth/login') || 
          requestUrl.includes('/auth/register');

        // Check for token expiration - handle both message and 401 status
        const isTokenExpired =
          errorMessage.toLowerCase().includes('token has expired') ||
          errorMessage.toLowerCase().includes('please login again') ||
          errorMessage.toLowerCase().includes('invalid token') ||
          errorMessage.toLowerCase().includes('jwt expired');

        if ((isTokenExpired || statusCode === 401) && !isAuthEndpoint) {
          this.forceLogout();
          // Return a rejected promise that won't trigger other error handlers
          return Promise.reject(
            new Error('Session expired. Redirecting to login...')
          );
        }

        return Promise.reject(error);
      }
    );
  }
}

const axiosClientInstance = new AxiosClient();

export default axiosClientInstance.client;
