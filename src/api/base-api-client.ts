import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from '../config';
import { ILogger } from '../types';
import { withRetry } from '../utils/retry';
import { RateLimiter } from '../utils/rate-limiter';

export abstract class BaseApiClient {
    protected client: AxiosInstance;
    protected rateLimiter: RateLimiter;

    protected constructor(
        protected logger: ILogger,
        protected baseURL: string = config.baseUrl,
        protected rateLimitDelay: number = config.rateLimitDelay
    ) {
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: config.timeout,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.rateLimiter = new RateLimiter(this.rateLimitDelay);

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.response.use(
            response => response,
            (error: AxiosError) => {
                if (error.response) {
                    this.logger.error(`API Error: ${error.response.status} - ${error.response.statusText}`, error.response.data);
                } else if (error.request) {
                    this.logger.error('No response received from API', error.request);
                } else {
                    this.logger.error('Error setting up request', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    protected async makeRequest<T>(
        method: 'GET' | 'POST' | 'DELETE',
        endpoint: string,
        data?: any
    ): Promise<T> {
        await this.rateLimiter.throttle();

        return withRetry(async () => {
            const response = await this.client.request<T>({
                method,
                url: endpoint,
                data,
            });
            return response.data;
        }, config.retryAttempts, config.retryDelay);
    }
}